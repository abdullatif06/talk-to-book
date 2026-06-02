// TalkToBook landing — footer (blueprint Phase 9, Screen 1).
// AR/EN language toggle · "built with ❤️" credit · portfolio link (placeholder).
"use client";

import { useLanding } from "@/lib/i18n";

export default function LandingFooter() {
  const { copy, toggle } = useLanding();

  return (
    <footer className="border-t border-brand-dark/10 bg-white">
      <div className="mx-auto flex max-w-5xl flex-col items-center gap-4 px-6 py-10 text-center">
        <button
          type="button"
          onClick={toggle}
          aria-label="Toggle language"
          className="rounded-full border border-brand-dark/15 px-4 py-1.5 text-sm font-semibold text-brand-dark transition-colors hover:bg-brand-light"
        >
          {copy.toggleLabel}
        </button>

        <p className="text-sm text-brand-dark/70">{copy.footerCredit}</p>

        {/* Placeholder — swap "#" for your GitHub/portfolio URL later. */}
        <a
          href="#"
          className="text-sm font-medium text-brand-teal hover:underline"
        >
          {copy.footerPortfolio}
        </a>
      </div>
    </footer>
  );
}
