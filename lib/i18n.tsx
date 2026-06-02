// TalkToBook — landing-page i18n (Arabic-first, with an English toggle).
// A tiny client-side language context: no dependency, just React state. The
// chat experience has its own in-component toggle; this powers the landing page.
"use client";

import { createContext, useContext, useState, type ReactNode } from "react";
import type { Lang } from "@/types";

// Icon keys map to Lucide icons in components/landing/iconMap.tsx.
export type IconKey =
  | "chat"
  | "sparkles"
  | "hotel"
  | "shield"
  | "globe"
  | "tag"
  | "moon";

export interface DestinationCopy {
  name: string;
  query: string; // sent to the chat when clicked
  img: string; // Unsplash photo URL
}

export interface FaqItem {
  q: string;
  a: string;
}

export interface ComparisonRow {
  feature: string;
  us: boolean;
  booking: boolean;
  halalbooking: boolean;
}

export interface LandingCopy {
  dir: "rtl" | "ltr";
  brand: string;
  tagline: string;
  ctaStart: string;
  ctaTry: string;
  // Hero
  heroTitle: string;
  heroSubtitle: string;
  heroPlaceholder: string;
  heroDemoUser: string;
  heroDemoAI: string;
  // Stats band
  stats: { value: string; label: string }[];
  // Popular destinations
  destTitle: string;
  destSubtitle: string;
  destinations: DestinationCopy[];
  // Bento feature grid (dark)
  bentoTitle: string;
  bentoSubtitle: string;
  bento: { icon: IconKey; title: string; desc: string }[];
  // How it works
  howTitle: string;
  steps: { icon: IconKey; title: string; desc: string }[];
  // Trust
  trustTitle: string;
  trustPoints: { icon: IconKey; text: string }[];
  // Comparison
  compareTitle: string;
  compareCols: { us: string; booking: string; halalbooking: string };
  comparison: ComparisonRow[];
  // Sample conversation
  sampleTitle: string;
  sample: { role: "user" | "model"; text: string }[];
  // FAQ
  faqTitle: string;
  faq: FaqItem[];
  // Footer
  footerTagline: string;
  footerCredit: string;
  footerPortfolio: string;
  footerLinks: { label: string; href: string }[];
  toggleLabel: string;
}

// Free-license Unsplash photos (commercial-OK, no attribution required).
const PHOTO = {
  dubai: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=800&q=80&auto=format&fit=crop",
  istanbul: "https://images.unsplash.com/photo-1524231757912-21f4fe3a7200?w=800&q=80&auto=format&fit=crop",
  makkah: "https://images.unsplash.com/photo-1591604129939-f1efa4d9f7fa?w=800&q=80&auto=format&fit=crop",
  amman: "https://images.unsplash.com/photo-1562790351-d273a961e0e9?w=800&q=80&auto=format&fit=crop",
  cairo: "https://images.unsplash.com/photo-1572252009286-268acec5ca0a?w=800&q=80&auto=format&fit=crop",
  riyadh: "https://images.unsplash.com/photo-1586724237569-f3d0c1dee8c6?w=800&q=80&auto=format&fit=crop",
};

