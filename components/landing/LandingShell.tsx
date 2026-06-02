// TalkToBook landing — shell that assembles all sections and sets the page
// direction from the selected language (RTL for Arabic, LTR for English).
"use client";

import { useLanding } from "@/lib/i18n";
import LandingHeader from "./LandingHeader";
import Hero from "./Hero";
import StatsBand from "./StatsBand";
import PopularDestinations from "./PopularDestinations";
import HowItWorks from "./HowItWorks";
import TrustSection from "./TrustSection";
import Comparison from "./Comparison";
import SampleConversation from "./SampleConversation";
import Faq from "./Faq";
import LandingFooter from "./LandingFooter";

export default function LandingShell() {
  const { copy } = useLanding();

  return (
    <div dir={copy.dir} className="flex flex-1 flex-col">
      {/* Top: warm wash + subtle pattern behind nav & hero */}
      <div className="hero-wash">
        <div className="pattern-arabesque">
          <LandingHeader />
          <Hero />
        </div>
      </div>
      <StatsBand />
      <PopularDestinations />
      <HowItWorks />
      <TrustSection />
      <Comparison />
      <SampleConversation />
      <Faq />
      <LandingFooter />
    </div>
  );
}
