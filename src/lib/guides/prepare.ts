import { PRODUCTION_SITE_URL } from "@/lib/site-url";

const BRAND_SUFFIX = " · AI Prompt Grid";
const TITLE_LIMIT = 60;

export type StyleMention = {
  id: string;
  title: string;
};

/**
 * Drafts are readable in local dev and on Vercel preview deployments.
 * Preview builds set NODE_ENV=production, so VERCEL_ENV decides when it is set.
 * Production (VERCEL_ENV=production, or NODE_ENV=production with no Vercel env) hides them.
 */
export function showsDraftGuides(
  env: { NODE_ENV?: string; VERCEL_ENV?: string } = process.env,
): boolean {
  if (env.VERCEL_ENV) return env.VERCEL_ENV !== "production";
  return env.NODE_ENV !== "production";
}

/** Drafts stay noindex on every host, including previews where they are readable. */
export function guideRobots(draft: boolean): {
  index: boolean;
  follow: boolean;
  "max-image-preview"?: "large";
} {
  if (draft) return { index: false, follow: false };
  return { index: true, follow: true, "max-image-preview": "large" };
}

export function isGuideVisible(draft: boolean, showDrafts: boolean): boolean {
  return !draft || showDrafts;
}

/** Document `<title>` text, kept at or under 60 characters. */
export function documentTitle(title: string): string {
  const withBrand = `${title}${BRAND_SUFFIX}`;
  if (withBrand.length <= TITLE_LIMIT) return withBrand;
  if (title.length <= TITLE_LIMIT) return title;
  return title.slice(0, TITLE_LIMIT).trimEnd();
}

/**
 * Next.js metadata title. A plain string uses the root template
 * (`%s · AI Prompt Grid`). An absolute title skips that suffix when it would
 * push the document title past 60 characters.
 */
export function guideMetadataTitle(title: string): string | { absolute: string } {
  const withBrand = `${title}${BRAND_SUFFIX}`;
  if (withBrand.length <= TITLE_LIMIT) return title;
  return { absolute: documentTitle(title) };
}

export function canonicalGuideUrl(slug?: string): string {
  if (!slug) return `${PRODUCTION_SITE_URL}/guides`;
  return `${PRODUCTION_SITE_URL}/guides/${slug}`;
}

/** Drop the leading `# ...` heading so the page H1 can come from frontmatter. */
export function stripLeadingH1(body: string): string {
  return body.replace(/^\uFEFF/, "").replace(/^\s*# [^\n]*\s*(?:\n+|$)/, "");
}

export function rewriteImagePlaceholders(markdown: string): string {
  return mapOutsideFences(markdown, (segment) =>
    segment.replace(/\[IMAGE(?::\s*([^\]]+))?\]/g, (_match, caption?: string) => {
      const alt = caption?.trim() || "Example photo coming soon";
      return `![${alt.replace(/[\[\]]/g, "")}](guide-image-placeholder)`;
    }),
  );
}

/** Same art as `src/app/opengraph-image.tsx`, used when a page sets its own Open Graph. */
export const defaultOgImage = {
  url: "/opengraph-image",
  width: 1200,
  height: 630,
  alt: "AI Prompt Grid — tested photo transformation prompts",
} as const;

export type GuideImage = {
  alt: string;
  src: string;
};

const MARKDOWN_IMAGE = /!\[([^\]]*)\]\(([^)\s]+)(?:\s+"[^"]*")?\)/g;

/** First real figure in the guide. Placeholders and fenced examples are ignored. */
export function guideHeroImage(markdown: string): GuideImage | null {
  const outsideFences = markdown
    .split(/(```[\s\S]*?```)/g)
    .filter((_, index) => index % 2 === 0)
    .join("\n");

  for (const match of outsideFences.matchAll(MARKDOWN_IMAGE)) {
    const src = match[2] ?? "";
    if (!src || src === "guide-image-placeholder") continue;
    return { alt: (match[1] ?? "").trim(), src };
  }
  return null;
}

export function guideSocialImage(markdown: string): {
  url: string;
  alt: string;
  width?: number;
  height?: number;
} {
  const hero = guideHeroImage(markdown);
  if (!hero) return { ...defaultOgImage };
  return {
    url:
      hero.src.startsWith("http") || hero.src.startsWith("/") ? hero.src : `/${hero.src}`,
    alt: hero.alt || defaultOgImage.alt,
  };
}

