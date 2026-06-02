// TalkToBook landing — trust section (blueprint Phase 9, Screen 1).
"use client";

import { useLanding } from "@/lib/i18n";

export default function TrustSection() {
  const { copy } = useLanding();

  return (
    <section className="bg-sand py-20">
      <div className="mx-auto max-w-3xl px-6">
        <h2 className="mb-10 text-center font-display text-3xl text-ink">
          {copy.trustTitle}
        </h2>
        <ul className="flex flex-col gap-4">
          {copy.trustPoints.map((point, i) => (
            <li
              key={i}
              className="flex items-center gap-4 rounded-2xl border border-line bg-white px-6 py-5 text-ink shadow-card"
            >
              <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
                ✓
              </span>
              <span className="text-base font-medium">{point}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
