// TalkToBook — site-wide smooth scrolling (Lenis).
// Uses the current `lenis/react` API (ReactLenis root). Honors
// prefers-reduced-motion (renders children without smoothing) and resets scroll
// to top on route change so navigating to /chat doesn't land mid-page.
"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { ReactLenis, useLenis } from "lenis/react";

function ScrollReset() {
  const pathname = usePathname();
  const lenis = useLenis();
  useEffect(() => {
    lenis?.scrollTo(0, { immediate: true });
  }, [pathname, lenis]);
  return null;
}

export default function SmoothScroll({ children }: { children: React.ReactNode }) {
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduced(mq.matches);
    const handler = (e: MediaQueryListEvent) => setReduced(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  // Reduced motion → skip Lenis entirely (native scroll, no smoothing).
  if (reduced) return <>{children}</>;

  return (
    <ReactLenis root options={{ lerp: 0.1, smoothWheel: true, syncTouch: false }}>
      <ScrollReset />
      {children}
    </ReactLenis>
  );
}
