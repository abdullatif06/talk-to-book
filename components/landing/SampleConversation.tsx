// TalkToBook landing — animated sample conversation (blueprint Phase 9, Screen 1).
// Messages reveal one-by-one on a timer, then the sequence loops. Bubble styling
// matches the real chat (AI = teal/left, user = white/right in RTL).
"use client";

import { useEffect, useState } from "react";
import { useLanding } from "@/lib/i18n";

export default function SampleConversation() {
  const { copy } = useLanding();
  const [visible, setVisible] = useState(1);

  // Reveal one more message every ~1.6s; reset to 1 after the last, and loop.
  useEffect(() => {
    setVisible(1);
    const total = copy.sample.length;
    const timer = setInterval(() => {
      setVisible((n) => (n >= total ? 1 : n + 1));
    }, 1600);
    return () => clearInterval(timer);
  }, [copy]);

  return (
    <section className="bg-brand-light/60 py-16">
      <div className="mx-auto max-w-2xl px-6">
        <h2 className="mb-8 text-center text-2xl font-bold text-brand-dark">
          {copy.sampleTitle}
        </h2>
        <div className="flex min-h-[18rem] flex-col gap-3 rounded-3xl border border-brand-dark/10 bg-white p-5 shadow-sm">
          {copy.sample.slice(0, visible).map((m, i) => {
            const isUser = m.role === "user";
            return (
              <div
                key={i}
                className={`flex w-full ${isUser ? "justify-start" : "justify-end"}`}
              >
                <div
                  className={[
                    "max-w-[80%] rounded-2xl px-4 py-3 text-[15px] leading-relaxed",
                    isUser
                      ? "rounded-tr-sm border border-brand-dark/10 bg-white text-brand-dark"
                      : "rounded-tl-sm bg-brand-light text-brand-dark",
                  ].join(" ")}
                >
                  {m.text}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
