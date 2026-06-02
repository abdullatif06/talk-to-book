// TalkToBook landing — stats band (trust/credibility numbers).
// Staggered reveal as the band scrolls into view. (Values are mixed
// text/numerals like "+١ مليون" and "٪١٠٠", so we animate presence, not a
// numeric count-up, to stay correct in both AR and EN.)
"use client";

import { useLanding } from "@/lib/i18n";
import { Stagger, RevealItem } from "@/components/motion/Reveal";

export default function StatsBand() {
  const { copy } = useLanding();

  return (
    <section className="border-y border-line bg-white">
      <Stagger
        className="mx-auto grid max-w-5xl grid-cols-2 gap-6 px-6 py-10 sm:grid-cols-4"
        gap={0.1}
      >
        {copy.stats.map((s, i) => (
          <RevealItem key={i}>
            <div className="flex flex-col items-center gap-1 text-center">
              <span className="font-display text-3xl text-primary sm:text-4xl">
                {s.value}
              </span>
              <span className="text-sm text-ink-soft">{s.label}</span>
            </div>
          </RevealItem>
        ))}
      </Stagger>
    </section>
  );
}
