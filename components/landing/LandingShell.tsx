// TalkToBook landing — Jadoo-style assembly: light, friendly, warm.
// nav → hero → services → top destinations → 3 steps → testimonials →
// logo cloud → newsletter → footer. Direction set from the language.
"use client";

import { useLanding } from "@/lib/i18n";
import LandingHeader from "./LandingHeader";
import Hero from "./Hero";
import DestinationsParallax from "./DestinationsParallax";
import Services from "./Services";
import PopularDestinations from "./PopularDestinations";
import BookSteps from "./BookSteps";
import Testimonials from "./Testimonials";
import LogoCloud from "./LogoCloud";
import Newsletter from "./Newsletter";
import LandingFooter from "./LandingFooter";

export default function LandingShell() {
  const { copy } = useLanding();

  return (
    <div dir={copy.dir} className="flex flex-1 flex-col bg-white">
      <LandingHeader />
      <Hero />
      <DestinationsParallax />
      <Services />
      <PopularDestinations />
      <BookSteps />
      <Testimonials />
      <LogoCloud />
      <Newsletter />
      <LandingFooter />
    </div>
  );
}
