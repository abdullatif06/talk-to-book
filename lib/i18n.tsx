// TalkToBook — landing-page i18n (Arabic-first, with an English toggle).
// A tiny client-side language context: no dependency, just React state. The
// chat experience has its own in-component toggle; this powers the landing page.
"use client";

import { createContext, useContext, useState, type ReactNode } from "react";
import type { Lang } from "@/types";

export interface LandingCopy {
  dir: "rtl" | "ltr";
  brand: string;
  tagline: string;
  ctaStart: string;
  // Hero
  heroTitle: string;
  heroSubtitle: string;
  heroDemoUser: string;
  heroDemoAI: string;
  // How it works
  howTitle: string;
  steps: { icon: string; title: string; desc: string }[];
  // Trust
  trustTitle: string;
  trustPoints: string[];
  // Sample conversation
  sampleTitle: string;
  sample: { role: "user" | "model"; text: string }[];
  // Footer
  footerCredit: string;
  footerPortfolio: string;
  toggleLabel: string;
}

const AR: LandingCopy = {
  dir: "rtl",
  brand: "TalkToBook",
  tagline: "احجز فندقك بالعربي — كلّمنا مثل ما تكلّم صاحبك",
  ctaStart: "ابدأ الآن",
  heroTitle: "صف رحلتك بالعربي، ونلاقي لك أفضل ٣ فنادق",
  heroSubtitle:
    "بدون قوائم فلترة معقّدة. اكتب اللي تبيه بكلامك العادي، والذكاء الاصطناعي يفهمك ويختار لك الأنسب — مع ملخص عربي صادق لتقييمات النزلاء.",
  heroDemoUser:
    "أبي فندق بدبي لأسبوع في يوليو، أنا وزوجتي وثلاثة أطفال، ميزانية ١٥٠ دولار، يكون حلال وقريب من السوق",
  heroDemoAI: "ممتاز! حاضر، خلّني ألاقي لك أنسب الخيارات العائلية الحلال في دبي…",
  howTitle: "كيف تشتغل؟",
  steps: [
    { icon: "🗣", title: "اكتب عن رحلتك", desc: "صف وجهتك وتواريخك وميزانيتك بالعربي العادي." },
    { icon: "🤖", title: "نفهم ونبحث", desc: "الذكاء الاصطناعي يفهم طلبك ويبحث في ملايين الفنادق." },
    { icon: "🏨", title: "اختَر واحجز", desc: "نعرض لك ٣ خيارات منتقاة فقط — اختر واحجز مباشرة." },
  ],
  trustTitle: "ليش TalkToBook؟",
  trustPoints: [
    "يفهم العربي الحقيقي — مو ترجمة آلية",
    "نتائج من أكثر من مليون فندق حول العالم",
    "مجاني ١٠٠٪ — بدون تسجيل",
  ],
  sampleTitle: "محادثة حقيقية",
  sample: [
    { role: "user", text: "أبي فندق هادئ بإسطنبول قريب من السلطان أحمد، ميزانية ١٠٠ دولار" },
    { role: "model", text: "تمام! كم ليلة ناوي تقعد؟ وكم شخص معك؟" },
    { role: "user", text: "أربع ليالٍ، أنا وزوجتي بس" },
    { role: "model", text: "حلو، خلّني ألقّط لك أحسن ٣ فنادق بهالمنطقة وأقولك رأي النزلاء بصراحة." },
  ],
  footerCredit: "صُنع بحب لمسافري العالم العربي",
  footerPortfolio: "من إعداد عبداللطيف",
  toggleLabel: "EN",
};

const EN: LandingCopy = {
  dir: "ltr",
  brand: "TalkToBook",
  tagline: "Book your hotel in Arabic — talk to us like you'd talk to a friend",
  ctaStart: "Start now",
  heroTitle: "Describe your trip in Arabic, get the best 3 hotels",
  heroSubtitle:
    "No complicated filter menus. Type what you want in plain language, and the AI understands and picks the best fit — with an honest Arabic summary of guest reviews.",
  heroDemoUser:
    "I want a hotel in Dubai for a week in July — me, my wife and three kids, budget $150, halal and near the souk",
  heroDemoAI: "Great! Let me find the best halal, family-friendly options in Dubai…",
  howTitle: "How it works",
  steps: [
    { icon: "🗣", title: "Describe your trip", desc: "Tell us your destination, dates and budget in plain Arabic." },
    { icon: "🤖", title: "We understand & search", desc: "The AI understands your request and searches millions of hotels." },
    { icon: "🏨", title: "Choose & book", desc: "We show just 3 curated options — pick one and book directly." },
  ],
  trustTitle: "Why TalkToBook?",
  trustPoints: [
    "Understands real Arabic — not machine translation",
    "Results from over a million hotels worldwide",
    "100% free — no sign-up",
  ],
  sampleTitle: "A real conversation",
  sample: [
    { role: "user", text: "I want a quiet hotel in Istanbul near Sultanahmet, budget $100" },
    { role: "model", text: "Sure! How many nights, and how many guests?" },
    { role: "user", text: "Four nights, just me and my wife" },
    { role: "model", text: "Got it — let me grab the best 3 hotels in that area and tell you honestly what guests think." },
  ],
  footerCredit: "Built with ❤️ for Arab travelers",
  footerPortfolio: "Made by Abdullatif",
  toggleLabel: "ع",
};

const COPY: Record<Lang, LandingCopy> = { ar: AR, en: EN };

interface LangContextValue {
  lang: Lang;
  copy: LandingCopy;
  toggle: () => void;
}

const LangContext = createContext<LangContextValue | null>(null);

export function LandingLangProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<Lang>("ar");
  const value: LangContextValue = {
    lang,
    copy: COPY[lang],
    toggle: () => setLang((l) => (l === "ar" ? "en" : "ar")),
  };
  return <LangContext.Provider value={value}>{children}</LangContext.Provider>;
}

export function useLanding(): LangContextValue {
  const ctx = useContext(LangContext);
  if (!ctx) throw new Error("useLanding must be used within LandingLangProvider");
  return ctx;
}
