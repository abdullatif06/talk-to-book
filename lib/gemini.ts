// TalkToBook — Gemini API client (blueprint Phase 5: lib/gemini.ts).
//
// AI engine: Google Gemini Flash ONLY (the project's permanent free tier).
// Never swap this for any paid AI provider.
//
// Model note: the blueprint names "gemini-2.5-flash", but on the current free
// tier its daily request cap is ~20/day and gemini-2.0-flash returns limit 0.
// "gemini-2.5-flash-lite" is the flash-family model that actually has usable
// free quota on this project — same $0, handles Arabic well. Override with
// GEMINI_MODEL in .env.local (e.g. gemini-2.5-flash once you have quota/billing).

import { GoogleGenerativeAI } from "@google/generative-ai";
import { INTENT_EXTRACTION_PROMPT, REVIEW_SUMMARY_PROMPT } from "./prompts";
import type {
  ChatMessage,
  ChatResponse,
  ReviewSummary,
  TravelParams,
} from "@/types";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY ?? "");

const GEMINI_MODEL = process.env.GEMINI_MODEL || "gemini-2.5-flash-lite";

export const geminiFlash = genAI.getGenerativeModel({ model: GEMINI_MODEL });

/** Today's date as YYYY-MM-DD, for the prompt's [INJECT CURRENT DATE] token. */
function todayISO(): string {
  return new Date().toISOString().slice(0, 10);
}

/**
 * Retry a Gemini call on transient errors. The free tier frequently returns
 * 503 ("high demand") and 429 (rate limit); a short backoff usually clears it.
 */
async function withRetry<T>(fn: () => Promise<T>, attempts = 3): Promise<T> {
  let lastErr: unknown;
  for (let i = 0; i < attempts; i++) {
    try {
      return await fn();
    } catch (err) {
      lastErr = err;
      const msg = err instanceof Error ? err.message : String(err);
      const transient = /\b(503|429)\b|high demand|overloaded|rate limit/i.test(msg);
      if (!transient || i === attempts - 1) throw err;
      await new Promise((r) => setTimeout(r, 600 * (i + 1)));
    }
  }
  throw lastErr;
}

/**
 * The Phase 8 prompt describes params loosely, so the model invents key names
 * (e.g. adults_count, budget_per_night_usd). Normalize whatever it returns into
 * our canonical TravelParams shape (the Phase 7 API contract Day 4 search uses).
 */
function normalizeParams(raw: unknown): Partial<TravelParams> {
  if (!raw || typeof raw !== "object") return {};
  const p = raw as Record<string, unknown>;

  const num = (...keys: string[]): number | null => {
    for (const k of keys) {
      const v = p[k];
      if (typeof v === "number") return v;
      if (typeof v === "string" && v.trim() && !Number.isNaN(Number(v))) {
        return Number(v);
      }
    }
    return null;
  };
  const str = (...keys: string[]): string | null => {
    for (const k of keys) {
      const v = p[k];
      if (typeof v === "string" && v.trim()) return v.trim();
    }
    return null;
  };
  const bool = (...keys: string[]): boolean => {
    for (const k of keys) {
      if (typeof p[k] === "boolean") return p[k] as boolean;
    }
    return false;
  };

  return {
    destination: str("destination", "destination_en", "city"),
    destination_ar: str("destination_ar"),
    checkin: str("checkin", "checkin_date", "check_in"),
    checkout: str("checkout", "checkout_date", "check_out"),
    adults: num("adults", "adults_count"),
    children: num("children", "children_count"),
    budget_usd: num("budget_usd", "budget_per_night_usd", "budget_per_night", "budget"),
    halal: bool("halal", "halal_requirement", "halal_required"),
    location_preference: str("location_preference", "location", "neighborhood"),
  };
}

/**
 * Pull the trailing JSON block out of a model response.
 * The intent prompt asks the model to append a JSON object after its prose,
 * so we grab from the first "{" to the last "}" and parse it. Returns null if
 * there's no parseable object (caller falls back to treating text as the reply).
 */
