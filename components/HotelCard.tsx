// TalkToBook — hotel result card (blueprint Phase 5 & 9, Screen 2 wireframe).
// Photo · Arabic name · gold stars + guest score · green price/night · halal &
// family badges · 3-sentence Arabic AI summary · "احجز الآن" affiliate button.
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
    <span className="text-gold" aria-label={`${n} نجوم`}>
      {"★".repeat(n)}
      <span className="text-line">{"★".repeat(5 - n)}</span>
    </span>
  );
}

export default function HotelCard({ hotel }: { hotel: Hotel }) {
  const [summary, setSummary] = useState<ReviewSummary | undefined>(
    hotel.arabic_summary,
  );
  const [loadingSummary, setLoadingSummary] = useState(!hotel.arabic_summary);
  const [imgLoaded, setImgLoaded] = useState(false);

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
    <article className="group flex flex-col overflow-hidden rounded-2xl border border-line bg-white shadow-card transition-all duration-300 hover:-translate-y-1.5 hover:border-primary/30 hover:shadow-card-hover">
      {/* Photo */}
      <div className="relative h-44 w-full overflow-hidden bg-panel">
        {/* shimmer placeholder until the image loads */}
        {hotel.image_url && !imgLoaded && (
          <div className="shimmer absolute inset-0" aria-hidden />
        )}
        {hotel.image_url ? (
          <Image
            src={hotel.image_url}
            alt={hotel.name_ar || hotel.name}
            fill
            sizes="(max-width: 640px) 100vw, 384px"
            onLoad={() => setImgLoaded(true)}
            className={`object-cover transition-all duration-700 group-hover:scale-105 ${
              imgLoaded ? "opacity-100" : "opacity-0"
            }`}
          />
        ) : (
          <div className="flex h-full items-center justify-center text-ink-soft/40">
            لا توجد صورة
          </div>
        )}

        {/* guest score chip, floating on the photo */}
        {hotel.rating > 0 && (
          <span className="absolute bottom-2 end-2 rounded-lg bg-primary px-2 py-1 text-sm font-bold text-white shadow-md">
            {hotel.rating.toFixed(1)}
          </span>
        )}
      </div>

      <div className="flex flex-1 flex-col gap-3 p-4">
        {/* Name + stars */}
        <div className="flex flex-col gap-1">
          <h3 className="text-lg font-bold leading-snug text-ink">
            {hotel.name_ar || hotel.name}
          </h3>
          {hotel.stars > 0 && (
            <div className="text-sm">
              <Stars count={hotel.stars} />
            </div>
          )}
        </div>

        {/* Badges */}
        {(hotel.halal_amenities.length > 0 || hotel.family_features.length > 0) && (
          <div className="flex flex-wrap gap-2 text-xs">
            {hotel.halal_amenities.length > 0 && (
              <span className="rounded-full bg-price/10 px-2.5 py-1 font-medium text-price">
                ✅ ملائم للمسلمين
              </span>
            )}
            {hotel.family_features.length > 0 && (
              <span className="rounded-full bg-gold/15 px-2.5 py-1 font-medium text-[#9a6d12]">
                👨‍👩‍👧‍👦 مناسب للعائلة
              </span>
            )}
          </div>
        )}

        {/* Arabic AI review summary */}
        {loadingSummary ? (
          <p className="flex items-center gap-2 text-sm text-ink-soft/60">
            <span className="typing-dot h-1.5 w-1.5 rounded-full bg-primary" />
            جاري تلخيص التقييمات...
          </p>
        ) : (
          summary?.summary_ar && (
            <p className="border-e-2 border-gold/50 pe-3 text-sm leading-relaxed text-ink-soft">
              {summary.summary_ar}
            </p>
          )
        )}

        {/* Price + Book CTA pinned to the bottom */}
        <div className="mt-auto flex items-center justify-between gap-3 pt-2">
          <div className="leading-tight">
            {hotel.price_per_night > 0 ? (
              <>
                <span className="text-xl font-extrabold text-price">
                  {hotel.price_per_night}$
                </span>
                <span className="text-xs text-ink-soft"> / ليلة</span>
              </>
            ) : (
              <span className="text-sm text-ink-soft">السعر عند الطلب</span>
            )}
          </div>

          <a
            href={hotel.booking_url_base}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center rounded-full bg-primary px-5 py-2.5 text-sm font-bold text-white transition-colors hover:bg-primary-dark"
          >
            احجز الآن ←
          </a>
        </div>
      </div>
    </article>
  );
}
