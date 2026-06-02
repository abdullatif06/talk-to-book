// TalkToBook — main chat UI (blueprint Phase 9, Screen 2).
// Day 7 polish: shows gathered trip params, example-prompt chips on first load,
// a prominent "ابحث الآن" trigger, and clearer loading / no-results states —
// so the experience holds up even on the weaker free Gemini model.
"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import ChatTopBar from "./ChatTopBar";
import ChatInput from "./ChatInput";
import MessageBubble from "./MessageBubble";
import TypingIndicator from "./TypingIndicator";
import HotelCard from "./HotelCard";
import SearchParams from "./SearchParams";
import type {
  ChatMessage,
  ChatResponse,
  Hotel,
  Lang,
  TravelParams,
} from "@/types";

interface UiMessage extends ChatMessage {
  hotels?: Hotel[];
}

const WELCOME: Record<Lang, string> = {
  ar: "مرحباً! أنا مساعدك لحجز الفنادق. أخبرني عن رحلتك — الوجهة، التواريخ، وكم شخص — وأنا أبحث لك عن الأنسب.",
  en: "Hi! I'm your hotel booking assistant. Tell me about your trip — destination, dates, and how many people — and I'll find the best options.",
};

const NO_RESULTS: Record<Lang, string> = {
  ar: "ما لقيت فنادق مطابقة ضمن ميزانيتك. تحب نوسّع البحث أو نرفع الميزانية شوي؟",
  en: "I couldn't find matching hotels within your budget. Want me to widen the search or raise the budget a bit?",
};

const RESULTS_INTRO: Record<Lang, string> = {
  ar: "تفضّل، هذه أفضل ٣ خيارات لرحلتك:",
  en: "Here are the top 3 options for your trip:",
};

const SEARCH_NOW: Record<Lang, string> = { ar: "ابحث الآن 🔍", en: "Search now 🔍" };

// Tappable starter prompts (tuned to extract cleanly on the free model).
const EXAMPLES: Record<Lang, string[]> = {
  ar: [
    "فندق في دبي من 2026-07-10 إلى 2026-07-12، شخصان، ميزانية 150 دولار",
    "فندق حلال في عمّان من 2026-08-01 إلى 2026-08-05، شخصان وطفلان",
    "فندق في إسطنبول من 2026-09-03 إلى 2026-09-07، شخصان، قريب من السوق",
  ],
  en: [
    "Hotel in Dubai from 2026-07-10 to 2026-07-12, 2 adults, budget $150",
    "Halal hotel in Amman from 2026-08-01 to 2026-08-05, 2 adults 2 children",
    "Hotel in Istanbul from 2026-09-03 to 2026-09-07, 2 adults, near the souk",
  ],
};

function welcomeMessage(lang: Lang): UiMessage {
  return { role: "model", content: WELCOME[lang] };
}

function canSearch(p: Partial<TravelParams>): boolean {
  return Boolean(p.destination && p.checkin && p.checkout);
}

