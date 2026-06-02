// TalkToBook landing — "What people say about us" (Jadoo-style): heading on one
// side, a quote card with avatar initial on the other.
"use client";

import { useLanding } from "@/lib/i18n";
import { Quote } from "lucide-react";
import { Reveal, Stagger, RevealItem } from "@/components/motion/Reveal";

export default function Testimonials() {
  const { copy } = useLanding();

  return (
    <section className="bg-sand py-20">
      <div className="mx-auto grid max-w-6xl items-center gap-12 px-6 md:grid-cols-2">
        <Reveal>
          <p className="text-sm font-bold uppercase tracking-wide text-ink-soft">
            {copy.testimonialsEyebrow}
          </p>
          <h2 className="mt-2 whitespace-pre-line font-display text-3xl text-ink sm:text-4xl">
            {copy.testimonialsTitle}
          </h2>
        </Reveal>

        <Stagger className="flex flex-col gap-5">
          {copy.testimonials.map((t, i) => (
            <RevealItem key={i}>
              <figure className="relative rounded-3xl bg-white p-6 shadow-card">
                <Quote className="absolute end-6 top-6 h-6 w-6 text-primary/30" />
                <blockquote className="text-[15px] leading-relaxed text-ink/90">
                  “{t.quote}”
                </blockquote>
                <figcaption className="mt-4 flex items-center gap-3">
                  <span className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/12 font-bold text-primary">
                    {t.name.charAt(0)}
                  </span>
                  <span>
                    <span className="block text-sm font-bold text-ink">{t.name}</span>
                    <span className="block text-xs text-ink-soft">{t.role}</span>
                  </span>
                </figcaption>
              </figure>
            </RevealItem>
          ))}
        </Stagger>
      </div>
    </section>
  );
}
