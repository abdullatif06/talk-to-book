// TalkToBook — gathered-trip summary (blueprint Phase 5 & 9).
// Shows the params extracted so far as compact chips, so the user sees the
// conversation making progress (especially helpful on the weaker free model).
import type { Lang, TravelParams } from "@/types";

const T = {
  ar: {
    title: "رحلتك حتى الآن",
    dest: "الوجهة",
    dates: "التواريخ",
    guests: "النزلاء",
    adults: "بالغ",
    children: "طفل",
    budget: "الميزانية",
    night: "/ ليلة",
    halal: "حلال",
    to: "←",
  },
  en: {
    title: "Your trip so far",
    dest: "Destination",
    dates: "Dates",
    guests: "Guests",
    adults: "adults",
    children: "children",
    budget: "Budget",
    night: "/ night",
    halal: "Halal",
    to: "→",
  },
} as const;

function Chip({ children }: { children: React.ReactNode }) {
  return (
    <span className="rounded-full bg-white px-3 py-1 text-xs font-medium text-brand-dark shadow-sm ring-1 ring-brand-teal/15">
      {children}
    </span>
  );
}

export default function SearchParams({
  params,
  lang,
}: {
  params: Partial<TravelParams>;
  lang: Lang;
}) {
  const t = T[lang];

  const hasAny =
    params.destination ||
    params.checkin ||
    params.adults ||
    params.budget_usd ||
    params.halal;
  if (!hasAny) return null;

  const dest = params.destination_ar || params.destination;
  const guests =
    params.adults || params.children
      ? [
          params.adults ? `${params.adults} ${t.adults}` : null,
          params.children ? `${params.children} ${t.children}` : null,
        ]
          .filter(Boolean)
          .join(" · ")
      : null;

  return (
    <div className="flex flex-wrap items-center gap-2 px-1 pb-2">
      <span className="text-xs text-brand-dark/50">{t.title}:</span>
      {dest && <Chip>📍 {dest}</Chip>}
      {params.checkin && (
        <Chip>
          🗓 {params.checkin}
          {params.checkout ? ` ${t.to} ${params.checkout}` : ""}
        </Chip>
      )}
      {guests && <Chip>👥 {guests}</Chip>}
      {params.budget_usd ? (
        <Chip>
          💰 {params.budget_usd}$ {t.night}
        </Chip>
      ) : null}
      {params.halal && <Chip>✅ {t.halal}</Chip>}
    </div>
  );
}
