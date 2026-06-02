// TalkToBook landing — popular destinations as an infinite marquee of photo
// cards. Tapping a card jumps into the chat with that trip prefilled.
"use client";

import Image from "next/image";
import Link from "next/link";
import { useLanding } from "@/lib/i18n";
import { MapPin } from "lucide-react";
import { Reveal } from "@/components/motion/Reveal";
import Marquee from "@/components/motion/Marquee";

export default function PopularDestinations() {
  const { copy } = useLanding();

  return (
    <section className="bg-panel py-20">
      <Reveal className="mx-auto mb-10 max-w-5xl px-6 text-center">
        <h2 className="font-display text-3xl text-ink sm:text-4xl">{copy.destTitle}</h2>
        <p className="mt-2 text-ink-soft">{copy.destSubtitle}</p>
      </Reveal>

      <Marquee durationSec={45}>
        {copy.destinations.map((d) => (
          <Link
            key={d.name}
            href={`/chat?q=${encodeURIComponent(d.query)}`}
            className="group relative block h-56 w-72 shrink-0 overflow-hidden rounded-2xl shadow-card transition-shadow hover:shadow-card-hover"
          >
            <Image
              src={d.img}
              alt={d.name}
              fill
              sizes="288px"
              className="object-cover transition-transform duration-700 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-ink/85 via-ink/15 to-transparent" />
            <div className="absolute bottom-0 start-0 flex items-center gap-1.5 p-4 text-white">
              <MapPin className="h-4 w-4 text-gold" strokeWidth={2} />
              <span className="text-lg font-bold">{d.name}</span>
            </div>
          </Link>
        ))}
      </Marquee>
    </section>
  );
}
