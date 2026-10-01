import { PRODUCTION_SITE_URL } from "@/lib/site-url";

const BRAND_SUFFIX = " · AI Prompt Grid";
const TITLE_LIMIT = 60;

export type StyleMention = {
  id: string;
  title: string;
};

export function showsDraftGuides(
  nodeEnv: string | undefined = process.env.NODE_ENV,
): boolean {
  return nodeEnv !== "production";
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

export function linkStyleMentions(
  markdown: string,
  styles: readonly StyleMention[],
): string {
  const sorted = [...styles]
    .filter((style) => style.title.trim().length >= 8 && style.id.trim().length > 0)
    .sort((a, b) => b.title.length - a.title.length);

  return mapOutsideFences(markdown, (segment) => {
    const pieces = segment.split(/(`[^`]*`|!\[[^\]]*\]\([^)]*\))/g);
    return pieces
      .map((piece, index) => {
        if (index % 2 === 1) return piece;
        let text = piece;
        for (const style of sorted) {
          if (text.includes(`](/styles/${style.id})`)) continue;
          const pattern = new RegExp(
            `(?<!\\[)${escapeRegExp(style.title)}(?!\\]\\()`,
            "",
          );
          text = text.replace(pattern, `[${style.title}](/styles/${style.id})`);
        }
        return text;
      })
      .join("");
  });
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
