// TalkToBook landing — Jadoo-style hero.
// Left: eyebrow + big headline + subtitle + interactive input/CTAs.
// Right: a blob-framed travel photo with floating doodles (plane path, dots).
// Light, warm, friendly. Keeps the /chat?q=... handoff and reduced-motion safe.
"use client";

import { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { motion, useReducedMotion } from "motion/react";
import { ArrowLeft, Play } from "lucide-react";
import { useLanding } from "@/lib/i18n";
import { PlanePath, DotGrid } from "./Doodles";

export default function Hero() {
  const { copy } = useLanding();
  const router = useRouter();
  const reduced = useReducedMotion();
  const [q, setQ] = useState("");

  function go() {
    const text = q.trim();
    router.push(text ? `/chat?q=${encodeURIComponent(text)}` : "/chat");
  }

  const float = reduced
    ? {}
    : { animate: { y: [0, -12, 0] }, transition: { duration: 6, repeat: Infinity, ease: "easeInOut" as const } };

  return (
    <section className="hero-wash relative overflow-hidden">
      {/* decorative doodles */}
      <PlanePath className="pointer-events-none absolute start-[42%] top-24 hidden h-16 w-40 text-primary/40 md:block" />
      <DotGrid className="pointer-events-none absolute bottom-10 start-6 hidden h-12 w-12 text-gold/50 lg:block" />

      <div className="relative mx-auto grid max-w-6xl items-center gap-8 px-6 pb-16 pt-10 md:grid-cols-2">
        {/* Text + input */}
        <div className="flex flex-col items-center gap-6 text-center md:items-start md:text-start">
          <span className="animate-fade-up text-sm font-bold uppercase tracking-wide text-primary">
            {copy.heroEyebrow}
          </span>
          <h1 className="animate-fade-up whitespace-pre-line font-display text-5xl leading-[1.1] text-ink sm:text-6xl [animation-delay:80ms]">
            {copy.heroTitle}
          </h1>
          <p className="animate-fade-up max-w-md text-lg leading-relaxed text-ink-soft [animation-delay:160ms]">
            {copy.heroSubtitle}
          </p>

          {/* Interactive input */}
          <div className="animate-fade-up flex w-full max-w-md items-center gap-2 rounded-2xl border border-line bg-white p-2 shadow-card [animation-delay:240ms]">
            <input
              value={q}
              onChange={(e) => setQ(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && go()}
              placeholder={copy.heroPlaceholder}
              className="min-w-0 flex-1 bg-transparent px-3 py-2 text-[15px] text-ink outline-none placeholder:text-ink-soft/60"
            />
            <button
              type="button"
              onClick={go}
              className="flex shrink-0 items-center gap-1.5 rounded-xl bg-primary px-5 py-2.5 text-sm font-bold text-white shadow-[0_10px_20px_-6px_rgba(241,104,58,0.6)] transition-colors hover:bg-primary-dark"
            >
              {copy.ctaTry}
              <ArrowLeft className="h-4 w-4 ltr:rotate-180" />
            </button>
          </div>

          {/* secondary play link (Jadoo motif) */}
          <button
            type="button"
            onClick={() => router.push("/chat")}
            className="animate-fade-up flex items-center gap-3 text-sm font-semibold text-ink-soft transition-colors hover:text-ink [animation-delay:320ms]"
          >
            <span className="flex h-11 w-11 items-center justify-center rounded-full bg-primary text-white shadow-[0_10px_20px_-6px_rgba(241,104,58,0.6)]">
              <Play className="h-4 w-4 ltr:rotate-0 rtl:rotate-180" fill="currentColor" />
            </span>
            {copy.ctaStart}
          </button>
        </div>

        {/* Blob-framed photo */}
        <div className="relative mx-auto w-full max-w-sm">
          {/* soft blob behind */}
          <div className="hero-blob absolute -inset-6 -z-0 rounded-[40%_60%_60%_40%/50%_50%_60%_50%] bg-blob-warm" />
          <motion.div {...float} className="relative z-10">
            <div className="overflow-hidden rounded-[2rem] shadow-card-hover">
              <Image
                src={copy.heroImage}
                alt=""
                width={520}
                height={620}
                priority
                className="h-[26rem] w-full object-cover sm:h-[30rem]"
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
