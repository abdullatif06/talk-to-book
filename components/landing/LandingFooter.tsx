// TalkToBook landing — footer (blueprint Phase 9, Screen 1).
// Logo + tagline · quick links · AR/EN toggle · credit + portfolio link.
"use client";

import Link from "next/link";
import { useLanding } from "@/lib/i18n";
import { LogoMark } from "./Logo";

export default function LandingFooter() {
  const { copy, toggle } = useLanding();

  return (
    <footer className="border-t border-line bg-ink text-white">
      <div className="mx-auto max-w-5xl px-6 py-14">
        <div className="flex flex-col gap-10 sm:flex-row sm:items-start sm:justify-between">
          {/* brand + tagline */}
          <div className="flex max-w-sm flex-col gap-3">
            <span className="flex items-center gap-2">
              <LogoMark className="h-8 w-8" />
              <span className="font-display text-2xl text-white">{copy.brand}</span>
            </span>
            <p className="text-sm leading-relaxed text-white/65">{copy.footerTagline}</p>
          </div>

          {/* quick links */}
          <nav className="flex flex-col gap-2.5">
            {copy.footerLinks.map((l) => (
              <Link
                key={l.label}
                href={l.href}
                className="text-sm text-white/75 transition-colors hover:text-gold"
              >
                {l.label}
              </Link>
            ))}
          </nav>

          {/* language */}
          <button
            type="button"
            onClick={toggle}
            aria-label="Toggle language"
            className="h-fit rounded-full border border-white/25 px-5 py-1.5 text-sm font-semibold text-white transition-colors hover:bg-white/10"
          >
            {copy.toggleLabel}
          </button>
        </div>

        <div className="mt-10 flex flex-col items-center gap-2 border-t border-white/10 pt-6 text-center">
          <p className="text-sm text-white/65">{copy.footerCredit}</p>
          {/* Placeholder — swap "#" for your GitHub/portfolio URL later. */}
          <a href="#" className="text-sm font-medium text-gold transition-colors hover:text-gold/80">
            {copy.footerPortfolio}
          </a>
        </div>
      </div>
    </footer>
  );
}
