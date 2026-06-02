import type { Metadata } from "next";
import { Cairo } from "next/font/google";
import "./globals.css";

// Cairo — the project's Arabic-first font (blueprint Phase 10, Step 3).
// Exposed as a CSS variable so the Tailwind @theme font stack can reference it.
const cairo = Cairo({
  subsets: ["arabic", "latin"],
  variable: "--font-cairo",
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
      className={`${cairo.variable} h-full`}
      suppressHydrationWarning
    >
      <body className="min-h-full flex flex-col antialiased font-arabic">
        {children}
      </body>
    </html>
  );
}
