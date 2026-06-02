// TalkToBook landing — partner logo cloud using the InfiniteSlider (smooth
// auto-scroll, slows on hover). Our logos are text wordmarks (not images).
"use client";

import { useLanding } from "@/lib/i18n";
import { InfiniteSlider } from "@/components/ui/infinite-slider";

export default function LogoCloud() {
  const { copy } = useLanding();
  return (
    <section className="bg-white py-10">
      <div className="mx-auto max-w-5xl px-6 [mask-image:linear-gradient(to_right,transparent,black_12%,black_88%,transparent)]">
        <InfiniteSlider gap={56} speed={45} speedOnHover={15}>
          {copy.logos.map((name) => (
            <span
              key={name}
              className="select-none whitespace-nowrap text-xl font-bold tracking-tight text-ink-soft/55"
            >
              {name}
            </span>
          ))}
        </InfiniteSlider>
      </div>
    </section>
  );
}
