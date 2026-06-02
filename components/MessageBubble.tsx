// TalkToBook — chat message bubble (blueprint Phase 9, Screen 2).
// AI messages: left-aligned, light-teal bubble. User messages: right-aligned, white bubble.
// The page is RTL (dir="rtl"), so we pin each bubble's side explicitly with self-*.
import type { ChatMessage } from "@/types";

export default function MessageBubble({ message }: { message: ChatMessage }) {
  const isUser = message.role === "user";

  return (
    <div
      className={`flex w-full ${isUser ? "justify-start" : "justify-end"}`}
      data-role={message.role}
    >
      <div
        className={[
          "max-w-[80%] whitespace-pre-wrap rounded-2xl px-4 py-3 text-[15px] leading-relaxed shadow-sm sm:max-w-[70%]",
          isUser
            ? "rounded-tr-sm border border-brand-dark/10 bg-white text-brand-dark"
            : "rounded-tl-sm bg-brand-light text-brand-dark",
        ].join(" ")}
      >
        {message.content}
      </div>
    </div>
  );
}
