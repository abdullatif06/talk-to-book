// TalkToBook landing — sticky top nav.
// Dark frosted bar that reads well over the dark aurora hero and stays legible
// over the light body below (backdrop blur + subtle scrim).
"use client";

import Link from "next/link";
import { useLanding } from "@/lib/i18n";
import { Logo } from "./Logo";

export default function LandingHeader() {
  const { copy, toggle } = useLanding();

  return (
    <nav className="sticky top-0 z-30 flex items-center justify-between border-b border-white/10 bg-night/70 px-6 py-3 backdrop-blur-md">
      <Logo textClass="text-white" />
      <div className="flex items-center gap-2">
        <button
          type="button"
          onClick={toggle}
          aria-label="Toggle language"
          className="rounded-full border border-white/20 px-3.5 py-1.5 text-sm font-semibold text-white/90 transition-colors hover:bg-white/10"
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
  );
}
