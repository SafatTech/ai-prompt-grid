import { publishedGuideSlugs } from "@/lib/guides/published-slugs.generated";

export type FooterGuideLink = {
  slug: string;
  label: string;
};

export type FooterFestivalLink = {
  href: string;
  label: string;
};

/**
 * Curated footer guide entries. Only slugs present in the published manifest
 * are rendered, so a draft can never appear as a footer href.
 */
const FOOTER_GUIDE_CANDIDATES: readonly FooterGuideLink[] = [
  { slug: "how-to-merge-two-photos-in-gemini", label: "Merge two photos" },
  { slug: "gemini-headshot-cv-photo-prompts", label: "LinkedIn headshot" },
  { slug: "how-to-keep-face-same-in-gemini-ai", label: "Keep your face the same" },
  { slug: "80s-ai-photo-prompts-solo-couple", label: "80s photo prompts" },
  { slug: "anime-ai-photo-prompts", label: "Anime photo prompts" },
];

const FOOTER_FESTIVAL_CANDIDATES: readonly {
  slug?: string;
  href: string;
  label: string;
}[] = [
  {
    slug: "diwali-couple-ai-photo-editing-prompts",
    href: "/guides/diwali-couple-ai-photo-editing-prompts",
    label: "Diwali prompts",
  },
  { href: "/explore?q=Eid", label: "Eid prompts" },
  {
    slug: "halloween-ai-prompts-for-selfies",
    href: "/guides/halloween-ai-prompts-for-selfies",
    label: "Halloween",
  },
  {
    slug: "winter-ai-photo-prompts",
    href: "/guides/winter-ai-photo-prompts",
    label: "Winter",
  },
];

const published = new Set(publishedGuideSlugs);

/** Footer Guides column: published candidates only, plus "All guides". */
export function publishedFooterGuideLinks(
  limit = 3,
): readonly FooterGuideLink[] {
  return FOOTER_GUIDE_CANDIDATES.filter((link) => published.has(link.slug)).slice(
    0,
    limit,
  );
}

/** Footer Festivals column: explore queries always, guide hrefs only when published. */
export function publishedFooterFestivalLinks(): readonly FooterFestivalLink[] {
  return FOOTER_FESTIVAL_CANDIDATES.filter(
    (link) => !link.slug || published.has(link.slug),
  ).map(({ href, label }) => ({ href, label }));
}

/** True when an internal /guides/... href targets a published slug. */
export function isPublishedGuideHref(href: string): boolean {
  const match = /^\/guides\/([^/?#]+)/.exec(href.trim());
  if (!match?.[1]) return false;
  return published.has(decodeURIComponent(match[1]));
}
