// TalkToBook — reusable scroll-reveal primitives (Motion).
// Refined & purposeful: short ease-out entrances, gated by prefers-reduced-motion.
//
// Robustness: we use an explicit useInView ref PLUS a mount fallback timer. If
// the in-view detection hasn't fired shortly after mount (e.g. smooth-scroll
// quirks, deep-links, or headless capture), we reveal anyway — content must
// never get stuck invisible.
"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import { motion, useInView, useReducedMotion, type Variants } from "motion/react";

const EASE = [0.22, 1, 0.36, 1] as const;

function useReveal() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const [fallback, setFallback] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => setFallback(true), 700);
    return () => clearTimeout(t);
  }, []);
  return { ref, show: inView || fallback };
}

/** Fade + rise a single element into view (once). */
export function Reveal({
  children,
  delay = 0,
  y = 16,
  className,
}: {
  children: ReactNode;
  delay?: number;
  y?: number;
  className?: string;
}) {
  const reduced = useReducedMotion();
  const { ref, show } = useReveal();
  return (
    <motion.div
      ref={ref}
      className={className}
      initial={reduced ? false : { opacity: 0, y }}
      animate={reduced ? undefined : show ? { opacity: 1, y: 0 } : undefined}
      transition={{ duration: 0.5, ease: EASE, delay }}
    >
      {children}
    </motion.div>
  );
}

/** Container that staggers its <RevealItem> children. */
export function Stagger({
  children,
  className,
  gap = 0.08,
}: {
  children: ReactNode;
  className?: string;
  gap?: number;
}) {
  const reduced = useReducedMotion();
  const { ref, show } = useReveal();
  const container: Variants = {
    hidden: {},
    show: { transition: { staggerChildren: reduced ? 0 : gap } },
  };
  return (
    <motion.div
      ref={ref}
      className={className}
      variants={container}
      initial={reduced ? false : "hidden"}
      animate={reduced ? undefined : show ? "show" : "hidden"}
    >
      {children}
    </motion.div>
  );
}

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 18 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: EASE } },
};

/** A child of <Stagger>. */
export function RevealItem({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <motion.div className={className} variants={itemVariants}>
      {children}
    </motion.div>
  );
}
