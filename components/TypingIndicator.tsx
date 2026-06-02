// TalkToBook — typing indicator (blueprint Phase 9, Screen 2).
// Three dots that pulse in sequence while the AI processes. Rendered as an
// AI-style bubble (left-aligned, light teal) to match MessageBubble.
// The `typing-dot` animation is defined in globals.css.
export default function TypingIndicator() {
  return (
    <div className="flex w-full justify-end" aria-label="جاري الكتابة" role="status">
      <div className="flex items-center gap-1.5 rounded-2xl rounded-tl-sm bg-brand-light px-4 py-4 shadow-sm">
        <span className="typing-dot h-2 w-2 rounded-full bg-brand-teal" />
        <span className="typing-dot h-2 w-2 rounded-full bg-brand-teal [animation-delay:0.2s]" />
        <span className="typing-dot h-2 w-2 rounded-full bg-brand-teal [animation-delay:0.4s]" />
      </div>
    </div>
  );
}
