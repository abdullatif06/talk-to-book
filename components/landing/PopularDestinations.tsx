// TalkToBook landing — "Top Destinations" (Jadoo-style): 3 tall photo cards
// with a name + a friendly "tap to plan" line. Tapping prefills the chat.
"use client";

import Image from "next/image";
import Link from "next/link";
import { useLanding } from "@/lib/i18n";
import { MapPin } from "lucide-react";
import { Reveal, Stagger, RevealItem } from "@/components/motion/Reveal";

export default function PopularDestinations() {
  const { copy } = useLanding();
  const cards = copy.destinations.slice(0, 3);

  return (
    <section className="bg-white py-20">
      <div className="mx-auto max-w-6xl px-6">
        <Reveal className="mb-12 text-center">
          <p className="text-sm font-bold uppercase tracking-wide text-ink-soft">
            {copy.destEyebrow}
          </p>
          <h2 className="mt-2 font-display text-3xl text-ink sm:text-4xl">
            {copy.destTitle}
          </h2>
        </Reveal>

        <Stagger className="grid grid-cols-1 gap-8 sm:grid-cols-3">
          {cards.map((d) => (
            <RevealItem key={d.name}>
              <Link
                href={`/chat?q=${encodeURIComponent(d.query)}`}
                className="group block overflow-hidden rounded-3xl bg-white shadow-card transition-all hover:-translate-y-2 hover:shadow-card-hover"
              >
                <div className="relative h-56 w-full overflow-hidden">
                  <Image
                    src={d.img}
                    alt={d.name}
                    fill
                    sizes="(max-width: 640px) 100vw, 360px"
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                </div>
                <div className="flex items-center justify-between p-5">
                  <span className="text-lg font-bold text-ink">{d.name}</span>
                  <span className="flex items-center gap-1.5 text-sm font-medium text-primary">
                    <MapPin className="h-4 w-4" strokeWidth={2} />
                    {copy.ctaTry}
                  </span>
                </div>
              </Link>
            </RevealItem>
          ))}
        </Stagger>
      </div>
    </section>
  );
}
