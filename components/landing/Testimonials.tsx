// TalkToBook landing — "What people say about us" with animated columns.
// Two columns scroll vertically at different speeds (second hidden on mobile).
// Masked top/bottom for a clean fade.
"use client";

import { useLanding } from "@/lib/i18n";
import { Reveal } from "@/components/motion/Reveal";
import { TestimonialsColumn } from "@/components/ui/testimonials-column";

export default function Testimonials() {
  const { copy } = useLanding();
  const col1 = copy.testimonials.slice(0, 2);
  const col2 = copy.testimonials.slice(2, 4);

  return (
    <section className="bg-sand py-20">
      <div className="mx-auto max-w-5xl px-6">
        <Reveal className="mb-12 text-center">
          <p className="text-sm font-bold uppercase tracking-wide text-ink-soft">
            {copy.testimonialsEyebrow}
          </p>
          <h2 className="mt-2 whitespace-pre-line font-display text-3xl text-ink sm:text-4xl">
            {copy.testimonialsTitle}
          </h2>
        </Reveal>

        <div className="relative mx-auto flex max-h-[34rem] justify-center gap-6 overflow-hidden [mask-image:linear-gradient(to_bottom,transparent,black_12%,black_88%,transparent)]">
          <TestimonialsColumn testimonials={col1} duration={16} />
          <TestimonialsColumn
            testimonials={col2.length ? col2 : col1}
            duration={20}
            className="hidden md:block"
          />
        </div>
      </div>
    </section>
  );
}
