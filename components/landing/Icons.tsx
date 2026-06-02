// TalkToBook landing — cohesive SVG icon set (replaces emoji for a real-product
// feel). All icons share a 24x24 viewbox, currentColor stroke, rounded joins.
type P = { className?: string };

const base = {
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.8,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
};

/** Chat bubble — "describe your trip". */
export function ChatIcon({ className }: P) {
  return (
    <svg {...base} className={className} aria-hidden>
      <path d="M21 11.5a8.38 8.38 0 0 1-8.5 8.5 9 9 0 0 1-3.9-.9L3 21l1.9-5.1A8.38 8.38 0 0 1 4 11.5 8.5 8.5 0 0 1 12.5 3 8.38 8.38 0 0 1 21 11.5z" />
      <circle cx="8.5" cy="11.5" r="0.6" fill="currentColor" />
      <circle cx="12.5" cy="11.5" r="0.6" fill="currentColor" />
      <circle cx="16.5" cy="11.5" r="0.6" fill="currentColor" />
    </svg>
  );
}

/** Sparkles — "AI understands & searches". */
export function SparklesIcon({ className }: P) {
  return (
    <svg {...base} className={className} aria-hidden>
      <path d="M12 3l1.6 4.6L18 9l-4.4 1.4L12 15l-1.6-4.6L6 9l4.4-1.4L12 3z" />
      <path d="M18.5 14.5l.7 2 2 .7-2 .7-.7 2-.7-2-2-.7 2-.7.7-2z" />
    </svg>
  );
}

/** Building / hotel — "choose & book". */
export function HotelIcon({ className }: P) {
  return (
    <svg {...base} className={className} aria-hidden>
      <path d="M3 21h18" />
      <path d="M5 21V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v16" />
      <path d="M9 7h.01M12 7h.01M15 7h.01M9 11h.01M12 11h.01M15 11h.01" />
      <path d="M10 21v-3a2 2 0 0 1 4 0v3" />
    </svg>
  );
}

/** Shield-check — "real Arabic, not machine translation". */
export function ShieldIcon({ className }: P) {
  return (
    <svg {...base} className={className} aria-hidden>
      <path d="M12 3l7 3v5c0 4.5-3 8-7 10-4-2-7-5.5-7-10V6l7-3z" />
      <path d="M9 12l2 2 4-4" />
    </svg>
  );
}

/** Globe — "1M+ hotels worldwide". */
export function GlobeIcon({ className }: P) {
  return (
    <svg {...base} className={className} aria-hidden>
      <circle cx="12" cy="12" r="9" />
      <path d="M3 12h18" />
      <path d="M12 3a14 14 0 0 1 0 18 14 14 0 0 1 0-18z" />
    </svg>
  );
}

/** Tag — "100% free". */
export function TagIcon({ className }: P) {
  return (
    <svg {...base} className={className} aria-hidden>
      <path d="M20.6 13.4l-7.2 7.2a2 2 0 0 1-2.8 0l-7-7a2 2 0 0 1-.6-1.4V5a2 2 0 0 1 2-2h7.2a2 2 0 0 1 1.4.6l7 7a2 2 0 0 1 0 2.8z" />
      <circle cx="7.5" cy="7.5" r="1" fill="currentColor" />
    </svg>
  );
}

/** Moon (halal/Islamic-friendly). */
export function MoonIcon({ className }: P) {
  return (
    <svg {...base} className={className} aria-hidden>
      <path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z" />
    </svg>
  );
}

/** Heart (family-friendly). */
export function HeartIcon({ className }: P) {
  return (
    <svg {...base} className={className} aria-hidden>
      <path d="M19 5.6a4.4 4.4 0 0 0-6.2 0L12 6.4l-.8-.8A4.4 4.4 0 1 0 5 11.8l7 7 7-7a4.4 4.4 0 0 0 0-6.2z" />
    </svg>
  );
}

/** WhatsApp glyph (sharing). */
export function WhatsAppIcon({ className }: P) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden>
      <path d="M12 2a10 10 0 0 0-8.6 15l-1.4 5 5.1-1.3A10 10 0 1 0 12 2zm0 18a8 8 0 0 1-4.1-1.1l-.3-.2-3 .8.8-2.9-.2-.3A8 8 0 1 1 12 20zm4.4-6c-.2-.1-1.4-.7-1.6-.8s-.4-.1-.5.1-.6.8-.8 1-.3.2-.5.1a6.5 6.5 0 0 1-1.9-1.2 7.2 7.2 0 0 1-1.3-1.7c-.1-.2 0-.4.1-.5l.4-.4.2-.4v-.4c0-.1-.5-1.3-.7-1.7s-.4-.4-.5-.4h-.5a1 1 0 0 0-.7.3 3 3 0 0 0-.9 2.2 5.2 5.2 0 0 0 1.1 2.7 11.9 11.9 0 0 0 4.6 4c.6.3 1.1.4 1.5.5a3.6 3.6 0 0 0 1.6.1 2.7 2.7 0 0 0 1.8-1.3 2.2 2.2 0 0 0 .2-1.3c-.1-.1-.3-.2-.5-.3z" />
    </svg>
  );
}

/** Map pin (destinations / location). */
export function PinIcon({ className }: P) {
  return (
    <svg {...base} className={className} aria-hidden>
      <path d="M12 21s-6-5.3-6-10a6 6 0 0 1 12 0c0 4.7-6 10-6 10z" />
      <circle cx="12" cy="11" r="2.2" />
    </svg>
  );
}

/** Chevron (FAQ accordion). */
export function ChevronIcon({ className }: P) {
  return (
    <svg {...base} className={className} aria-hidden>
      <path d="M6 9l6 6 6-6" />
    </svg>
  );
}

/** Check / cross for the comparison table. */
export function CheckIcon({ className }: P) {
  return (
    <svg {...base} className={className} aria-hidden>
      <path d="M20 6L9 17l-5-5" />
    </svg>
  );
}
export function CrossIcon({ className }: P) {
  return (
    <svg {...base} className={className} aria-hidden>
      <path d="M18 6L6 18M6 6l12 12" />
    </svg>
  );
}
