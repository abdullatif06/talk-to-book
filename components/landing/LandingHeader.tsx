// TalkToBook landing — sticky top nav (Jadoo-style: light, airy).
"use client";

import Link from "next/link";
import { useLanding } from "@/lib/i18n";
import { Logo } from "./Logo";

export default function LandingHeader() {
  const { copy, toggle } = useLanding();

  return (
    <nav className="sticky top-0 z-30 flex items-center justify-between border-b border-line/60 bg-white/85 px-6 py-4 backdrop-blur-md">
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
          className="rounded-full bg-primary px-5 py-1.5 text-sm font-bold text-white shadow-[0_8px_18px_-6px_rgba(241,104,58,0.6)] transition-colors hover:bg-primary-dark"
        >
          {copy.ctaStart}
        </Link>
      </div>
    </nav>
  );
}
