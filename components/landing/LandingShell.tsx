// TalkToBook landing — shell: dark aurora hero + bento (dark) up top, then the
// clean light booking body below. Sets page direction from the language.
"use client";

import { useLanding } from "@/lib/i18n";
import LandingHeader from "./LandingHeader";
import Hero from "./Hero";
import BentoFeatures from "./BentoFeatures";
import StatsBand from "./StatsBand";
import PopularDestinations from "./PopularDestinations";
import HowItWorks from "./HowItWorks";
import Comparison from "./Comparison";
import SampleConversation from "./SampleConversation";
import Faq from "./Faq";
import LandingFooter from "./LandingFooter";

export default function LandingShell() {
  const { copy } = useLanding();

  return (
    <div dir={copy.dir} className="flex flex-1 flex-col bg-white">
      {/* Dark tech zone: nav + hero + bento */}
      <div className="bg-night">
        <LandingHeader />
        <Hero />
        <BentoFeatures />
      </div>

      {/* Light booking body */}
      <StatsBand />
      <PopularDestinations />
      <HowItWorks />
      <Comparison />
      <SampleConversation />
      <Faq />
      <LandingFooter />
    </div>
  );
}
