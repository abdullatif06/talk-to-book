// TalkToBook landing — dark bento feature grid (AI/tech zone).
// Mixed-size cards on the dark canvas; the two lead cells carry a traveling
// beam border; the whole grid sits under a cursor spotlight. Staggered reveal.
"use client";

import { useLanding } from "@/lib/i18n";
import { Icon } from "./iconMap";
import { Reveal, Stagger, RevealItem } from "@/components/motion/Reveal";
import Spotlight from "@/components/motion/Spotlight";

// Layout map: first two cells span 2 columns on desktop for a bento rhythm.
const SPAN = [
  "sm:col-span-2",
  "sm:col-span-2",
  "sm:col-span-2",
  "sm:col-span-2",
  "sm:col-span-3",
  "sm:col-span-3",
];

export default function BentoFeatures() {
  const { copy } = useLanding();

  return (
    <section className="relative border-t border-white/10 bg-night py-20">
      {/* faint grid + soft glow top */}
      <div className="pointer-events-none absolute inset-0 grid-overlay opacity-60" aria-hidden />

      <div className="relative mx-auto max-w-5xl px-6">
        <Reveal className="mb-12 text-center">
          <h2 className="font-display text-3xl text-white sm:text-4xl">
            {copy.bentoTitle}
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-white/60">{copy.bentoSubtitle}</p>
        </Reveal>

        <Spotlight className="rounded-3xl">
          <Stagger className="grid grid-cols-1 gap-4 sm:grid-cols-6">
            {copy.bento.map((b, i) => (
              <RevealItem key={i} className={SPAN[i] ?? "sm:col-span-3"}>
                <div
                  className={`group h-full rounded-2xl border border-white/10 bg-night-soft/70 p-6 backdrop-blur transition-colors hover:border-white/20 ${
                    i < 2 ? "border-beam" : ""
                  }`}
                >
                  <span className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-primary/15 text-primary transition-transform group-hover:scale-110">
                    <Icon name={b.icon} className="h-5 w-5" />
                  </span>
                  <h3 className="mb-1.5 text-lg font-bold text-white">{b.title}</h3>
                  <p className="text-sm leading-relaxed text-white/60">{b.desc}</p>
                </div>
              </RevealItem>
            ))}
          </Stagger>
        </Spotlight>
      </div>
    </section>
  );
}
