// TalkToBook landing — dark AI/tech hero.
// Aurora gradient bg + tech grid + kinetic typing headline + interactive input,
// with a glowing, beam-bordered chat demo card. Keeps the /chat?q=... handoff
// and a gentle parallax drift. Honors prefers-reduced-motion.
"use client";

import { useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { motion, useScroll, useTransform, useReducedMotion } from "motion/react";
import { Sparkles, ArrowLeft } from "lucide-react";
import { useLanding } from "@/lib/i18n";
import { useTypewriter } from "./useTypewriter";

export default function Hero() {
  const { copy, lang } = useLanding();
  const router = useRouter();
  const typed = useTypewriter(copy.heroDemoUser);
  const [q, setQ] = useState("");

  const reduced = useReducedMotion();
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });
  const demoY = useTransform(scrollYProgress, [0, 1], [0, reduced ? 0 : -50]);

  function go() {
    const text = q.trim();
    router.push(text ? `/chat?q=${encodeURIComponent(text)}` : "/chat");
  }

  return (
    <section ref={sectionRef} className="aurora">
      {/* tech grid overlay */}
      <div className="absolute inset-0 grid-overlay" aria-hidden />

      <div className="relative mx-auto grid max-w-5xl items-center gap-12 px-6 pb-20 pt-16 md:grid-cols-2">
        {/* Text + interactive input */}
        <div className="flex flex-col items-center gap-6 text-center md:items-start md:text-start">
          <span className="animate-fade-up inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-1.5 text-sm text-white/80 backdrop-blur">
            <Sparkles className="h-4 w-4 text-gold" />
            <span className="shiny-text font-medium">
              {lang === "ar" ? "مدعوم بالذكاء الاصطناعي" : "Powered by AI"}
            </span>
          </span>

          <h1 className="animate-fade-up font-display text-4xl leading-tight text-white sm:text-5xl md:text-6xl [animation-delay:80ms]">
            {copy.heroTitle}
          </h1>
          <p className="animate-fade-up max-w-md text-lg leading-relaxed text-white/70 [animation-delay:160ms]">
            {copy.heroSubtitle}
          </p>

          {/* Real, working input */}
          <div className="animate-fade-up flex w-full max-w-md items-center gap-2 rounded-2xl border border-white/15 bg-white/10 p-2 backdrop-blur [animation-delay:240ms]">
            <input
              value={q}
              onChange={(e) => setQ(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && go()}
              placeholder={copy.heroPlaceholder}
              className="min-w-0 flex-1 bg-transparent px-3 py-2 text-[15px] text-white outline-none placeholder:text-white/50"
            />
            <button
              type="button"
              onClick={go}
              className="flex shrink-0 items-center gap-1.5 rounded-xl bg-primary px-5 py-2.5 text-sm font-bold text-white transition-colors hover:bg-primary-dark"
            >
              {copy.ctaTry}
              <ArrowLeft className="h-4 w-4 rtl:rotate-0 ltr:rotate-180" />
            </button>
          </div>
        </div>

        {/* Glowing chat demo card with traveling beam border */}
        <motion.div style={{ y: demoY }} className="animate-fade-up [animation-delay:320ms]">
          <div className="border-beam glow-card rounded-3xl bg-night-soft/90 p-5 backdrop-blur">
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
                <div className="max-w-[85%] rounded-2xl rounded-tl-sm bg-white/10 px-4 py-3 text-[15px] leading-relaxed text-white/90">
                  {copy.heroDemoAI}
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
