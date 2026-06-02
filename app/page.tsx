// TalkToBook — landing page (blueprint Phase 9, Screen 1).
// Day 6: full bilingual landing — header, hero (animated typing demo),
// how-it-works, trust, sample conversation, footer with AR/EN toggle.
import { LandingLangProvider } from "@/lib/i18n";
import LandingShell from "@/components/landing/LandingShell";

export default function Home() {
  return (
    <LandingLangProvider>
      <LandingShell />
    </LandingLangProvider>
  );
}
