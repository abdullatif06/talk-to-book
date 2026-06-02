// TalkToBook — Hotel search endpoint (blueprint Phase 5 & 7: app/api/search/route.ts).
// Day 4: validates trip params and searches via booking-com15 (lib/hotels.ts).

import { NextRequest, NextResponse } from "next/server";
import { searchHotels, type SearchHotelsParams } from "@/lib/hotels";

export async function POST(req: NextRequest) {
  const params = (await req.json()) as Partial<SearchHotelsParams>;

  if (!params.destination || !params.checkin || !params.checkout) {
    return NextResponse.json(
      { error: "destination, checkin, and checkout are required", hotels: [] },
      { status: 400 },
    );
  }

  try {
    const hotels = await searchHotels({
      destination: params.destination,
      checkin: params.checkin,
      checkout: params.checkout,
      adults: params.adults ?? 2,
      children: params.children ?? 0,
      budget_max: params.budget_max,
    });

    return NextResponse.json({ hotels });
  } catch (err) {
    console.error("[/api/search] hotel search error:", err);
    return NextResponse.json(
      { error: "hotel search failed", hotels: [] },
      { status: 500 },
    );
  }
}
