// TalkToBook landing — how it works (blueprint Phase 9, Screen 1): 3 steps.
"use client";

import { useLanding } from "@/lib/i18n";

export default function HowItWorks() {
  const { copy } = useLanding();

  return (
    <section className="bg-white py-16">
      <div className="mx-auto max-w-5xl px-6">
        <h2 className="mb-10 text-center text-2xl font-bold text-brand-dark">
          {copy.howTitle}
        </h2>
        <div className="grid gap-6 sm:grid-cols-3">
          {copy.steps.map((step, i) => (
            <div
              key={i}
              className="flex flex-col items-center gap-3 rounded-2xl bg-brand-light/60 p-6 text-center"
            >
              <span className="text-4xl">{step.icon}</span>
              <h3 className="text-lg font-bold text-brand-dark">{step.title}</h3>
              <p className="text-sm leading-relaxed text-brand-dark/70">
                {step.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
