// TalkToBook landing — FAQ accordion.
"use client";

import { useState } from "react";
import { useLanding } from "@/lib/i18n";
import { ChevronDown } from "lucide-react";
import { Reveal } from "@/components/motion/Reveal";

export default function Faq() {
  const { copy } = useLanding();
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section id="faq" className="scroll-mt-20 bg-sand py-20">
      <Reveal className="mx-auto max-w-2xl px-6">
        <h2 className="mb-10 text-center font-display text-3xl text-ink">
          {copy.faqTitle}
        </h2>

        <div className="flex flex-col gap-3">
          {copy.faq.map((item, i) => {
            const isOpen = open === i;
            return (
              <div
                key={i}
                className="overflow-hidden rounded-2xl border border-line bg-white"
              >
                <button
                  type="button"
                  onClick={() => setOpen(isOpen ? null : i)}
                  className="flex w-full items-center justify-between gap-3 px-5 py-4 text-start"
                  aria-expanded={isOpen}
                >
                  <span className="font-bold text-ink">{item.q}</span>
                  <ChevronDown
                    className={`h-5 w-5 shrink-0 text-primary transition-transform ${
                      isOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>
                <div
                  className={`grid transition-all duration-300 ${
                    isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
                  }`}
                >
                  <div className="overflow-hidden">
                    <p className="px-5 pb-5 text-sm leading-relaxed text-ink-soft">
                      {item.a}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </Reveal>
    </section>
  );
}
