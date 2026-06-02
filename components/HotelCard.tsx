// TalkToBook — hotel result card (blueprint Phase 5 & 9, Screen 2 wireframe).
// Photo · Arabic name · stars + guest score · price/night · halal & family
// badges · 3-sentence Arabic AI summary · "احجز الآن" affiliate button.
//
// The Arabic summary is fetched lazily from /api/summarize when the card mounts
// (one Gemini request per card), rather than eagerly in the chat route — this
// is much gentler on the Gemini free-tier daily request cap.
"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import type { Hotel, ReviewSummary } from "@/types";

function Stars({ count }: { count: number }) {
  const n = Math.max(0, Math.min(5, count));
  return (
    <span className="text-amber-500" aria-label={`${n} نجوم`}>
      {"★".repeat(n)}
      <span className="text-brand-dark/20">{"★".repeat(5 - n)}</span>
    </span>
  );
}

export default function HotelCard({ hotel }: { hotel: Hotel }) {
  // Use a summary that came with the hotel if present; otherwise fetch lazily.
  const [summary, setSummary] = useState<ReviewSummary | undefined>(
    hotel.arabic_summary,
  );
  const [loadingSummary, setLoadingSummary] = useState(!hotel.arabic_summary);

  useEffect(() => {
    if (hotel.arabic_summary) return;
    let cancelled = false;

    (async () => {
      try {
        const res = await fetch("/api/summarize", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            hotel_name: hotel.name,
            reviews: hotel.reviews_sample,
            halal_amenities: hotel.halal_amenities,
          }),
        });
        const data = (await res.json()) as ReviewSummary;
        if (!cancelled) setSummary(data);
      } catch {
        /* leave summary empty on failure — the card is still useful */
      } finally {
        if (!cancelled) setLoadingSummary(false);
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [hotel]);

  return (
    <article className="overflow-hidden rounded-2xl border border-brand-dark/10 bg-white shadow-sm">
      {/* Photo */}
      <div className="relative h-44 w-full bg-brand-light">
        {hotel.image_url ? (
          <Image
            src={hotel.image_url}
            alt={hotel.name_ar || hotel.name}
            fill
            sizes="(max-width: 640px) 100vw, 640px"
            className="object-cover"
          />
        ) : (
          <div className="flex h-full items-center justify-center text-brand-dark/30">
            لا توجد صورة
          </div>
        )}
      </div>

      <div className="flex flex-col gap-3 p-4">
        {/* Name + rating row */}
        <div className="flex items-start justify-between gap-3">
          <h3 className="text-lg font-bold text-brand-dark">
            {hotel.name_ar || hotel.name}
          </h3>
          {hotel.rating > 0 && (
            <span className="shrink-0 rounded-lg bg-brand-teal px-2 py-1 text-sm font-bold text-white">
              {hotel.rating.toFixed(1)}/10
            </span>
          )}
        </div>

        {hotel.stars > 0 && (
          <div className="text-sm">
            <Stars count={hotel.stars} />
          </div>
        )}

        {/* Price */}
        <div className="text-base font-semibold text-brand-dark">
          💰{" "}
          {hotel.price_per_night > 0
            ? `${hotel.price_per_night}$ / ليلة`
            : "السعر عند الطلب"}
        </div>

        {/* Badges */}
        <div className="flex flex-wrap gap-2 text-sm">
          {hotel.halal_amenities.length > 0 && (
            <span className="rounded-full bg-brand-light px-3 py-1 text-brand-teal">
              ✅ ملائم للمسلمين
            </span>
          )}
          {hotel.family_features.length > 0 && (
            <span className="rounded-full bg-brand-light px-3 py-1 text-brand-teal">
              👨‍👩‍👧‍👦 مناسب للعائلة
            </span>
          )}
        </div>

        {/* Arabic AI review summary */}
        {loadingSummary ? (
          <p className="text-sm text-brand-dark/40">جاري تلخيص التقييمات...</p>
        ) : (
          summary?.summary_ar && (
            <p className="border-r-2 border-brand-teal/40 pr-3 text-sm leading-relaxed text-brand-dark/80">
              {summary.summary_ar}
            </p>
          )
        )}

        {/* Book CTA → Booking.com affiliate link */}
        <a
          href={hotel.booking_url_base}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-1 inline-flex items-center justify-center rounded-full bg-brand-teal px-5 py-2.5 font-semibold text-white transition-colors hover:bg-brand-dark"
        >
          احجز الآن ←
        </a>
      </div>
    </article>
  );
}
