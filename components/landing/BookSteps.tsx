// TalkToBook landing — "Book your next trip in 3 easy steps" (Jadoo-style):
// numbered colored-icon list on one side, a floating trip card on the other.
"use client";

import Image from "next/image";
import { useLanding } from "@/lib/i18n";
import { Icon } from "./iconMap";
import { Reveal } from "@/components/motion/Reveal";

const STEP_TINT = ["bg-primary/12 text-primary", "bg-gold/15 text-gold", "bg-price/12 text-price"];

export default function BookSteps() {
  const { copy } = useLanding();

  return (
    <section className="bg-white py-20">
      <div className="mx-auto grid max-w-6xl items-center gap-12 px-6 md:grid-cols-2">
        {/* Steps list */}
        <Reveal>
          <p className="text-sm font-bold uppercase tracking-wide text-ink-soft">
            {copy.stepsEyebrow}
          </p>
          <h2 className="mt-2 mb-8 whitespace-pre-line font-display text-3xl text-ink sm:text-4xl">
            {copy.stepsTitle}
          </h2>
          <ul className="flex flex-col gap-6">
            {copy.steps.map((s, i) => (
              <li key={i} className="flex items-start gap-4">
                <span
                  className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl ${STEP_TINT[i % 3]}`}
                >
                  <Icon name={s.icon} className="h-5 w-5" />
                </span>
                <div>
                  <h3 className="font-bold text-ink">{s.title}</h3>
                  <p className="text-sm leading-relaxed text-ink-soft">{s.desc}</p>
                </div>
              </li>
            ))}
          </ul>
        </Reveal>

        {/* Floating trip card */}
        <Reveal delay={0.1} className="relative mx-auto w-full max-w-xs">
          <div className="overflow-hidden rounded-3xl bg-white shadow-card-hover">
            <Image
              src={copy.destinations[0].img}
              alt={copy.destinations[0].name}
              width={360}
              height={220}
              className="h-40 w-full object-cover"
            />
            <div className="p-5">
              <p className="font-bold text-ink">{copy.destinations[0].name}</p>
              <p className="mt-1 text-sm text-ink-soft">{copy.heroDemoAI}</p>
            </div>
          </div>
          {/* little floating badge */}
          <div className="absolute -bottom-5 start-5 flex items-center gap-3 rounded-2xl bg-white px-4 py-3 shadow-card">
            <span className="flex h-9 w-9 items-center justify-center rounded-full bg-primary/12 text-primary">
              <Icon name="sparkles" className="h-4 w-4" />
            </span>
            <span className="text-sm font-semibold text-ink">
              {copy.stats[1].value} · {copy.stats[1].label}
            </span>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
