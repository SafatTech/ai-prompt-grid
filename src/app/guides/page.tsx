import type { Metadata } from "next";
import Link from "next/link";
import { GuideBreadcrumbs } from "@/components/guides/guide-breadcrumbs";
import { listIndexableGuides, listVisibleGuides } from "@/lib/guides/load";
import {
  canonicalGuideUrl,
  defaultOgImage,
  documentTitle,
  formatGuideDate,
} from "@/lib/guides/prepare";

const description =
  "Long-form prompt guides for turning photos you already have into a specific look in ChatGPT, Gemini, and other external AI image editors.";

export const metadata: Metadata = {
  title: "Guides",
  description,
  alternates: { canonical: canonicalGuideUrl() },
  openGraph: {
    title: documentTitle("Guides"),
    description,
    url: canonicalGuideUrl(),
    type: "website",
    images: [defaultOgImage],
  },
  twitter: {
    card: "summary_large_image",
    title: documentTitle("Guides"),
    description,
    images: [defaultOgImage],
  },
  robots: listIndexableGuides().length > 0 ? undefined : { index: false, follow: true },
};

export default function GuidesIndexPage() {
  const guides = listVisibleGuides();
  const showingDrafts = guides.some((guide) => guide.draft);
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: "https://aipromptgrid.com/",
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Guides",
        item: canonicalGuideUrl(),
      },
    ],
  };

  return (
    <article className="container max-w-[760px] py-10 pb-16 sm:py-16 sm:pb-[100px]">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c"),
        }}
      />
      <GuideBreadcrumbs />
      <p className="m-0 mb-2 text-[11px] font-bold tracking-[0.08em] text-[var(--muted)] uppercase">
        Guides
      </p>
      <h1 className="m-0 mb-3 text-[clamp(36px,4.5vw,52px)] tracking-[-0.04em]">
        Guides
      </h1>
      <p className="m-0 mb-4 text-[17px] leading-relaxed text-[var(--muted)]">
        {description}
      </p>
      <p className="m-0 mb-8 text-[15px] leading-relaxed text-[var(--muted)]">
        Each guide explains the photo to start from, what the edit should keep, and
        prompts you can copy into an external editor. AI Prompt Grid does not generate the
        image. Browse tested recipes in{" "}
        <Link
          href="/explore"
          className="font-bold text-[var(--text)] underline-offset-2 hover:underline"
        >
          Explore
        </Link>{" "}
        or read{" "}
        <Link
          href="/how-it-works"
          className="font-bold text-[var(--text)] underline-offset-2 hover:underline"
        >
          how it works
        </Link>
        .
      </p>

      {showingDrafts ? (
        <p className="m-0 mb-6 rounded-2xl border border-dashed border-[#8b6cff] bg-[#15151E] px-4 py-3 text-sm leading-relaxed text-[var(--muted)]">
          Draft preview. These guides stay off the public index, sitemap, and production
          URLs until <code className="text-[var(--text)]">draft</code> is set to{" "}
          <code className="text-[var(--text)]">false</code>. In production, a link that
          points at a draft guide is shown as plain text.
        </p>
      ) : null}

      {guides.length === 0 ? (
        <p className="m-0 text-[15px] leading-relaxed text-[var(--muted)]">
          New guides are in review. Nothing is published yet.
        </p>
      ) : (
        <ul className="m-0 grid list-none gap-4 p-0">
          {guides.map((guide) => (
            <li key={guide.slug}>
              <Link
                href={`/guides/${guide.slug}`}
                className="block rounded-2xl border border-[var(--line)] bg-[var(--surface)] p-5 transition-colors hover:border-[var(--line-strong)]"
              >
                <span className="mb-2 flex flex-wrap items-center gap-2 text-[11px] font-bold tracking-[0.08em] text-[var(--muted)] uppercase">
                  {formatGuideDate(guide.updated)}
                  {guide.draft ? (
                    <span className="rounded-full border border-[var(--line)] px-2 py-0.5 text-[10px] text-[#c1b4ff]">
                      Draft
                    </span>
                  ) : null}
                </span>
                <h2 className="m-0 mb-2 text-[22px] tracking-[-0.03em]">{guide.title}</h2>
                <p className="m-0 text-[15px] leading-relaxed text-[var(--muted)]">
                  {guide.description}
                </p>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </article>
  );
}
