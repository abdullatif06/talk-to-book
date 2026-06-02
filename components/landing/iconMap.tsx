// Maps an i18n IconKey to a Lucide icon. Lucide is the standard, consistent
// icon set used across the app. These icons are non-directional, so they need
// no RTL mirroring (only arrows/chevrons do — handled where used).
import {
  MessageSquareText,
  Sparkles,
  Hotel,
  ShieldCheck,
  Globe,
  Tag,
  Moon,
  type LucideIcon,
} from "lucide-react";
import type { IconKey } from "@/lib/i18n";

const MAP: Record<IconKey, LucideIcon> = {
  chat: MessageSquareText,
  sparkles: Sparkles,
  hotel: Hotel,
  shield: ShieldCheck,
  globe: Globe,
  tag: Tag,
  moon: Moon,
};

export function Icon({ name, className }: { name: IconKey; className?: string }) {
  const Cmp = MAP[name];
  return <Cmp className={className} strokeWidth={1.8} aria-hidden />;
}
