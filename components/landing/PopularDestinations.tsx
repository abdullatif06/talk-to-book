// TalkToBook landing — popular destinations with real photos.
// Tapping a card jumps into the chat with that trip prefilled (/chat?q=...).
"use client";

import Image from "next/image";
import Link from "next/link";
import { useLanding } from "@/lib/i18n";
import { PinIcon } from "./Icons";

export default function PopularDestinations() {
  const { copy } = useLanding();

  return (
    <section className="bg-panel py-20">
      <div className="mx-auto max-w-5xl px-6">
        <h2 className="text-center font-display text-3xl text-ink">{copy.destTitle}</h2>
        <p className="mb-10 mt-2 text-center text-ink-soft">{copy.destSubtitle}</p>

        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
          {copy.destinations.map((d) => (
            <Link
              key={d.name}
              href={`/chat?q=${encodeURIComponent(d.query)}`}
              className="group relative block aspect-[4/3] overflow-hidden rounded-2xl shadow-card"
            >
              <Image
                src={d.img}
                alt={d.name}
                fill
                sizes="(max-width: 640px) 50vw, 300px"
                className="object-cover transition-transform duration-500 group-hover:scale-110"
              />
              {/* gradient scrim for legible label */}
              <div className="absolute inset-0 bg-gradient-to-t from-ink/80 via-ink/10 to-transparent" />
              <div className="absolute bottom-0 start-0 flex items-center gap-1.5 p-4 text-white">
                <PinIcon className="h-4 w-4 text-gold" />
                <span className="text-lg font-bold">{d.name}</span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
