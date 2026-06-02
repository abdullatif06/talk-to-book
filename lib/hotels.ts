// TalkToBook — hotel search via RapidAPI (blueprint Phase 5: lib/hotels.ts).
//
// NOTE: The blueprint names "RapidAPI Hotels4", but we use DataCrawler's
// "booking-com15" instead — same RapidAPI free-tier model ($0), but Booking.com
// data, which matches the Booking.com affiliate revenue model (Phase 11).
//
// Flow (two calls):
//   1. searchDestination(query) -> resolve a dest_id + search_type
//   2. searchHotels(dest_id, dates, guests) -> property list
// Then map to our Hotel type, filter by budget, and return the top 3.

import axios from "axios";
import type { Hotel } from "@/types";

const RAPIDAPI_KEY = process.env.RAPIDAPI_KEY ?? "";
const RAPIDAPI_HOST = "booking-com15.p.rapidapi.com";
const BASE_URL = `https://${RAPIDAPI_HOST}/api/v1`;

const client = axios.create({
  baseURL: BASE_URL,
  headers: {
    "x-rapidapi-key": RAPIDAPI_KEY,
    "x-rapidapi-host": RAPIDAPI_HOST,
  },
  timeout: 15000,
});

export interface SearchHotelsParams {
  destination: string;
  checkin: string; // YYYY-MM-DD
  checkout: string; // YYYY-MM-DD
  adults: number;
  children: number;
  budget_max?: number;
}

// --- booking-com15 response shapes (only the fields we consume) ---

interface DestinationResult {
  dest_id?: string;
  search_type?: string;
  label?: string;
  name?: string;
  country?: string;
}

interface PriceBreakdown {
  grossPrice?: { value?: number; currency?: string };
}

interface BookingProperty {
  id?: number;
  name?: string;
  reviewScore?: number;
  reviewScoreWord?: string;
  propertyClass?: number; // star rating
  accuratePropertyClass?: number;
  photoUrls?: string[];
  wishlistName?: string; // often the city/area label
  countryCode?: string;
  priceBreakdown?: PriceBreakdown;
}

interface HotelSearchItem {
  property?: BookingProperty;
}

/** Resolve a free-text destination to a booking-com15 dest_id + search_type. */
async function resolveDestination(
  query: string,
): Promise<{ dest_id: string; search_type: string } | null> {
  const { data } = await client.get("/hotels/searchDestination", {
    params: { query },
  });
  const results: DestinationResult[] = data?.data ?? [];
  // Prefer a city match, else take the first result.
  const best =
    results.find((r) => r.search_type === "city") ?? results[0];
  if (!best?.dest_id || !best?.search_type) return null;
  return { dest_id: best.dest_id, search_type: best.search_type };
}

/** Build a Booking.com search URL carrying the affiliate id (Phase 11). */
function buildBookingUrl(p: {
  name: string;
  countryCode?: string;
  checkin: string;
  checkout: string;
  adults: number;
  children: number;
}): string {
  const aid = process.env.NEXT_PUBLIC_BOOKING_AFFILIATE_ID ?? "";
  const params = new URLSearchParams({
    ss: p.name,
    checkin: p.checkin,
    checkout: p.checkout,
    group_adults: String(p.adults),
    group_children: String(p.children),
    no_rooms: "1",
  });
  if (aid) params.set("aid", aid);
  return `https://www.booking.com/searchresults.html?${params.toString()}`;
}

// booking-com15's free search response carries no facilities list (only name,
// class, score, photos, location). Calling the details endpoint per hotel would
// cost 3 extra requests per search and quickly exhaust the free quota, so we
// derive light halal/family hints from the hotel name instead. This is a known
// limitation — flags are heuristic, not guest-verified amenities.
const HALAL_HINTS =
  /(halal|حلال|islam|إسلام|muslim|مسلم|sharia|شريعة|family\s*(only|friendly))/i;
const FAMILY_HINTS =
  /(family|عائل|عائلة|kids|أطفال|اطفال|apartment|شقة|suite|جناح|villa|فيلا|resort|منتجع)/i;

function deriveHalalAmenities(name: string): string[] {
  return HALAL_HINTS.test(name) ? ["halal_friendly"] : [];
}

function deriveFamilyFeatures(name: string, stars: number): string[] {
  const feats: string[] = [];
  if (FAMILY_HINTS.test(name)) feats.push("family_friendly");
  if (stars >= 4) feats.push("comfortable_for_families");
  return feats;
}

/** Map one booking-com15 property into our Hotel type. */
function toHotel(item: HotelSearchItem, params: SearchHotelsParams): Hotel | null {
  const prop = item.property;
  if (!prop?.name) return null;

  const price = prop.priceBreakdown?.grossPrice?.value;
  const currency = prop.priceBreakdown?.grossPrice?.currency ?? "USD";
  const stars = Math.round(prop.accuratePropertyClass ?? prop.propertyClass ?? 0);

  return {
    id: String(prop.id ?? prop.name),
    name: prop.name,
    name_ar: prop.name, // booking-com15 returns one localized name per `languagecode`
    price_per_night: typeof price === "number" ? Math.round(price) : 0,
    currency,
    rating: prop.reviewScore ?? 0,
    stars,
    image_url: prop.photoUrls?.[0] ?? "",
    address: prop.wishlistName ?? params.destination,
    halal_amenities: deriveHalalAmenities(prop.name),
    family_features: deriveFamilyFeatures(prop.name, stars),
    reviews_sample: [],
    booking_url_base: buildBookingUrl({
      name: prop.name,
      countryCode: prop.countryCode,
      checkin: params.checkin,
      checkout: params.checkout,
      adults: params.adults,
      children: params.children,
    }),
  };
}

/**
 * Search hotels for the given trip and return the top 3 (budget-filtered).
 * Returns [] on missing key / unresolved destination / API error so the chat
 * can degrade gracefully rather than throw.
 */
export async function searchHotels(params: SearchHotelsParams): Promise<Hotel[]> {
  if (!RAPIDAPI_KEY) {
    console.warn("[hotels] RAPIDAPI_KEY is not set — returning no results.");
    return [];
  }

  const dest = await resolveDestination(params.destination);
  if (!dest) return [];

  const childrenAge = Array.from({ length: Math.max(0, params.children) }, () => "8");

  const { data } = await client.get("/hotels/searchHotels", {
    params: {
      dest_id: dest.dest_id,
      search_type: dest.search_type,
      arrival_date: params.checkin,
      departure_date: params.checkout,
      adults: params.adults,
      children_age: childrenAge.join(","),
      room_qty: 1,
      page_number: 1,
      currency_code: "USD",
      units: "metric",
      languagecode: "ar",
    },
  });

  const items: HotelSearchItem[] = data?.data?.hotels ?? [];

  let hotels = items
    .map((item) => toHotel(item, params))
    .filter((h): h is Hotel => h !== null);

  if (params.budget_max) {
    const budget = params.budget_max;
    hotels = hotels.filter((h) => h.price_per_night === 0 || h.price_per_night <= budget);
  }

  return hotels.slice(0, 3);
}
