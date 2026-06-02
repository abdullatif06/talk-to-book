// TalkToBook landing — newsletter band (Jadoo-style): soft cream rounded panel
// with email input + coral CTA. (No backend yet — submitting routes to chat.)
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useLanding } from "@/lib/i18n";
import { PlaneGlyph } from "./Doodles";
import { Reveal } from "@/components/motion/Reveal";

export default function Newsletter() {
  const { copy } = useLanding();
  const router = useRouter();
  const [email, setEmail] = useState("");

  return (
    <section className="bg-white py-16">
      <Reveal className="mx-auto max-w-5xl px-6">
        <div className="relative overflow-hidden rounded-[2rem] bg-sand px-6 py-14 text-center shadow-card">
          <PlaneGlyph className="pointer-events-none absolute end-10 top-8 hidden h-10 w-10 text-primary/20 sm:block" />
          <h2 className="mx-auto mb-8 max-w-xl font-display text-2xl text-ink sm:text-3xl">
            {copy.newsletterTitle}
          </h2>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              router.push("/chat");
            }}
            className="mx-auto flex max-w-md flex-col gap-3 sm:flex-row"
          >
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder={copy.newsletterPlaceholder}
              className="flex-1 rounded-xl border border-line bg-white px-4 py-3 text-[15px] text-ink outline-none transition-colors focus:border-primary"
            />
            <button
              type="submit"
              className="rounded-xl bg-primary px-6 py-3 font-bold text-white shadow-[0_10px_20px_-6px_rgba(241,104,58,0.6)] transition-colors hover:bg-primary-dark"
            >
              {copy.newsletterCta}
            </button>
          </form>
        </div>
      </Reveal>
    </section>
  );
}
