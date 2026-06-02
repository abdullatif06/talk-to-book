// TalkToBook — shared TypeScript types (blueprint Phase 5: types/index.ts).
// These shapes mirror the API contracts in Phase 7. Day 1 establishes them;
// later days wire the real logic against these types.

/** Travel parameters extracted from the user's natural-language message. */
export interface TravelParams {
  destination: string | null;
  destination_ar: string | null;
  checkin: string | null; // ISO date (YYYY-MM-DD)
  checkout: string | null; // ISO date (YYYY-MM-DD)
  adults: number | null;
  children: number | null;
  budget_usd: number | null;
  halal: boolean;
  location_preference: string | null;
}

/** UI language. Arabic is the default and primary experience. */
export type Lang = "ar" | "en";

/** A single chat turn. Gemini uses "model" for the assistant role. */
export interface ChatMessage {
  role: "user" | "model";
  content: string;
}

/** Response shape from POST /api/chat (Phase 7). */
export interface ChatResponse {
  reply: string;
  params?: Partial<TravelParams>;
  ready_to_search?: boolean;
  missing_required?: string[];
  hotels?: Hotel[];
  has_results?: boolean;
}

/** AI-generated Arabic review summary for a hotel (Phase 7, /api/summarize). */
export interface ReviewSummary {
  summary_ar: string;
  top_pros: string[];
  top_cons: string[];
  family_friendly: boolean;
  halal_verified_by_guests: boolean;
}

/** A hotel result card (blueprint Phase 7, /api/search response). */
export interface Hotel {
  id: string;
  name: string;
  name_ar: string;
  price_per_night: number;
  currency: string;
  rating: number;
  stars: number;
  image_url: string;
  address: string;
  halal_amenities: string[];
  family_features: string[];
  reviews_sample: string[];
  booking_url_base: string;
  arabic_summary?: ReviewSummary;
}
