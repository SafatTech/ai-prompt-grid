import type { Metadata } from "next";
import { Figtree, Fraunces, Source_Serif_4 } from "next/font/google";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { SITE } from "@/lib/constants";
import "./globals.css";

const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
});

const figtree = Figtree({
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
});

const sourceSerif = Source_Serif_4({
  subsets: ["latin"],
  variable: "--font-prompt",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: `${SITE.name} — AI photo style prompts`,
    template: `%s · ${SITE.name}`,
  },
  description: SITE.description,
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",
  ),
  openGraph: {
    title: SITE.name,
    description: SITE.description,
    siteName: SITE.name,
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      data-scroll-behavior="smooth"
      className={`${fraunces.variable} ${figtree.variable} ${sourceSerif.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col bg-bg text-ink">
        <SiteHeader />
        <main className="flex-1 pt-[var(--header-height)]">{children}</main>
        <SiteFooter />
      </body>
    </html>
  );
}
