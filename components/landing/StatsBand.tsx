// TalkToBook landing — stats band (trust/credibility numbers).
"use client";

import { useLanding } from "@/lib/i18n";

export default function StatsBand() {
  const { copy } = useLanding();

  return (
    <section className="border-y border-line bg-white">
      <div className="mx-auto grid max-w-5xl grid-cols-2 gap-6 px-6 py-10 sm:grid-cols-4">
        {copy.stats.map((s, i) => (
          <div key={i} className="flex flex-col items-center gap-1 text-center">
            <span className="font-display text-3xl text-primary sm:text-4xl">
              {s.value}
            </span>
            <span className="text-sm text-ink-soft">{s.label}</span>
          </div>
        ))}
      </div>
    </section>
  );
}
