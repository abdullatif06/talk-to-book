// TalkToBook — compact LIVE chat embedded in the hero mockup.
// Real pipeline: /api/chat (Gemini intent) -> when ready, /api/search -> shows
// the 3 hotel cards INSIDE the mockup's scroll area. On rate-limit/error it
// shows a graceful "open full chat" fallback instead of looking broken.
"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Send, ArrowLeft } from "lucide-react";
import { useLanding } from "@/lib/i18n";
import type { ChatMessage, ChatResponse, Hotel, TravelParams } from "@/types";

interface UiMsg extends ChatMessage {
  hotels?: Hotel[];
}

function canSearch(p: Partial<TravelParams>): boolean {
  return Boolean(p.destination && p.checkin && p.checkout);
}

export default function MiniChat() {
  const { copy, lang } = useLanding();
  const t = {
    fallback:
      lang === "ar"
        ? "الخدمة مشغولة حالياً — افتح المحادثة الكاملة للمتابعة."
        : "Service is busy right now — open the full chat to continue.",
    open: lang === "ar" ? "افتح المحادثة" : "Open full chat",
    searchNow: lang === "ar" ? "ابحث الآن 🔍" : "Search now 🔍",
    resultsIntro: lang === "ar" ? "هذه أفضل ٣ خيارات:" : "Here are the top 3 options:",
    noResults:
      lang === "ar" ? "ما لقيت نتائج مطابقة." : "No matching results found.",
  };

  const [messages, setMessages] = useState<UiMsg[]>([
    { role: "model", content: copy.heroDemoAI },
  ]);
  const [value, setValue] = useState("");
  const [busy, setBusy] = useState(false);
  const [params, setParams] = useState<Partial<TravelParams>>({});
  const [failed, setFailed] = useState(false);
  const [resultsShown, setResultsShown] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, busy]);

  function mergeParams(next?: Partial<TravelParams>) {
    if (!next) return;
    setParams((prev) => {
      const merged = { ...prev };
      for (const [k, v] of Object.entries(next)) {
        if (v !== null && v !== undefined && v !== "") {
          (merged as Record<string, unknown>)[k] = v;
        }
      }
      return merged;
    });
  }

  const send = useCallback(
    async (text: string) => {
      const history: ChatMessage[] = messages.map(({ role, content }) => ({ role, content }));
      setMessages((m) => [...m, { role: "user", content: text }]);
      setBusy(true);
      try {
        const res = await fetch("/api/chat", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ message: text, history }),
        });
        if (!res.ok) throw new Error("chat failed");
        const data = (await res.json()) as ChatResponse;
        mergeParams(data.params);
        const hotels = data.hotels ?? [];
        if (hotels.length) setResultsShown(true);
        setMessages((m) => [
          ...m,
          { role: "model", content: data.reply ?? "", hotels: hotels.length ? hotels : undefined },
        ]);
      } catch {
        setFailed(true);
      } finally {
        setBusy(false);
      }
    },
    [messages],
  );

  const runSearch = useCallback(async () => {
    if (!canSearch(params) || busy) return;
    setBusy(true);
    try {
      const res = await fetch("/api/search", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          destination: params.destination,
          checkin: params.checkin,
          checkout: params.checkout,
          adults: params.adults ?? 2,
          children: params.children ?? 0,
          budget_max: params.budget_usd ?? undefined,
        }),
      });
      if (!res.ok) throw new Error("search failed");
      const data = (await res.json()) as { hotels?: Hotel[] };
      const hotels = data.hotels ?? [];
      setResultsShown(true);
      setMessages((m) => [
        ...m,
        {
          role: "model",
          content: hotels.length ? t.resultsIntro : t.noResults,
          hotels: hotels.length ? hotels : undefined,
        },
      ]);
    } catch {
      setFailed(true);
    } finally {
      setBusy(false);
    }
  }, [params, busy, t.resultsIntro, t.noResults]);

  function submit() {
    const text = value.trim();
    if (!text || busy) return;
    setValue("");
    send(text);
  }

  const showSearch = canSearch(params) && !resultsShown && !busy && !failed;

  return (
    <div className="flex h-full flex-col bg-white">
      {/* messages */}
      <div ref={scrollRef} className="flex-1 overflow-y-auto p-4">
        <div className="flex flex-col gap-2.5">
          {messages.map((m, i) => {
            const isUser = m.role === "user";
            return (
              <div key={i} className="flex flex-col gap-2.5">
                {m.content && (
                  <div className={`flex ${isUser ? "justify-start" : "justify-end"}`}>
                    <div
                      className={`max-w-[85%] rounded-2xl px-3.5 py-2 text-[13px] leading-relaxed ${
                        isUser
                          ? "rounded-tr-sm bg-primary text-white"
                          : "rounded-tl-sm border border-line bg-panel text-ink"
                      }`}
                    >
                      {m.content}
                    </div>
                  </div>
                )}
                {m.hotels && m.hotels.length > 0 && (
                  <div className="grid grid-cols-1 gap-2 sm:grid-cols-3">
                    {m.hotels.map((h) => (
                      <a
                        key={h.id}
                        href={h.booking_url_base}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="overflow-hidden rounded-xl border border-line bg-white"
                      >
                        <div className="relative h-16 w-full bg-panel">
                          {h.image_url && (
                            <Image src={h.image_url} alt={h.name} fill sizes="160px" className="object-cover" />
                          )}
                        </div>
                        <div className="p-2">
                          <p className="truncate text-[11px] font-bold text-ink">{h.name_ar || h.name}</p>
                          <p className="text-[11px] font-bold text-price">
                            {h.price_per_night > 0 ? `${h.price_per_night}$` : "—"}
                          </p>
                        </div>
                      </a>
                    ))}
                  </div>
                )}
              </div>
            );
          })}

          {busy && (
            <div className="flex justify-end">
              <div className="flex items-center gap-1.5 rounded-2xl rounded-tl-sm border border-line bg-panel px-3.5 py-3">
                <span className="typing-dot h-1.5 w-1.5 rounded-full bg-primary" />
                <span className="typing-dot h-1.5 w-1.5 rounded-full bg-primary [animation-delay:0.2s]" />
                <span className="typing-dot h-1.5 w-1.5 rounded-full bg-primary [animation-delay:0.4s]" />
              </div>
            </div>
          )}

          {failed && (
            <div className="flex flex-col items-center gap-2 rounded-xl bg-panel p-4 text-center">
              <p className="text-[13px] text-ink-soft">{t.fallback}</p>
              <Link
                href="/chat"
                className="rounded-full bg-primary px-4 py-1.5 text-xs font-bold text-white"
              >
                {t.open}
              </Link>
            </div>
          )}

          {showSearch && (
            <button
              type="button"
              onClick={runSearch}
              className="mt-1 w-full rounded-full bg-gold py-2 text-center text-[13px] font-bold text-white"
            >
              {t.searchNow}
            </button>
          )}
        </div>
      </div>

      {/* input */}
      <div className="border-t border-line p-3">
        <div className="flex items-center gap-2">
          <input
            value={value}
            onChange={(e) => setValue(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && submit()}
            disabled={busy || failed}
            placeholder={copy.heroPlaceholder}
            className="min-w-0 flex-1 rounded-xl border border-line bg-panel px-3 py-2 text-[13px] text-ink outline-none placeholder:text-ink-soft/60 focus:border-primary disabled:opacity-60"
          />
          <button
            type="button"
            onClick={submit}
            disabled={busy || failed || !value.trim()}
            aria-label="send"
            className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-primary text-white disabled:opacity-40"
          >
            <Send className="h-4 w-4 ltr:rotate-0 rtl:-scale-x-100" />
          </button>
        </div>
      </div>
    </div>
  );
}
