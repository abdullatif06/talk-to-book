// TalkToBook landing — how it works (blueprint Phase 9, Screen 1): 3 steps.
"use client";

import { useLanding } from "@/lib/i18n";
import { Icon } from "./iconMap";
import { Reveal, Stagger, RevealItem } from "@/components/motion/Reveal";

export default function HowItWorks() {
  const { copy } = useLanding();

  return (
    <section id="how" className="scroll-mt-20 bg-white py-20">
      <div className="mx-auto max-w-5xl px-6">
        <Reveal>
          <h2 className="mb-12 text-center font-display text-3xl text-ink">
            {copy.howTitle}
          </h2>
        </Reveal>
        <Stagger className="grid gap-6 sm:grid-cols-3">
          {copy.steps.map((step, i) => (
            <RevealItem
              key={i}
              className="group relative flex flex-col items-center gap-4 rounded-2xl border border-line bg-white p-8 text-center transition-all hover:-translate-y-1 hover:shadow-card"
            >
              {/* step number badge */}
              <span className="absolute -top-3 flex h-7 w-7 items-center justify-center rounded-full bg-gold text-sm font-bold text-white shadow-card">
                {i + 1}
              </span>
              <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10 text-primary transition-transform group-hover:scale-110">
                <Icon name={step.icon} className="h-7 w-7" />
              </span>
              <h3 className="text-lg font-bold text-ink">{step.title}</h3>
              <p className="text-sm leading-relaxed text-ink-soft">{step.desc}</p>
            </RevealItem>
          ))}
        </Stagger>
      </div>
    </section>
  );
}
