import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { LibraryProvider } from "@/components/providers/library-provider";
import { ToastProvider } from "@/components/providers/toast-provider";
import { UiModalProvider } from "@/components/providers/ui-modal-provider";
import { getSiteUrl } from "@/lib/site-url";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(getSiteUrl()),
  title: {
    default: "AI Prompt Grid",
    template: "%s · AI Prompt Grid",
  },
  description:
    "Discover tested prompts for transforming your own photos in external AI image editors.",
  alternates: {
    canonical: "/",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: "AI Prompt Grid",
    title: "AI Prompt Grid",
    description:
      "Discover tested prompts for transforming your own photos in external AI image editors.",
    url: "/",
  },
  twitter: {
    card: "summary_large_image",
    title: "AI Prompt Grid",
    description:
      "Discover tested prompts for transforming your own photos in external AI image editors.",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      data-scroll-behavior="smooth"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col">
        <ToastProvider>
          <LibraryProvider>
            <UiModalProvider>
              <SiteHeader />
              <main className="flex-1" id="main">
                {children}
              </main>
              <SiteFooter />
            </UiModalProvider>
          </LibraryProvider>
        </ToastProvider>
      </body>
    </html>
  );
}