function parseJsonBlock<T>(text: string): T | null {
  const match = text.match(/\{[\s\S]*\}/);
  if (!match) return null;
  try {
    return JSON.parse(match[0]) as T;
  } catch {
    return null;
  }
}

/**
 * Extract structured travel intent from a user message + conversation history.
 * Runs the Phase 8 intent-extraction prompt (current date injected) and parses
 * the JSON block the model appends to its reply.
 */
export async function extractTravelIntent(
  message: string,
  history: ChatMessage[],
): Promise<ChatResponse> {
  const systemInstruction = INTENT_EXTRACTION_PROMPT.replace(
    "[INJECT CURRENT DATE]",
    todayISO(),
  );

  // The system instruction is set on the model (not startChat): the v1beta API
  // rejects the role:"system" wrapper the SDK applies to startChat's string
  // systemInstruction, but accepts it at the model level. The date changes per
  // request, so we build a dated model instance here (config-only, cheap).
  const model = genAI.getGenerativeModel({
    model: GEMINI_MODEL,
    systemInstruction,
  });

  const chat = model.startChat({
    history: history.map((h) => ({
      role: h.role === "user" ? "user" : "model",
      parts: [{ text: h.content }],
    })),
  });

  const text = await withRetry(async () => {
    const result = await chat.sendMessage(message);
    return result.response.text();
  });

  const parsed = parseJsonBlock<ChatResponse>(text);
  if (parsed && typeof parsed.reply === "string") {
    return {
      reply: parsed.reply,
      params: normalizeParams(parsed.params),
      ready_to_search: parsed.ready_to_search ?? false,
      missing_required: parsed.missing_required ?? [],
    };
  }

  // No parseable JSON — surface the model's prose as the reply.
  return { reply: text, params: {}, ready_to_search: false, missing_required: [] };
}

/**
 * Generate an Arabic review summary for a hotel (blueprint Phase 10, Step 4).
 * Uses the verbatim Phase 8 review-summarizer prompt. booking-com15's free tier
 * rarely exposes raw review text, so this also accepts the hotel's amenities as
 * context — the prompt still produces an honest Arabic summary from what we have.
 */
export async function summarizeReviews(
  hotelName: string,
  reviews: string[],
  halalAmenities: string[],
): Promise<ReviewSummary> {
  const reviewBlock =
    reviews.length > 0
      ? reviews.slice(0, 10).join("\n---\n")
      : "(لا تتوفر مراجعات نصية من النزلاء لهذا الفندق.)";

  const prompt = `Hotel: ${hotelName}
Halal amenities: ${halalAmenities.join(", ") || "غير محدد"}
Reviews:
${reviewBlock}

${REVIEW_SUMMARY_PROMPT}`;

  try {
    const text = await withRetry(async () => {
      const result = await geminiFlash.generateContent(prompt);
      return result.response.text();
    });

    const parsed = parseJsonBlock<ReviewSummary>(text);
    if (parsed && typeof parsed.summary_ar === "string") {
      return {
        summary_ar: parsed.summary_ar,
        top_pros: Array.isArray(parsed.top_pros) ? parsed.top_pros : [],
        top_cons: Array.isArray(parsed.top_cons) ? parsed.top_cons : [],
        family_friendly: parsed.family_friendly ?? true,
        halal_verified_by_guests: parsed.halal_verified_by_guests ?? false,
      };
    }
    // Couldn't parse JSON — fall back to the raw prose as the summary.
    return {
      summary_ar: text.trim(),
      top_pros: [],
      top_cons: [],
      family_friendly: true,
      halal_verified_by_guests: false,
    };
  } catch (err) {
    console.error("[summarizeReviews] Gemini error:", err);
    // Never block the results on a failed summary — return an empty one.
    return {
      summary_ar: "",
      top_pros: [],
      top_cons: [],
      family_friendly: true,
      halal_verified_by_guests: false,
    };
  }
}
