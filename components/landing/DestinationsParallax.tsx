// TalkToBook landing — cinematic zoom-parallax of destination photos.
// Uses the 7 Unsplash images we already curated. Center image is the hero shot.
"use client";

import { useLanding } from "@/lib/i18n";
import { ZoomParallax } from "@/components/ui/zoom-parallax";

export default function DestinationsParallax() {
  const { copy } = useLanding();
  // Center (index 0) stays full-screen; the rest fan out and zoom.
  const images = [
    { src: copy.heroImage, alt: "" },
    ...copy.destinations.map((d) => ({ src: d.img, alt: d.name })),
  ].slice(0, 7);

  return <ZoomParallax images={images} />;
}
