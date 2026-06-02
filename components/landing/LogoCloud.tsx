// TalkToBook landing — partner logo cloud (text wordmarks, muted).
"use client";

import { useLanding } from "@/lib/i18n";
import { Reveal } from "@/components/motion/Reveal";

export default function LogoCloud() {
  const { copy } = useLanding();
  return (
    <section className="bg-white py-12">
      <Reveal className="mx-auto flex max-w-5xl flex-wrap items-center justify-center gap-x-12 gap-y-6 px-6">
        {copy.logos.map((name) => (
          <span
            key={name}
            className="text-xl font-bold tracking-tight text-ink-soft/55 transition-colors hover:text-ink-soft"
          >
            {name}
          </span>
        ))}
      </Reveal>
    </section>
  );
}
