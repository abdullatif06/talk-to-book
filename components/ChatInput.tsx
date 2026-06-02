// TalkToBook — fixed bottom input (blueprint Phase 9, Screen 2).
// RTL text input · send button (arrow) · microphone (future-feature placeholder).
"use client";

import { useState } from "react";
import { SendIcon, MicIcon } from "./Icon";
import type { Lang } from "@/types";

const PLACEHOLDER = {
  ar: "أخبرني عن رحلتك...",
  en: "Tell me about your trip...",
} as const;

export default function ChatInput({
  lang,
  disabled,
  onSend,
}: {
  lang: Lang;
  disabled?: boolean;
  onSend: (text: string) => void;
}) {
  const [value, setValue] = useState("");

  function submit() {
    const text = value.trim();
    if (!text || disabled) return;
    onSend(text);
    setValue("");
  }

  function handleKeyDown(e: React.KeyboardEvent<HTMLTextAreaElement>) {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      submit();
    }
  }

  return (
    <div className="px-4 py-3">
      <div className="mx-auto flex max-w-2xl items-end gap-2">
        {/* Microphone — placeholder for a future voice feature */}
        <button
          type="button"
          aria-label="إدخال صوتي (قريباً)"
          title="قريباً"
          disabled
          className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full text-brand-dark/40"
        >
          <MicIcon className="h-5 w-5" />
        </button>

        <textarea
          rows={1}
          value={value}
          disabled={disabled}
          onChange={(e) => setValue(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder={PLACEHOLDER[lang]}
          className="max-h-40 min-h-11 flex-1 resize-none rounded-2xl border border-brand-dark/15 bg-brand-light/40 px-4 py-2.5 text-[15px] leading-relaxed text-brand-dark outline-none transition-colors focus:border-brand-teal disabled:opacity-60"
        />

        <button
          type="button"
          onClick={submit}
          disabled={disabled || !value.trim()}
          aria-label={lang === "ar" ? "إرسال" : "Send"}
          className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-brand-teal text-white transition-colors hover:bg-brand-dark disabled:cursor-not-allowed disabled:opacity-40"
        >
          {/* In RTL the send arrow should point right→left (toward the start) */}
          <SendIcon className="h-5 w-5 rotate-180" />
        </button>
      </div>
    </div>
  );
}
