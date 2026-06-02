// TestimonialsColumn — a vertically auto-scrolling column of quote cards
// (adapted to motion/react). Loops seamlessly; pauses for reduced motion.
"use client";

import React from "react";
import { motion, useReducedMotion } from "motion/react";

export interface Testimonial {
  quote: string;
  name: string;
  role: string;
}

export function TestimonialsColumn({
  testimonials,
  duration = 14,
  className,
}: {
  testimonials: Testimonial[];
  duration?: number;
  className?: string;
}) {
  const reduced = useReducedMotion();

  return (
    <div className={className}>
      <motion.div
        animate={reduced ? undefined : { translateY: "-50%" }}
        transition={{ duration, repeat: Infinity, ease: "linear", repeatType: "loop" }}
        className="flex flex-col gap-5 pb-5"
      >
        {[...new Array(2)].map((_, dup) => (
          <React.Fragment key={dup}>
            {testimonials.map((t, i) => (
              <figure
                key={`${dup}-${i}`}
                className="w-full max-w-sm rounded-3xl border border-line bg-white p-7 shadow-card"
              >
                <blockquote className="text-[15px] leading-relaxed text-ink/90">
                  “{t.quote}”
                </blockquote>
                <figcaption className="mt-5 flex items-center gap-3">
                  <span className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/12 font-bold text-primary">
                    {t.name.charAt(0)}
                  </span>
                  <span>
                    <span className="block text-sm font-bold leading-5 text-ink">{t.name}</span>
                    <span className="block text-xs leading-5 text-ink-soft">{t.role}</span>
                  </span>
                </figcaption>
              </figure>
            ))}
          </React.Fragment>
        ))}
      </motion.div>
    </div>
  );
}
