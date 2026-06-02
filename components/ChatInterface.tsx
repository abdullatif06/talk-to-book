// TalkToBook — main chat UI (blueprint Phase 9, Screen 2).
// Day 5: end-to-end — sends to /api/chat, renders the reply, and shows the 3
// result cards inline. Cards appear when /api/chat auto-triggers a search
// (ready_to_search), and also via an "ابحث الآن" button once enough params are
// gathered — a reliable fallback for weaker free models that hesitate to set
// ready_to_search themselves. The button calls the Phase 7 /api/search endpoint.
"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import ChatTopBar from "./ChatTopBar";
import ChatInput from "./ChatInput";
import MessageBubble from "./MessageBubble";
import TypingIndicator from "./TypingIndicator";
import HotelCard from "./HotelCard";
import type {
  ChatMessage,
  ChatResponse,
  Hotel,
  Lang,
  TravelParams,
} from "@/types";

// A chat turn as held in UI state — may carry hotel result cards.
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

const SEARCH_NOW: Record<Lang, string> = { ar: "ابحث الآن 🔍", en: "Search now 🔍" };

function welcomeMessage(lang: Lang): UiMessage {
  return { role: "model", content: WELCOME[lang] };
}

/** Enough info to search? Need destination + both dates. */
function canSearch(p: Partial<TravelParams>): boolean {
  return Boolean(p.destination && p.checkin && p.checkout);
}

export default function ChatInterface() {
  const [lang, setLang] = useState<Lang>("ar");
  const [messages, setMessages] = useState<UiMessage[]>([welcomeMessage("ar")]);
  const [isTyping, setIsTyping] = useState(false);
  // Params accumulate across turns (each /api/chat reply may fill in more).
  const [params, setParams] = useState<Partial<TravelParams>>({});
  const [resultsShown, setResultsShown] = useState(false);

  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({
      top: scrollRef.current.scrollHeight,
      behavior: "smooth",
    });
  }, [messages, isTyping]);

  /** Merge newly-extracted params over what we already have (non-null wins). */
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

  /** Explicit search trigger — calls /api/search with the gathered params. */
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
          content: hotels.length
            ? lang === "ar"
              ? "تفضّل، هذه أفضل 3 خيارات لرحلتك:"
              : "Here are the top 3 options for your trip:"
            : NO_RESULTS[lang],
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

  function handleNewTrip() {
    setMessages([welcomeMessage(lang)]);
    setParams({});
    setResultsShown(false);
    setIsTyping(false);
  }

  function handleToggleLang() {
    setLang((prev) => {
      const next: Lang = prev === "ar" ? "en" : "ar";
      setMessages([welcomeMessage(next)]);
      setParams({});
      setResultsShown(false);
      setIsTyping(false);
      return next;
    });
  }

  const showSearchButton = canSearch(params) && !resultsShown && !isTyping;

  return (
    <div
      dir={lang === "ar" ? "rtl" : "ltr"}
      className="flex h-[100dvh] flex-1 flex-col bg-brand-light/30"
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
          {isTyping && <TypingIndicator />}

          {showSearchButton && (
            <div className="flex justify-center pt-2">
              <button
                type="button"
                onClick={runSearch}
                className="rounded-full bg-brand-teal px-6 py-2.5 font-semibold text-white shadow-sm transition-colors hover:bg-brand-dark"
              >
                {SEARCH_NOW[lang]}
              </button>
            </div>
          )}
        </div>
      </div>

      <ChatInput lang={lang} disabled={isTyping} onSend={sendMessage} />
    </div>
  );
}
