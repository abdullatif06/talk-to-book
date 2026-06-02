// ZoomParallax — images that scale up as you scroll through a tall sticky
// section (adapted to motion/react). Reduced-motion: renders a simple static
// grid instead of the 300vh zoom.
"use client";

import { useRef } from "react";
import { useScroll, useTransform, motion, useReducedMotion } from "motion/react";

interface Img {
  src: string;
  alt?: string;
}

export function ZoomParallax({ images }: { images: Img[] }) {
  const container = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ["start start", "end end"],
  });

  const scale4 = useTransform(scrollYProgress, [0, 1], [1, 4]);
  const scale5 = useTransform(scrollYProgress, [0, 1], [1, 5]);
  const scale6 = useTransform(scrollYProgress, [0, 1], [1, 6]);
  const scale8 = useTransform(scrollYProgress, [0, 1], [1, 8]);
  const scale9 = useTransform(scrollYProgress, [0, 1], [1, 9]);
  const scales = [scale4, scale5, scale6, scale5, scale6, scale8, scale9];

  // Reduced motion: a calm static grid (no giant scroll section).
  if (reduced) {
    return (
      <div className="mx-auto grid max-w-5xl grid-cols-2 gap-3 px-6 py-12 sm:grid-cols-3">
        {images.slice(0, 6).map((img, i) => (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            key={i}
            src={img.src}
            alt={img.alt ?? ""}
            className="h-40 w-full rounded-xl object-cover"
          />
        ))}
      </div>
    );
  }

  return (
    <div ref={container} className="relative h-[300vh]">
      <div className="sticky top-0 h-screen overflow-hidden">
        {images.map(({ src, alt }, index) => {
          const scale = scales[index % scales.length];
          return (
            <motion.div
              key={index}
              style={{ scale }}
              className={`absolute top-0 flex h-full w-full items-center justify-center ${index === 1 ? "[&>div]:!-top-[30vh] [&>div]:!left-[5vw] [&>div]:!h-[30vh] [&>div]:!w-[35vw]" : ""} ${index === 2 ? "[&>div]:!-top-[10vh] [&>div]:!-left-[25vw] [&>div]:!h-[45vh] [&>div]:!w-[20vw]" : ""} ${index === 3 ? "[&>div]:!left-[27.5vw] [&>div]:!h-[25vh] [&>div]:!w-[25vw]" : ""} ${index === 4 ? "[&>div]:!top-[27.5vh] [&>div]:!left-[5vw] [&>div]:!h-[25vh] [&>div]:!w-[20vw]" : ""} ${index === 5 ? "[&>div]:!top-[27.5vh] [&>div]:!-left-[22.5vw] [&>div]:!h-[25vh] [&>div]:!w-[30vw]" : ""} ${index === 6 ? "[&>div]:!top-[22.5vh] [&>div]:!left-[25vw] [&>div]:!h-[15vh] [&>div]:!w-[15vw]" : ""} `}
            >
              <div className="relative h-[25vh] w-[25vw]">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={src}
                  alt={alt ?? `Parallax image ${index + 1}`}
                  className="h-full w-full rounded-xl object-cover"
                />
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
