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
    <header className="flex items-center justify-between border-b border-line bg-white/90 px-4 py-3 backdrop-blur-md">
      <Link href="/" className="flex items-center gap-1.5">
        <span className="text-xl">🏨</span>
        <span className="font-display text-xl text-primary">TalkToBook</span>
      </Link>

      <div className="flex items-center gap-2">
        <button
          type="button"
          onClick={onNewTrip}
          className="flex items-center gap-1.5 rounded-full border border-primary/25 px-3.5 py-1.5 text-sm font-semibold text-primary transition-colors hover:bg-primary/5"
        >
          <PlusIcon className="h-4 w-4" />
          {t.newTrip}
        </button>

        <button
          type="button"
          onClick={onToggleLang}
          aria-label="Toggle language"
          className="rounded-full border border-line px-3.5 py-1.5 text-sm font-semibold text-ink transition-colors hover:bg-panel"
        >
          {t.toggle}
        </button>
      </div>
    </header>
  );
}
