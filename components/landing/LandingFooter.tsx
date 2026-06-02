// TalkToBook landing — footer (Jadoo-style: light, multi-column).
"use client";

import Link from "next/link";
import { useLanding } from "@/lib/i18n";
import { Logo } from "./Logo";

export default function LandingFooter() {
  const { copy, toggle } = useLanding();

  return (
    <footer className="bg-white">
      <div className="mx-auto max-w-6xl px-6 py-14">
        <div className="flex flex-col gap-10 sm:flex-row sm:items-start sm:justify-between">
          <div className="flex max-w-sm flex-col gap-3">
            <Logo />
            <p className="text-sm leading-relaxed text-ink-soft">{copy.footerTagline}</p>
          </div>

          <nav className="flex flex-col gap-2.5">
            {copy.footerLinks.map((l) => (
              <Link
                key={l.label}
                href={l.href}
                className="text-sm text-ink-soft transition-colors hover:text-primary"
              >
                {l.label}
              </Link>
            ))}
          </nav>

          <button
            type="button"
            onClick={toggle}
            aria-label="Toggle language"
            className="h-fit rounded-full border border-line px-5 py-1.5 text-sm font-semibold text-ink transition-colors hover:bg-panel"
          >
            {copy.toggleLabel}
          </button>
        </div>

        <div className="mt-10 flex flex-col items-center gap-2 border-t border-line pt-6 text-center">
          <p className="text-sm text-ink-soft">{copy.footerCredit}</p>
          {/* Placeholder — swap "#" for your GitHub/portfolio URL later. */}
          <a href="#" className="text-sm font-medium text-primary transition-colors hover:text-primary-dark">
            {copy.footerPortfolio}
          </a>
        </div>
      </div>
    </footer>
  );
}
