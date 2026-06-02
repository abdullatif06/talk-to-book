// TalkToBook — brand logo.
// Inline SVG mark: a chat-bubble fused with a location pin (booking-blue) + the
// wordmark in the display font, with a gold dot accent. This is a polished
// built-in fallback; when you drop your generated Arabic-script logo into
// public/logo.svg, swap <LogoMark/> usage for an <Image src="/logo.svg" />.
type P = { className?: string };

export function LogoMark({ className }: P) {
  return (
    <svg viewBox="0 0 40 40" className={className} aria-hidden>
      {/* rounded chat bubble */}
      <path
        d="M8 6h24a4 4 0 0 1 4 4v14a4 4 0 0 1-4 4H18l-7 6v-6H8a4 4 0 0 1-4-4V10a4 4 0 0 1 4-4z"
        fill="#0A6CE0"
      />
      {/* location pin cut into the bubble */}
      <path
        d="M20 11a5 5 0 0 0-5 5c0 3.5 5 8 5 8s5-4.5 5-8a5 5 0 0 0-5-5z"
        fill="#fff"
      />
      <circle cx="20" cy="16" r="2" fill="#0A6CE0" />
      {/* gold accent dot */}
      <circle cx="32" cy="9" r="3" fill="#E8A33D" />
    </svg>
  );
}

export function Logo({
  className = "",
  textClass = "text-primary",
}: {
  className?: string;
  textClass?: string;
}) {
  return (
    <span className={`flex items-center gap-2 ${className}`}>
      <LogoMark className="h-8 w-8" />
      <span className={`font-display text-2xl ${textClass}`}>TalkToBook</span>
    </span>
  );
}
