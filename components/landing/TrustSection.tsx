// TalkToBook landing — trust section (blueprint Phase 9, Screen 1).
"use client";

import { useLanding } from "@/lib/i18n";

export default function TrustSection() {
  const { copy } = useLanding();

  return (
    <section className="py-16">
      <div className="mx-auto max-w-3xl px-6">
        <h2 className="mb-8 text-center text-2xl font-bold text-brand-dark">
          {copy.trustTitle}
        </h2>
        <ul className="flex flex-col gap-4">
          {copy.trustPoints.map((point, i) => (
            <li
              key={i}
              className="flex items-center gap-3 rounded-xl border border-brand-teal/20 bg-white px-5 py-4 text-brand-dark"
            >
              <span className="text-brand-teal">✓</span>
              <span className="text-base">{point}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
