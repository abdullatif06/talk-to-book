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
  title: "TalkToBook — احجز فندقك بالعربي",
  description:
    "مساعد ذكي لحجز الفنادق بالعربية — أخبرنا عن رحلتك ونجد لك الأنسب.",
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
