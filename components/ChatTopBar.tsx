// TalkToBook — chat top bar (blueprint Phase 9, Screen 2).
// Small logo · "رحلة جديدة" (New Trip, clears the conversation) · AR/EN toggle.
import Link from "next/link";
import { PlusIcon } from "./Icon";
import type { Lang } from "@/types";

const LABELS = {
  ar: { newTrip: "رحلة جديدة", toggle: "EN" },
  en: { newTrip: "New Trip", toggle: "ع" },
} as const;

export default function ChatTopBar({
  lang,
  onNewTrip,
  onToggleLang,
}: {
  lang: Lang;
  onNewTrip: () => void;
  onToggleLang: () => void;
}) {
  const t = LABELS[lang];

  return (
    <header className="flex items-center justify-between border-b border-brand-dark/10 bg-white/80 px-4 py-3 backdrop-blur">
      <Link href="/" className="text-lg font-bold text-brand-teal">
        TalkToBook
      </Link>

      <div className="flex items-center gap-2">
        <button
          type="button"
          onClick={onNewTrip}
          className="flex items-center gap-1.5 rounded-full border border-brand-teal/30 px-3 py-1.5 text-sm font-medium text-brand-teal transition-colors hover:bg-brand-light"
        >
          <PlusIcon className="h-4 w-4" />
          {t.newTrip}
        </button>

        <button
          type="button"
          onClick={onToggleLang}
          aria-label="Toggle language"
          className="rounded-full border border-brand-dark/15 px-3 py-1.5 text-sm font-semibold text-brand-dark transition-colors hover:bg-brand-light"
        >
          {t.toggle}
        </button>
      </div>
    </header>
  );
}