const AR: LandingCopy = {
  dir: "rtl",
  brand: "TalkToBook",
  tagline: "احجز فندقك بالعربي — كلّمنا مثل ما تكلّم صاحبك",
  ctaStart: "ابدأ الآن",
  ctaTry: "جرّب الآن",
  heroTitle: "صف رحلتك بالعربي، ونلاقي لك أفضل ٣ فنادق",
  heroSubtitle:
    "بدون قوائم فلترة معقّدة. اكتب اللي تبيه بكلامك العادي، والذكاء الاصطناعي يفهمك ويختار لك الأنسب — مع ملخص عربي صادق لتقييمات النزلاء.",
  heroPlaceholder: "مثال: فندق حلال بدبي لـ٣ ليالٍ، شخصين، ميزانية ١٥٠ دولار",
  heroDemoUser:
    "أبي فندق بدبي لأسبوع في يوليو، أنا وزوجتي وثلاثة أطفال، ميزانية ١٥٠ دولار، يكون حلال وقريب من السوق",
  heroDemoAI: "ممتاز! حاضر، خلّني ألاقي لك أنسب الخيارات العائلية الحلال في دبي…",
  stats: [
    { value: "+١ مليون", label: "فندق حول العالم" },
    { value: "٣", label: "خيارات منتقاة لكل بحث" },
    { value: "٪١٠٠", label: "مجاني وبدون تسجيل" },
    { value: "عربي", label: "محادثة طبيعية" },
  ],
  bentoTitle: "ذكاء يفهم رحلتك",
  bentoSubtitle: "مو مجرّد بحث — مساعد يفهم العربي ويختار لك بعناية",
  bento: [
    { icon: "chat", title: "محادثة بالعربي الطبيعي", desc: "اكتب مثل ما تتكلم مع صاحبك، بدون قوائم أو فلاتر. نفهم لهجتك ونرد بنفس لغتك." },
    { icon: "sparkles", title: "٣ خيارات منتقاة", desc: "بدل ٨٠٠ نتيجة، نختار لك أفضل ٣ فنادق تناسب طلبك تماماً." },
    { icon: "shield", title: "ملخص تقييمات صادق", desc: "نلخّص آراء النزلاء بالعربي — الإيجابيات والسلبيات بصراحة." },
    { icon: "moon", title: "ملائم للمسلمين", desc: "نبرز الإشارات المهمة: قرب الحرم، خيارات حلال، أجواء عائلية." },
    { icon: "globe", title: "مليون فندق", desc: "نتائج حقيقية من أكثر من مليون فندق حول العالم." },
    { icon: "tag", title: "مجاني تماماً", desc: "بدون تسجيل، بدون رسوم. ابدأ رحلتك الآن." },
  ],
  destTitle: "وجهات يحبها المسافر العربي",
  destSubtitle: "اضغط على أي وجهة لتبدأ رحلتك فوراً",
  destinations: [
    { name: "دبي", query: "فندق حلال في دبي لـ٣ ليالٍ، شخصين، ميزانية ١٥٠ دولار", img: PHOTO.dubai },
    { name: "إسطنبول", query: "فندق في إسطنبول قريب من السوق، ٤ ليالٍ، شخصين", img: PHOTO.istanbul },
    { name: "مكة المكرمة", query: "فندق قريب من الحرم في مكة، ٥ ليالٍ، عائلة", img: PHOTO.makkah },
    { name: "عمّان", query: "فندق في عمّان وسط البلد، ليلتين، شخصين", img: PHOTO.amman },
    { name: "القاهرة", query: "فندق في القاهرة قريب من النيل، ٣ ليالٍ، شخصين", img: PHOTO.cairo },
    { name: "الرياض", query: "فندق في الرياض للعمل، ليلتين، شخص واحد", img: PHOTO.riyadh },
  ],
  howTitle: "كيف تشتغل؟",
  steps: [
    { icon: "chat", title: "اكتب عن رحلتك", desc: "صف وجهتك وتواريخك وميزانيتك بالعربي العادي." },
    { icon: "sparkles", title: "نفهم ونبحث", desc: "الذكاء الاصطناعي يفهم طلبك ويبحث في ملايين الفنادق." },
    { icon: "hotel", title: "اختَر واحجز", desc: "نعرض لك ٣ خيارات منتقاة فقط — اختر واحجز مباشرة." },
  ],
  trustTitle: "ليش TalkToBook؟",
  trustPoints: [
    { icon: "shield", text: "يفهم العربي الحقيقي — مو ترجمة آلية" },
    { icon: "globe", text: "نتائج من أكثر من مليون فندق حول العالم" },
    { icon: "tag", text: "مجاني ١٠٠٪ — بدون تسجيل" },
  ],
  compareTitle: "ليش مو Booking أو HalalBooking؟",
  compareCols: { us: "TalkToBook", booking: "Booking.com", halalbooking: "HalalBooking" },
  comparison: [
    { feature: "محادثة بالعربي الطبيعي", us: true, booking: false, halalbooking: false },
    { feature: "ملخص تقييمات بالعربي", us: true, booking: false, halalbooking: false },
    { feature: "نتائج منتقاة (مو ٨٠٠ فندق)", us: true, booking: false, halalbooking: false },
    { feature: "إشارات ملائمة للمسلمين", us: true, booking: false, halalbooking: true },
    { feature: "بدون تسجيل، مجاني", us: true, booking: true, halalbooking: false },
  ],
  sampleTitle: "محادثة حقيقية",
  sample: [
    { role: "user", text: "أبي فندق هادئ بإسطنبول قريب من السلطان أحمد، ميزانية ١٠٠ دولار" },
    { role: "model", text: "تمام! كم ليلة ناوي تقعد؟ وكم شخص معك؟" },
    { role: "user", text: "أربع ليالٍ، أنا وزوجتي بس" },
    { role: "model", text: "حلو، خلّني ألقّط لك أحسن ٣ فنادق بهالمنطقة وأقولك رأي النزلاء بصراحة." },
  ],
  faqTitle: "أسئلة شائعة",
  faq: [
    { q: "هل الخدمة مجانية فعلاً؟", a: "نعم، مجانية ١٠٠٪ وبدون تسجيل. نكسب عمولة بسيطة من موقع الحجز عند إتمام الحجز، بدون أي تكلفة عليك." },
    { q: "كيف تعرفون إن الفندق حلال؟", a: "نستدل من بيانات الفندق واسمه ومرافقه على ملاءمته، ونوضّح ذلك بصراحة. ننصح دائماً بالتأكد مع الفندق مباشرة للأمور المهمة." },
    { q: "هل تحجزون لي مباشرة؟", a: "نوجّهك إلى صفحة الحجز على Booking.com لتكمل الحجز بنفسك بأمان — نحن نساعدك في الاختيار فقط." },
    { q: "هل أقدر أكتب بالإنجليزي؟", a: "أكيد. اكتب بالعربي أو الإنجليزي، والمساعد يرد بنفس لغتك." },
  ],
  footerTagline: "مساعد ذكي لحجز الفنادق بالعربية.",
  footerCredit: "صُنع بحب لمسافري العالم العربي",
  footerPortfolio: "من إعداد عبداللطيف",
  footerLinks: [
    { label: "ابدأ المحادثة", href: "/chat" },
    { label: "كيف تشتغل؟", href: "#how" },
    { label: "الأسئلة الشائعة", href: "#faq" },
  ],
  toggleLabel: "EN",
};