/** Absolute image URL for Article JSON-LD. Undefined when the guide has no real image. */
export function guideArticleImage(markdown: string): string | undefined {
  const hero = guideHeroImage(markdown);
  if (!hero) return undefined;
  if (/^https?:\/\//i.test(hero.src)) return hero.src;
  if (hero.src.startsWith("//")) return `https:${hero.src}`;
  const path = hero.src.startsWith("/") ? hero.src : `/${hero.src}`;
  return `${PRODUCTION_SITE_URL}${path}`;
}

/**
 * Inline code, images, and existing links (including their label text) are left alone.
 * A style title is linked at most once, and only on a whole-word match outside those spans.
 * A style the writer already linked is not linked again.
 */
export function linkStyleMentions(
  markdown: string,
  styles: readonly StyleMention[],
): string {
  const sorted = [...styles]
    .filter((style) => style.title.trim().length >= 8 && style.id.trim().length > 0)
    .sort((a, b) => b.title.length - a.title.length);

  return mapOutsideFences(markdown, (segment) => linkPlainStyleMentions(segment, sorted));
}

const PROTECTED_MARKDOWN =
  /(`[^`]*`|!\[[^\]]*\]\([^)\n]*\)|\[[^\]]*\]\([^)\n]*\)|\[[^\]]*\]\[[^\]]*\]|\[[^\]]*\])/g;

function linkPlainStyleMentions(
  segment: string,
  styles: readonly StyleMention[],
): string {
  const held: string[] = [];
  const hold = (value: string) => {
    const token = `\u0000${held.length}\u0000`;
    held.push(value);
    return token;
  };

  let text = segment.replace(PROTECTED_MARKDOWN, (match) => hold(match));

  for (const style of styles) {
    if (
      segmentLinksStyle(segment, style.id) ||
      held.some((chunk) => segmentLinksStyle(chunk, style.id))
    ) {
      continue;
    }
    const pattern = new RegExp(`\\b${escapeRegExp(style.title)}\\b`, "u");
    text = text.replace(pattern, (match) => hold(`[${match}](/styles/${style.id})`));
  }

  return text.replace(
    /\u0000(\d+)\u0000/g,
    (_match, index: string) => held[Number(index)] ?? "",
  );
}

function segmentLinksStyle(text: string, id: string): boolean {
  return text.includes(`](/styles/${id})`);
}

export function prepareGuideMarkdown(
  body: string,
  styles: readonly StyleMention[],
): string {
  const withoutH1 = stripLeadingH1(body);
  const withImages = rewriteImagePlaceholders(withoutH1);
  return linkStyleMentions(withImages, styles).trim();
}

export type GuideLinkMode = "link" | "text";

/** Guide hrefs that would 404 stay plain text. Other hrefs stay links. */
export function guideLinkMode(
  href: string,
  visibleSlugs: ReadonlySet<string>,
): GuideLinkMode {
  const slug = guideSlugFromHref(href);
  if (!slug) return "link";
  return visibleSlugs.has(slug) ? "link" : "text";
}

export function guideSlugFromHref(href: string): string | null {
  const trimmed = href.trim();
  if (!trimmed || trimmed.startsWith("#") || trimmed.startsWith("mailto:")) return null;

  let pathname = trimmed;
  if (/^https?:\/\//i.test(trimmed)) {
    try {
      const url = new URL(trimmed);
      const host = url.hostname.replace(/^www\./, "");
      if (host !== "aipromptgrid.com") return null;
      pathname = url.pathname;
    } catch {
      return null;
    }
  } else if (!trimmed.startsWith("/")) {
    return null;
  }

  const parts = pathname.split("/").filter(Boolean);
  if (parts[0] !== "guides" || parts.length !== 2) return null;
  return decodeURIComponent(parts[1] ?? "");
}

export function formatGuideDate(isoDate: string): string {
  const match = /^(\d{4})-(\d{2})-(\d{2})$/.exec(isoDate);
  if (!match) return isoDate;
  const year = Number(match[1]);
  const month = Number(match[2]);
  const day = Number(match[3]);
  const date = new Date(Date.UTC(year, month - 1, day));
  return new Intl.DateTimeFormat("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
    timeZone: "UTC",
  }).format(date);
}

function mapOutsideFences(
  markdown: string,
  mapSegment: (segment: string) => string,
): string {
  const parts = markdown.split(/(```[\s\S]*?```)/g);
  return parts.map((part, index) => (index % 2 === 1 ? part : mapSegment(part))).join("");
}

function escapeRegExp(value: string): string {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}
