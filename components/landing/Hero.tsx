// TalkToBook landing — hero (blueprint Phase 9, Screen 1).
// Split layout: animated chat-typing demo on one side, headline + subtitle on
// the other. Subtle light background; no WebGL, pure CSS/React.
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
        <h1 className="text-3xl font-bold leading-tight text-brand-dark sm:text-4xl">
          {copy.heroTitle}
        </h1>
        <p className="text-lg leading-relaxed text-brand-dark/70">
          {copy.heroSubtitle}
        </p>
      </div>

      {/* Animated chat demo */}
      <div className="rounded-3xl border border-brand-dark/10 bg-white p-5 shadow-lg">
        <div className="flex flex-col gap-3">
          {/* user (typing) bubble — right in RTL */}
          <div className="flex justify-start">
            <div className="max-w-[85%] rounded-2xl rounded-tr-sm border border-brand-dark/10 bg-white px-4 py-3 text-[15px] leading-relaxed text-brand-dark">
              {typed}
              <span className="ms-0.5 inline-block h-4 w-0.5 animate-pulse bg-brand-teal align-middle" />
            </div>
          </div>
          {/* AI bubble — left in RTL */}
          <div className="flex justify-end">
            <div className="max-w-[85%] rounded-2xl rounded-tl-sm bg-brand-light px-4 py-3 text-[15px] leading-relaxed text-brand-dark">
              {copy.heroDemoAI}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