const EN: LandingCopy = {
  dir: "ltr",
  brand: "TalkToBook",
  tagline: "Book your hotel in Arabic — talk to us like you'd talk to a friend",
  ctaStart: "Start now",
  ctaTry: "Try it",
  heroTitle: "Describe your trip in Arabic, get the best 3 hotels",
  heroSubtitle:
    "No complicated filter menus. Type what you want in plain language, and the AI understands and picks the best fit — with an honest Arabic summary of guest reviews.",
  heroPlaceholder: "e.g. Halal hotel in Dubai, 3 nights, 2 adults, budget $150",
  heroDemoUser:
    "I want a hotel in Dubai for a week in July — me, my wife and three kids, budget $150, halal and near the souk",
  heroDemoAI: "Great! Let me find the best halal, family-friendly options in Dubai…",
  stats: [
    { value: "1M+", label: "hotels worldwide" },
    { value: "3", label: "curated picks per search" },
    { value: "100%", label: "free, no sign-up" },
    { value: "Arabic", label: "natural conversation" },
  ],
  bentoTitle: "Intelligence that gets your trip",
  bentoSubtitle: "Not just search — an assistant that understands Arabic and curates for you",
  bento: [
    { icon: "chat", title: "Natural Arabic chat", desc: "Type like you'd talk to a friend — no menus or filters. We get your dialect and reply in your language." },
    { icon: "sparkles", title: "3 curated picks", desc: "Instead of 800 results, we hand you the best 3 hotels that truly fit." },
    { icon: "shield", title: "Honest review summary", desc: "We summarize guest reviews in Arabic — the good and the bad, straight." },
    { icon: "moon", title: "Muslim-friendly", desc: "We surface what matters: proximity to the Haram, halal options, family vibe." },
    { icon: "globe", title: "A million hotels", desc: "Real results from over a million hotels worldwide." },
    { icon: "tag", title: "Completely free", desc: "No sign-up, no fees. Start your trip right now." },
  ],
  destTitle: "Destinations Arab travelers love",
  destSubtitle: "Tap any destination to start your trip instantly",
  destinations: [
    { name: "Dubai", query: "Halal hotel in Dubai for 3 nights, 2 adults, budget $150", img: PHOTO.dubai },
    { name: "Istanbul", query: "Hotel in Istanbul near the bazaar, 4 nights, 2 adults", img: PHOTO.istanbul },
    { name: "Makkah", query: "Hotel near the Haram in Makkah, 5 nights, family", img: PHOTO.makkah },
    { name: "Amman", query: "Hotel in downtown Amman, 2 nights, 2 adults", img: PHOTO.amman },
    { name: "Cairo", query: "Hotel in Cairo near the Nile, 3 nights, 2 adults", img: PHOTO.cairo },
    { name: "Riyadh", query: "Business hotel in Riyadh, 2 nights, 1 adult", img: PHOTO.riyadh },
  ],
  howTitle: "How it works",
  steps: [
    { icon: "chat", title: "Describe your trip", desc: "Tell us your destination, dates and budget in plain Arabic." },
    { icon: "sparkles", title: "We understand & search", desc: "The AI understands your request and searches millions of hotels." },
    { icon: "hotel", title: "Choose & book", desc: "We show just 3 curated options — pick one and book directly." },
  ],
  trustTitle: "Why TalkToBook?",
  trustPoints: [
    { icon: "shield", text: "Understands real Arabic — not machine translation" },
    { icon: "globe", text: "Results from over a million hotels worldwide" },
    { icon: "tag", text: "100% free — no sign-up" },
  ],
  compareTitle: "Why not Booking or HalalBooking?",
  compareCols: { us: "TalkToBook", booking: "Booking.com", halalbooking: "HalalBooking" },
  comparison: [
    { feature: "Natural Arabic conversation", us: true, booking: false, halalbooking: false },
    { feature: "Arabic review summaries", us: true, booking: false, halalbooking: false },
    { feature: "Curated results (not 800 hotels)", us: true, booking: false, halalbooking: false },
    { feature: "Muslim-friendly signals", us: true, booking: false, halalbooking: true },
    { feature: "No sign-up, free", us: true, booking: true, halalbooking: false },
  ],
  sampleTitle: "A real conversation",
  sample: [
    { role: "user", text: "I want a quiet hotel in Istanbul near Sultanahmet, budget $100" },
    { role: "model", text: "Sure! How many nights, and how many guests?" },
    { role: "user", text: "Four nights, just me and my wife" },
    { role: "model", text: "Got it — let me grab the best 3 hotels in that area and tell you honestly what guests think." },
  ],
  faqTitle: "Frequently asked",
  faq: [
    { q: "Is it really free?", a: "Yes, 100% free with no sign-up. We earn a small commission from the booking site when you complete a booking — at no extra cost to you." },
    { q: "How do you know a hotel is halal?", a: "We infer suitability from the hotel's data, name and amenities, and we say so honestly. We always recommend confirming directly with the hotel for what matters most." },
    { q: "Do you book it for me?", a: "We send you to the Booking.com page to complete the booking yourself, securely — we just help you choose." },
    { q: "Can I write in English?", a: "Of course. Write in Arabic or English, and the assistant replies in your language." },
  ],
  footerTagline: "An Arabic-first AI hotel booking assistant.",
  footerCredit: "Built with ❤️ for Arab travelers",
  footerPortfolio: "Made by Abdullatif",
  footerLinks: [
    { label: "Start chatting", href: "/chat" },
    { label: "How it works", href: "#how" },
    { label: "FAQ", href: "#faq" },
  ],
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
