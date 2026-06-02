import type { Metadata } from "next";
import { Cairo, Rakkas } from "next/font/google";
import "lenis/dist/lenis.css";
import "./globals.css";
import SmoothScroll from "@/components/SmoothScroll";

// Cairo — body/UI font (Arabic-first, highly readable).
const cairo = Cairo({
  subsets: ["arabic", "latin"],
  variable: "--font-cairo",
  display: "swap",
});

// Rakkas — decorative Arabic display font for headings (gives the boutique
// Arab-brand character). Single weight (400) per the font's design.
const rakkas = Rakkas({
  subsets: ["arabic", "latin"],
  weight: "400",
  variable: "--font-rakkas",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://talk-to-book-five.vercel.app"),
  title: "TalkToBook — احجز فندقك بالعربي",
  description:
    "مساعد ذكي لحجز الفنادق بالعربية — أخبرنا عن رحلتك ونجد لك الأنسب. Arabic-first AI hotel booking assistant.",
  keywords: [
    "حجز فنادق",
    "فنادق بالعربي",
    "مساعد ذكي",
    "Arabic hotel booking",
    "halal hotels",
  ],
  openGraph: {
    title: "TalkToBook — احجز فندقك بالعربي",
    description:
      "صف رحلتك بالعربي ونجد لك أفضل ٣ فنادق — Arabic-first AI hotel booking.",
    type: "website",
    locale: "ar_AR",
  },
  twitter: {
    card: "summary_large_image",
    title: "TalkToBook — احجز فندقك بالعربي",
    description: "Arabic-first AI hotel booking assistant.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    // suppressHydrationWarning: browser extensions (e.g. QuillBot, which injects
    // data-qb-installed) mutate the <html> tag before React hydrates, causing a
    // benign attribute mismatch. This silences it on <html> ONLY — real
    // mismatches elsewhere in the tree are still reported.
    <html
      lang="ar"
      dir="rtl"
      className={`${cairo.variable} ${rakkas.variable} h-full`}
      suppressHydrationWarning
    >
      <body className="min-h-full flex flex-col antialiased font-arabic">
        <SmoothScroll>{children}</SmoothScroll>
      </body>
    </html>
  );
}
