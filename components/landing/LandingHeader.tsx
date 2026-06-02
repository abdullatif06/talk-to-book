// TalkToBook landing — header (blueprint Phase 9, Screen 1).
// Logo · bilingual tagline · "ابدأ الآن" CTA -> /chat.
"use client";

import Link from "next/link";
import { useLanding } from "@/lib/i18n";
import { Logo } from "./Logo";

export default function LandingHeader() {
  const { copy, toggle } = useLanding();

  return (
    <>
      {/* sticky top nav */}
      <nav className="sticky top-0 z-20 flex items-center justify-between border-b border-line/70 bg-white/80 px-6 py-3 backdrop-blur-md">
        <Logo />
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={toggle}
            aria-label="Toggle language"
            className="rounded-full border border-line px-3.5 py-1.5 text-sm font-semibold text-ink transition-colors hover:bg-panel"
          >
            {copy.toggleLabel}
          </button>
          <Link
            href="/chat"
            className="rounded-full bg-primary px-5 py-1.5 text-sm font-bold text-white transition-colors hover:bg-primary-dark"
          >
            {copy.ctaStart}
          </Link>
        </div>
      </nav>

      {/* hero intro */}
      <header className="flex flex-col items-center gap-5 px-6 pt-14 text-center">
        <p className="max-w-xl text-lg text-ink-soft animate-fade-up">{copy.tagline}</p>
      </header>
    </>
  );
}
