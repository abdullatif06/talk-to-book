// TalkToBook landing — footer (blueprint Phase 9, Screen 1).
// AR/EN language toggle · "built with ❤️" credit · portfolio link (placeholder).
"use client";

import { useLanding } from "@/lib/i18n";

export default function LandingFooter() {
  const { copy, toggle } = useLanding();

  return (
    <footer className="border-t border-line bg-ink text-white">
      <div className="mx-auto flex max-w-5xl flex-col items-center gap-5 px-6 py-12 text-center">
        <span className="font-display text-2xl text-white">{copy.brand}</span>

        <button
          type="button"
          onClick={toggle}
          aria-label="Toggle language"
          className="rounded-full border border-white/25 px-5 py-1.5 text-sm font-semibold text-white transition-colors hover:bg-white/10"
        >
          {copy.toggleLabel}
        </button>

        <p className="text-sm text-white/70">{copy.footerCredit}</p>

        {/* Placeholder — swap "#" for your GitHub/portfolio URL later. */}
        <a
          href="#"
          className="text-sm font-medium text-gold transition-colors hover:text-gold/80"
        >
          {copy.footerPortfolio}
        </a>
      </div>
    </footer>
  );
}
