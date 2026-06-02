// Maps an i18n IconKey to its SVG component (components/landing/Icons.tsx).
import {
  ChatIcon,
  SparklesIcon,
  HotelIcon,
  ShieldIcon,
  GlobeIcon,
  TagIcon,
} from "./Icons";
import type { IconKey } from "@/lib/i18n";

const MAP = {
  chat: ChatIcon,
  sparkles: SparklesIcon,
  hotel: HotelIcon,
  shield: ShieldIcon,
  globe: GlobeIcon,
  tag: TagIcon,
} as const;

export function Icon({ name, className }: { name: IconKey; className?: string }) {
  const Cmp = MAP[name];
  return <Cmp className={className} />;
}
