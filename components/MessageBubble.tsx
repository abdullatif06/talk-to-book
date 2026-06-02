// TalkToBook — chat message bubble (blueprint Phase 9, Screen 2).
// User messages: right-aligned, blue bubble. AI messages: left-aligned, white.
// The page is RTL (dir="rtl"), so we pin each bubble's side explicitly with self-*.
import type { ChatMessage } from "@/types";

export default function MessageBubble({ message }: { message: ChatMessage }) {
  const isUser = message.role === "user";

  return (
    <div
      className={`flex w-full animate-fade-up ${isUser ? "justify-start" : "justify-end"}`}
      data-role={message.role}
    >
      <div
        className={[
          "max-w-[80%] whitespace-pre-wrap rounded-2xl px-4 py-3 text-[15px] leading-relaxed shadow-sm sm:max-w-[70%]",
          isUser
            ? "rounded-tr-sm bg-primary text-white"
            : "rounded-tl-sm border border-line bg-white text-ink",
        ].join(" ")}
      >
        {message.content}
      </div>
    </div>
  );
}
