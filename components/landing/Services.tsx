// TalkToBook landing — "We Offer Best Services" (Jadoo-style): 4 icon cards on
// white, soft hover lift, one card gets a coral accent shadow.
"use client";

import { useLanding } from "@/lib/i18n";
import { Icon } from "./iconMap";
import { Reveal, Stagger, RevealItem } from "@/components/motion/Reveal";

export default function Services() {
  const { copy } = useLanding();
  const cards = copy.bento.slice(0, 4);

  return (
    <section id="how" className="scroll-mt-20 bg-white py-20">
      <div className="mx-auto max-w-6xl px-6">
        <Reveal className="mb-12 text-center">
          <p className="text-sm font-bold uppercase tracking-wide text-ink-soft">
            {copy.servicesEyebrow}
          </p>
          <h2 className="mt-2 font-display text-3xl text-ink sm:text-4xl">
            {copy.bentoTitle}
          </h2>
        </Reveal>

        <Stagger className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {cards.map((c, i) => (
            <RevealItem key={i}>
              <div className="group flex h-full flex-col items-center gap-4 rounded-3xl bg-white p-8 text-center shadow-card transition-all hover:-translate-y-2 hover:shadow-card-hover">
                <span className="flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/10 text-primary transition-transform group-hover:scale-110">
                  <Icon name={c.icon} className="h-7 w-7" />
                </span>
                <h3 className="text-lg font-bold text-ink">{c.title}</h3>
                <p className="text-sm leading-relaxed text-ink-soft">{c.desc}</p>
              </div>
            </RevealItem>
          ))}
        </Stagger>
      </div>
    </section>
  );
}
