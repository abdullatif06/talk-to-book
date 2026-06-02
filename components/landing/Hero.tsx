// TalkToBook landing — hero (blueprint Phase 9, Screen 1).
// Split layout: animated chat-typing demo on one side, headline + subtitle on
// the other. Warm booking-platform wash; no WebGL, pure CSS/React.
"use client";

import { useLanding } from "@/lib/i18n";
import { useTypewriter } from "./useTypewriter";

export default function Hero() {
  const { copy } = useLanding();
  const typed = useTypewriter(copy.heroDemoUser);

  return (
    <section className="mx-auto grid max-w-5xl items-center gap-10 px-6 py-16 md:grid-cols-2">
      {/* Text */}
      <div className="flex flex-col gap-5 text-center md:text-start">
        <h1 className="font-display text-4xl leading-tight text-ink sm:text-5xl animate-fade-up">
          {copy.heroTitle}
        </h1>
        <p className="text-lg leading-relaxed text-ink-soft animate-fade-up [animation-delay:100ms]">
          {copy.heroSubtitle}
        </p>
      </div>

      {/* Animated chat demo */}
      <div className="animate-fade-up rounded-3xl border border-line bg-white p-5 shadow-card [animation-delay:200ms]">
        {/* faux window dots */}
        <div className="mb-4 flex items-center gap-1.5">
          <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f57]" />
          <span className="h-2.5 w-2.5 rounded-full bg-[#febc2e]" />
          <span className="h-2.5 w-2.5 rounded-full bg-[#28c840]" />
        </div>
        <div className="flex flex-col gap-3">
          {/* user (typing) bubble — right in RTL */}
          <div className="flex justify-start">
            <div className="max-w-[85%] rounded-2xl rounded-tr-sm bg-primary px-4 py-3 text-[15px] leading-relaxed text-white">
              {typed}
              <span className="ms-0.5 inline-block h-4 w-0.5 animate-pulse bg-white/80 align-middle" />
            </div>
          </div>
          {/* AI bubble — left in RTL */}
          <div className="flex justify-end">
            <div className="max-w-[85%] rounded-2xl rounded-tl-sm bg-panel px-4 py-3 text-[15px] leading-relaxed text-ink">
              {copy.heroDemoAI}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
