// TalkToBook — Chat endpoint (blueprint Phase 5, 7 & 10 Step 6).
// Day 5: full pipeline — extract intent; when ready (and the required params
// are present), search hotels and attach Arabic AI review summaries, then
// return the cards. Otherwise keep the conversation going.

import { NextRequest, NextResponse } from "next/server";
import { extractTravelIntent } from "@/lib/gemini";
import { searchHotels } from "@/lib/hotels";
import type { ChatMessage, TravelParams } from "@/types";

interface ChatRequestBody {
  message: string;
  history?: ChatMessage[];
  session_id?: string;
}

// A search needs at least a destination and both dates (all non-null).
type SearchableParams = Partial<TravelParams> & {
  destination: string;
  checkin: string;
  checkout: string;
};

function hasRequiredParams(p: Partial<TravelParams>): p is SearchableParams {
  return Boolean(p.destination && p.checkin && p.checkout);
}

export async function POST(req: NextRequest) {
  const { message, history = [] } = (await req.json()) as ChatRequestBody;

  if (!message?.trim()) {
    return NextResponse.json({ error: "message is required" }, { status: 400 });
  }

  try {
    // 1. Extract intent from the user's message.
    const ai = await extractTravelIntent(message, history);
    const params = ai.params ?? {};

    // 2. Ready to search AND we actually have the required params? Search and
    //    return the cards. (The model sometimes flips ready_to_search early, so
    //    we re-check the params rather than trust the flag alone.)
    //    Arabic summaries are fetched lazily per card via /api/summarize — this
    //    keeps a search at ONE Gemini call (extraction), which matters a lot on
    //    the Gemini free-tier daily request cap.
    if (ai.ready_to_search && hasRequiredParams(params)) {
      const hotels = await searchHotels({
        destination: params.destination,
        checkin: params.checkin,
        checkout: params.checkout,
        adults: params.adults ?? 2,
        children: params.children ?? 0,
        budget_max: params.budget_usd ?? undefined,
      });

      return NextResponse.json({
        reply: ai.reply,
        params,
        hotels,
        has_results: hotels.length > 0,
        ready_to_search: true,
        missing: [],
      });
    }

    // 4. Still gathering info — return the conversational reply + params.
    return NextResponse.json({
      reply: ai.reply,
      params,
      has_results: false,
      ready_to_search: ai.ready_to_search ?? false,
      missing: ai.missing_required ?? [],
    });
  } catch (err) {
    console.error("[/api/chat] pipeline error:", err);
    return NextResponse.json(
      {
        reply:
          "عذراً، حدث خطأ أثناء معالجة طلبك. تأكد من إعداد المفاتيح وحاول مرة أخرى.",
        params: {},
        has_results: false,
      },
      { status: 500 },
    );
  }
}
