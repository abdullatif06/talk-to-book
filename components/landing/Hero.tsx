// TalkToBook landing — hero built on the ContainerScroll 3D mockup.
// Title (eyebrow + big headline + CTA) scrolls up; the device mockup rotates
// flat on scroll and contains a LIVE mini AI chat. Light/Jadoo themed.
"use client";

import Link from "next/link";
import { ContainerScroll } from "@/components/ui/container-scroll";
import { useLanding } from "@/lib/i18n";
import MiniChat from "./MiniChat";

export default function Hero() {
  const { copy } = useLanding();

  return (
    <section className="hero-wash">
      <ContainerScroll
        titleComponent={
          <div className="flex flex-col items-center gap-5 pb-2">
            <span className="text-sm font-bold uppercase tracking-wide text-primary">
              {copy.heroEyebrow}
            </span>
            <h1 className="whitespace-pre-line font-display text-4xl leading-[1.1] text-ink sm:text-6xl">
              {copy.heroTitle}
            </h1>
            <p className="max-w-xl text-base leading-relaxed text-ink-soft sm:text-lg">
              {copy.heroSubtitle}
            </p>
            <Link
              href="/chat"
              className="rounded-full bg-primary px-8 py-3 text-base font-bold text-white shadow-[0_10px_20px_-6px_rgba(241,104,58,0.6)] transition-colors hover:bg-primary-dark"
            >
              {copy.ctaStart}
            </Link>
          </div>
        }
      >
        {/* live chat inside the mockup */}
        <MiniChat />
      </ContainerScroll>
    </section>
  );
}
