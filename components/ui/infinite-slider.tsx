// InfiniteSlider — seamless horizontal auto-scroll (Motion). Duplicates content
// for a continuous loop; supports speed, reverse, gap, and slow-down on hover.
// Reduced-motion: renders a static, wrapped row.
"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import { motion, useAnimationFrame, useMotionValue, useReducedMotion } from "motion/react";
import { cn } from "@/lib/utils";

export function InfiniteSlider({
  children,
  gap = 40,
  speed = 60,
  speedOnHover,
  reverse = false,
  className,
}: {
  children: ReactNode;
  gap?: number;
  speed?: number;
  speedOnHover?: number;
  reverse?: boolean;
  className?: string;
}) {
  const reduced = useReducedMotion();
  const x = useMotionValue(0);
  const trackRef = useRef<HTMLDivElement>(null);
  const [halfWidth, setHalfWidth] = useState(0);
  const [hovered, setHovered] = useState(false);

  useEffect(() => {
    if (!trackRef.current) return;
    // The track holds the children twice; half = one full set (+gap).
    const measure = () => setHalfWidth(trackRef.current!.scrollWidth / 2);
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, [children, gap]);

  useAnimationFrame((_, delta) => {
    if (reduced || halfWidth === 0) return;
    const pps = (hovered && speedOnHover != null ? speedOnHover : speed) * (delta / 1000);
    const dir = reverse ? 1 : -1;
    let next = x.get() + dir * pps;
    // wrap seamlessly
    if (next <= -halfWidth) next += halfWidth;
    if (next >= 0) next -= halfWidth;
    x.set(next);
  });

  return (
    <div
      className={cn("overflow-hidden", className)}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <motion.div ref={trackRef} className="flex w-max" style={{ x, gap }}>
        <div className="flex shrink-0 items-center" style={{ gap }}>
          {children}
        </div>
        <div className="flex shrink-0 items-center" style={{ gap }} aria-hidden>
          {children}
        </div>
      </motion.div>
    </div>
  );
}
