// TalkToBook landing — header (blueprint Phase 9, Screen 1).
// Logo · bilingual tagline · "ابدأ الآن" CTA -> /chat.
"use client";

import Link from "next/link";
import { useLanding } from "@/lib/i18n";

export default function LandingHeader() {
  const { copy } = useLanding();

  return (
    <header className="flex flex-col items-center gap-4 px-6 pt-12 text-center">
      <span className="text-2xl font-extrabold tracking-tight text-brand-teal">
        {copy.brand}
      </span>
      <p className="max-w-xl text-base text-brand-dark/70">{copy.tagline}</p>
      <Link
        href="/chat"
        className="rounded-full bg-brand-teal px-8 py-3 text-lg font-semibold text-white shadow-sm transition-colors hover:bg-brand-dark"
      >
        {copy.ctaStart}
      </Link>
    </header>
  );
}
