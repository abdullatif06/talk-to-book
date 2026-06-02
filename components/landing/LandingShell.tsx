// TalkToBook landing — shell that assembles all sections and sets the page
// direction from the selected language (RTL for Arabic, LTR for English).
"use client";

import { useLanding } from "@/lib/i18n";
import LandingHeader from "./LandingHeader";
import Hero from "./Hero";
import HowItWorks from "./HowItWorks";
import TrustSection from "./TrustSection";
import SampleConversation from "./SampleConversation";
import LandingFooter from "./LandingFooter";

export default function LandingShell() {
  const { copy } = useLanding();

  return (
    <div dir={copy.dir} className="flex flex-1 flex-col bg-brand-light/30">
      <LandingHeader />
      <Hero />
      <HowItWorks />
      <TrustSection />
      <SampleConversation />
      <LandingFooter />
    </div>
  );
}
