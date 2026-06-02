// TalkToBook landing — animated sample conversation (blueprint Phase 9, Screen 1).
// Messages reveal one-by-one on a timer, then the sequence loops. Bubble styling
// matches the real chat (AI = panel/left, user = blue/right in RTL).
"use client";

import { useEffect, useState } from "react";
import { useLanding } from "@/lib/i18n";

export default function SampleConversation() {
  const { copy } = useLanding();
  const [visible, setVisible] = useState(1);

  useEffect(() => {
    setVisible(1);
    const total = copy.sample.length;
    const timer = setInterval(() => {
      setVisible((n) => (n >= total ? 1 : n + 1));
    }, 1600);
    return () => clearInterval(timer);
  }, [copy]);

  return (
    <section className="bg-white py-20">
      <div className="mx-auto max-w-2xl px-6">
        <h2 className="mb-10 text-center font-display text-3xl text-ink">
          {copy.sampleTitle}
        </h2>
        <div className="flex min-h-[20rem] flex-col gap-3 rounded-3xl border border-line bg-panel p-6 shadow-card">
          {copy.sample.slice(0, visible).map((m, i) => {
            const isUser = m.role === "user";
            return (
              <div
                key={i}
                className={`flex w-full animate-fade-up ${
                  isUser ? "justify-start" : "justify-end"
                }`}
              >
                <div
                  className={[
                    "max-w-[80%] rounded-2xl px-4 py-3 text-[15px] leading-relaxed shadow-sm",
                    isUser
                      ? "rounded-tr-sm bg-primary text-white"
                      : "rounded-tl-sm bg-white text-ink",
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