export default function ChatInterface() {
  const [lang, setLang] = useState<Lang>("ar");
  const [messages, setMessages] = useState<UiMessage[]>([welcomeMessage("ar")]);
  const [isTyping, setIsTyping] = useState(false);
  const [params, setParams] = useState<Partial<TravelParams>>({});
  const [resultsShown, setResultsShown] = useState(false);

  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({
      top: scrollRef.current.scrollHeight,
      behavior: "smooth",
    });
  }, [messages, isTyping]);

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

  const sendMessage = useCallback(
    async (text: string) => {
      const userMsg: UiMessage = { role: "user", content: text };
      const history: ChatMessage[] = messages
        .filter((m) => m.content !== WELCOME[lang])
        .map(({ role, content }) => ({ role, content }));

      setMessages((prev) => [...prev, userMsg]);
      setIsTyping(true);

      try {
        const res = await fetch("/api/chat", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ message: text, history }),
        });
        const data = (await res.json()) as ChatResponse;
        mergeParams(data.params);

        const hotels = data.hotels ?? [];
        if (hotels.length) setResultsShown(true);

        const hasReply = Boolean(data.reply?.trim());
        const content = hasReply
          ? data.reply!
          : data.has_results === false && data.ready_to_search
            ? NO_RESULTS[lang]
            : "";

        setMessages((prev) => [
          ...prev,
          { role: "model", content, hotels: hotels.length ? hotels : undefined },
        ]);
      } catch {
        setMessages((prev) => [
          ...prev,
          {
            role: "model",
            content:
              lang === "ar"
                ? "حدث خطأ في الاتصال. حاول مرة أخرى."
                : "A connection error occurred. Please try again.",
          },
        ]);
      } finally {
        setIsTyping(false);
      }
    },
    [messages, lang],
  );

  const runSearch = useCallback(async () => {
    if (!canSearch(params) || isTyping) return;
    setIsTyping(true);
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
      const data = (await res.json()) as { hotels?: Hotel[] };
      const hotels = data.hotels ?? [];
      setResultsShown(true);
      setMessages((prev) => [
        ...prev,
        {
          role: "model",
          content: hotels.length ? RESULTS_INTRO[lang] : NO_RESULTS[lang],
          hotels: hotels.length ? hotels : undefined,
        },
      ]);
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          role: "model",
          content:
            lang === "ar"
              ? "حدث خطأ أثناء البحث. حاول مرة أخرى."
              : "Search failed. Please try again.",
        },
      ]);
    } finally {
      setIsTyping(false);
    }
  }, [params, isTyping, lang]);

  function resetState(next: Lang) {
    setMessages([welcomeMessage(next)]);
    setParams({});
    setResultsShown(false);
    setIsTyping(false);
  }

  function handleNewTrip() {
    resetState(lang);
  }

  function handleToggleLang() {
    setLang((prev) => {
      const next: Lang = prev === "ar" ? "en" : "ar";
      resetState(next);
      return next;
    });
  }

  const showExamples = messages.length === 1 && !isTyping;
  const showSearchButton = canSearch(params) && !resultsShown && !isTyping;

  return (
    <div
      dir={lang === "ar" ? "rtl" : "ltr"}
      className="flex h-[100dvh] flex-1 flex-col bg-panel pattern-arabesque"
    >
      <ChatTopBar
        lang={lang}
        onNewTrip={handleNewTrip}
        onToggleLang={handleToggleLang}
      />

      <div ref={scrollRef} className="flex-1 overflow-y-auto px-4 py-6">
        <div className="mx-auto flex max-w-2xl flex-col gap-4">
          {messages.map((m, i) => (
            <div key={i} className="flex flex-col gap-4">
              {m.content && <MessageBubble message={m} />}
              {m.hotels && m.hotels.length > 0 && (
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                  {m.hotels.map((hotel) => (
                    <HotelCard key={hotel.id} hotel={hotel} />
                  ))}
                </div>
              )}
            </div>
          ))}

          {/* Example-prompt chips on first load */}
          {showExamples && (
            <div className="flex flex-col gap-2">
              {EXAMPLES[lang].map((ex, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => sendMessage(ex)}
                  className="animate-fade-up self-end rounded-2xl border border-primary/25 bg-white px-4 py-2.5 text-start text-sm text-ink shadow-sm transition-all hover:border-primary hover:bg-primary/5"
                  style={{ animationDelay: `${i * 80}ms` }}
                >
                  {ex}
                </button>
              ))}
            </div>
          )}

          {isTyping && <TypingIndicator />}
        </div>
      </div>

      {/* Trip summary + search trigger + input */}
      <div className="border-t border-line bg-white/95 backdrop-blur-md">
        <div className="mx-auto max-w-2xl px-4 pt-3">
          <SearchParams params={params} lang={lang} />
          {showSearchButton && (
            <button
              type="button"
              onClick={runSearch}
              className="mb-2 w-full rounded-full bg-gold py-3.5 text-center text-base font-bold text-white shadow-card transition-all hover:brightness-95"
            >
              {SEARCH_NOW[lang]}
            </button>
          )}
        </div>
        <ChatInput lang={lang} disabled={isTyping} onSend={sendMessage} />
      </div>
    </div>
  );
}
