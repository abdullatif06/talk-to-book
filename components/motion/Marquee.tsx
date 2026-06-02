// Infinite horizontal marquee (Magic-UI-style). Duplicates children so the loop
// is seamless; pauses on hover; reverses in RTL (handled in globals.css).
"use client";

import type { ReactNode } from "react";

export default function Marquee({
  children,
  durationSec = 40,
  className = "",
}: {
  children: ReactNode;
  durationSec?: number;
  className?: string;
}) {
  return (
    <div className={`marquee-mask w-full overflow-hidden ${className}`}>
      <div
        className="marquee-track"
        style={{ ["--marquee-duration" as string]: `${durationSec}s` }}
      >
        {children}
        {/* duplicate for a seamless loop */}
        {children}
      </div>
    </div>
  );
}
