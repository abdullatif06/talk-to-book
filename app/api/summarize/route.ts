// TalkToBook — Review summarizer endpoint (blueprint Phase 5 & 7: app/api/summarize/route.ts).
// Day 5: generates an Arabic summary for ONE hotel on demand. Cards call this
// lazily (one Gemini request per card shown) instead of the chat route doing
// all 3 eagerly — far gentler on the Gemini free-tier daily quota.

import { NextRequest, NextResponse } from "next/server";
import { summarizeReviews } from "@/lib/gemini";

interface SummarizeRequestBody {
  hotel_name: string;
  hotel_name_ar?: string;
  reviews?: string[];
  halal_amenities?: string[];
}

export async function POST(req: NextRequest) {
  const body = (await req.json()) as SummarizeRequestBody;

  if (!body.hotel_name?.trim()) {
    return NextResponse.json({ error: "hotel_name is required" }, { status: 400 });
  }

  const summary = await summarizeReviews(
    body.hotel_name,
    body.reviews ?? [],
    body.halal_amenities ?? [],
  );

  return NextResponse.json(summary);
}
