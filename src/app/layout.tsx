import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { LibraryProvider } from "@/components/providers/library-provider";
import { ToastProvider } from "@/components/providers/toast-provider";
import { UiModalProvider } from "@/components/providers/ui-modal-provider";
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
  title: "AI Prompt Grid",
  description:
    "Discover tested prompts for transforming your own photos in external AI image editors.",
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
