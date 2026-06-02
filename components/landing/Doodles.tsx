// TalkToBook landing — decorative doodles (Jadoo-style): dotted plane path,
// little circles, soft accent shapes. Inline SVG, currentColor where useful.
type P = { className?: string };

/** Dashed curved path with a tiny plane at the end. */
export function PlanePath({ className }: P) {
  return (
    <svg
      className={className}
      viewBox="0 0 220 90"
      fill="none"
      stroke="currentColor"
      aria-hidden
    >
      <path
        d="M4 70 C 60 10, 150 10, 210 40"
        strokeWidth="2"
        strokeDasharray="2 8"
        strokeLinecap="round"
      />
      <path
        d="M205 33 l10 7 -10 7 2 -7 z"
        fill="currentColor"
        stroke="none"
      />
    </svg>
  );
}

/** A small ring of dots (corner accent). */
export function DotGrid({ className }: P) {
  const dots = [];
  for (let r = 0; r < 4; r++) {
    for (let c = 0; c < 4; c++) {
      dots.push(<circle key={`${r}-${c}`} cx={4 + c * 12} cy={4 + r * 12} r="2" />);
    }
  }
  return (
    <svg className={className} viewBox="0 0 48 48" fill="currentColor" aria-hidden>
      {dots}
    </svg>
  );
}

/** Tiny decorative plane glyph. */
export function PlaneGlyph({ className }: P) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M21 16v-2l-8-5V3.5A1.5 1.5 0 0 0 11.5 2 1.5 1.5 0 0 0 10 3.5V9l-8 5v2l8-2.5V19l-2 1.5V22l3.5-1 3.5 1v-1.5L13 19v-5.5z" />
    </svg>
  );
}
