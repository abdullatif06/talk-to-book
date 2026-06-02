// TalkToBook landing — header (blueprint Phase 9, Screen 1).
// Logo · bilingual tagline · "ابدأ الآن" CTA -> /chat.
"use client";

import Link from "next/link";
import { useLanding } from "@/lib/i18n";

export default function LandingHeader() {
  const { copy } = useLanding();

  return (
    <header className="flex flex-col items-center gap-5 px-6 pt-16 text-center">
      <div className="flex items-center gap-2 animate-fade-up">
        <span className="text-3xl">🏨</span>
        <span className="font-display text-3xl text-primary">{copy.brand}</span>
      </div>
      <p className="max-w-xl text-lg text-ink-soft animate-fade-up [animation-delay:80ms]">
        {copy.tagline}
      </p>
      <Link
        href="/chat"
        className="animate-fade-up rounded-full bg-primary px-9 py-3.5 text-lg font-bold text-white shadow-card transition-all hover:bg-primary-dark hover:shadow-card-hover [animation-delay:160ms]"
      >
        {copy.ctaStart}
      </Link>
    </header>
  );
}
