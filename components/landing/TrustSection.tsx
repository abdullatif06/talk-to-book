// TalkToBook landing — trust section (blueprint Phase 9, Screen 1).
"use client";

import { useLanding } from "@/lib/i18n";
import { Icon } from "./iconMap";
import { Reveal, Stagger, RevealItem } from "@/components/motion/Reveal";

export default function TrustSection() {
  const { copy } = useLanding();

  return (
    <section className="bg-sand py-20">
      <div className="mx-auto max-w-4xl px-6">
        <Reveal>
          <h2 className="mb-10 text-center font-display text-3xl text-ink">
            {copy.trustTitle}
          </h2>
        </Reveal>
        <Stagger className="grid gap-4 sm:grid-cols-3">
          {copy.trustPoints.map((point, i) => (
            <RevealItem
              key={i}
              className="flex flex-col items-center gap-3 rounded-2xl border border-line bg-white px-6 py-7 text-center text-ink shadow-card"
            >
              <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-gold/15 text-gold">
                <Icon name={point.icon} className="h-6 w-6" />
              </span>
              <span className="text-base font-medium leading-relaxed">{point.text}</span>
            </RevealItem>
          ))}
        </Stagger>
      </div>
    </section>
  );
}
