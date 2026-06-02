// TalkToBook landing — interactive hero (blueprint Phase 9, Screen 1).
// Left: headline + a real input the visitor can type into (→ /chat?q=...).
// Right: an animated chat-typing demo. Warm booking-platform wash.
"use client";

import { useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { motion, useScroll, useTransform, useReducedMotion } from "motion/react";
import { useLanding } from "@/lib/i18n";
import { useTypewriter } from "./useTypewriter";

export default function Hero() {
  const { copy } = useLanding();
  const router = useRouter();
  const typed = useTypewriter(copy.heroDemoUser);
  const [q, setQ] = useState("");

  // Gentle parallax drift on the demo card as the hero scrolls past.
  const reduced = useReducedMotion();
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });
  const demoY = useTransform(scrollYProgress, [0, 1], [0, reduced ? 0 : -40]);

  function go() {
    const text = q.trim();
    router.push(text ? `/chat?q=${encodeURIComponent(text)}` : "/chat");
  }

  return (
    <section
      ref={sectionRef}
      className="mx-auto grid max-w-5xl items-center gap-10 px-6 py-14 md:grid-cols-2"
    >
      {/* Text + interactive input */}
      <div className="flex flex-col gap-6 text-center md:text-start">
        <h1 className="font-display text-4xl leading-tight text-ink sm:text-5xl animate-fade-up">
          {copy.heroTitle}
        </h1>
        <p className="text-lg leading-relaxed text-ink-soft animate-fade-up [animation-delay:100ms]">
          {copy.heroSubtitle}
        </p>

        {/* Real, working input — try it right here */}
        <div className="animate-fade-up flex items-center gap-2 rounded-2xl border border-line bg-white p-2 shadow-card [animation-delay:200ms]">
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
            className="shrink-0 rounded-xl bg-primary px-5 py-2.5 text-sm font-bold text-white transition-colors hover:bg-primary-dark"
          >
            {copy.ctaTry}
          </button>
        </div>
      </div>

      {/* Animated chat demo (gentle parallax drift) */}
      <motion.div
        style={{ y: demoY }}
        className="animate-fade-up rounded-3xl border border-line bg-white p-5 shadow-card [animation-delay:280ms]"
      >
        <div className="mb-4 flex items-center gap-1.5">
          <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f57]" />
          <span className="h-2.5 w-2.5 rounded-full bg-[#febc2e]" />
          <span className="h-2.5 w-2.5 rounded-full bg-[#28c840]" />
        </div>
        <div className="flex flex-col gap-3">
          <div className="flex justify-start">
            <div className="max-w-[85%] rounded-2xl rounded-tr-sm bg-primary px-4 py-3 text-[15px] leading-relaxed text-white">
              {typed}
              <span className="ms-0.5 inline-block h-4 w-0.5 animate-pulse bg-white/80 align-middle" />
            </div>
          </div>
          <div className="flex justify-end">
            <div className="max-w-[85%] rounded-2xl rounded-tl-sm bg-panel px-4 py-3 text-[15px] leading-relaxed text-ink">
              {copy.heroDemoAI}
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
