// Mouse-follow spotlight glow (Aceternity-style) wrapper. Tracks the cursor over
// its own area and paints a radial glow behind its children. Disabled under
// reduced motion. Use around a card/section you want to feel interactive.
"use client";

import { useRef, useState, type ReactNode } from "react";
import { useReducedMotion } from "motion/react";

export default function Spotlight({
  children,
  className = "",
  color = "rgba(10,108,224,0.16)",
  size = 380,
}: {
  children: ReactNode;
  className?: string;
  color?: string;
  size?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const [pos, setPos] = useState({ x: -9999, y: -9999, on: false });

  return (
    <div
      ref={ref}
      onMouseMove={
        reduced
          ? undefined
          : (e) => {
              const r = ref.current?.getBoundingClientRect();
              if (!r) return;
              setPos({ x: e.clientX - r.left, y: e.clientY - r.top, on: true });
            }
      }
      onMouseLeave={() => setPos((p) => ({ ...p, on: false }))}
      className={`relative ${className}`}
    >
      {!reduced && (
        <div
          aria-hidden
          className={`pointer-events-none absolute inset-0 z-0 rounded-[inherit] transition-opacity duration-300 ${
            pos.on ? "opacity-100" : "opacity-0"
          }`}
          style={{
            background: `radial-gradient(${size}px circle at ${pos.x}px ${pos.y}px, ${color}, transparent 70%)`,
          }}
        />
      )}
      <div className="relative z-10">{children}</div>
    </div>
  );
}
