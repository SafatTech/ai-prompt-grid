import { animeStyleIds } from "./seed-anime-styles";
import { birthdayStyleIds } from "./seed-birthday-styles";
import { boysStyleIds } from "./seed-boys-styles";
import { characterStyleIds } from "./seed-character-styles";
import { christmasStyleIds } from "./seed-christmas-styles";
import { eightiesStyleIds } from "./seed-80s-styles";
import { linkedinStyleIds } from "./seed-linkedin-styles";
import { mergeStyleIds } from "./seed-merge-styles";
import { STYLE_SEO_OVERRIDE_ENTRIES } from "./style-seo-overrides-data";
import type { StyleSeoOverride } from "./style-seo-override-types";
import { STYLE_UNIQUENESS_ENTRIES } from "./style-uniqueness-data";
import { winterStyleIds } from "./seed-winter-styles";

export type {
  StyleFaq,
  StyleGuideLink,
  StyleSeoOverride,
} from "./style-seo-override-types";

const COPY_READY_SENTENCE =
  "Copy-ready prompt for ChatGPT, Gemini, and other AI image editors.";

const BRAND_SUFFIX = " · AI Prompt Grid";
const TITLE_LIMIT = 60;

/**
 * Code-level SEO overrides for published styles whose title/description live
 * in Supabase. Values replace catalog fields for <title>, meta description,
 * optional H1, and on-page intro/tips when present.
 * Uniqueness copy (intro/tips/faqs/addonLine) is layered from
 * STYLE_UNIQUENESS_ENTRIES without changing prompts or catalog defaults.
 */
export const STYLE_SEO_OVERRIDES: Readonly<Record<string, StyleSeoOverride>> = {
  ...STYLE_SEO_OVERRIDE_ENTRIES,
  ...Object.fromEntries(
    Object.entries(STYLE_UNIQUENESS_ENTRIES).map(([slug, uniq]) => {
      const base = STYLE_SEO_OVERRIDE_ENTRIES[slug];
      return [
        slug,
        {
          ...(base ?? {}),
          // Uniqueness copy only; never wipe SEO title/meta/h1/guides.
          intro: uniq.intro,
          tips: uniq.tips,
          faqs: uniq.faqs,
          addonLine: uniq.addonLine,
        } satisfies StyleSeoOverride,
      ];
    }),
  ),
};

/** Sentence-ending punctuation, including a closing quote or parenthesis. */
const ENDS_WITH_PUNCTUATION = /[.!?…]["')\]]*$/;

/**
 * Style meta descriptions join the catalog summary to a second sentence.
 * Add a period only when the summary does not already end in punctuation.
 */
export function stylePageDescription(summary: string, title: string): string {
  const trimmed = summary.trim();
  if (!trimmed) {
    return `Copy-ready ${title} prompt for ChatGPT, Gemini, and other AI image editors.`;
  }

  const lead = ENDS_WITH_PUNCTUATION.test(trimmed) ? trimmed : `${trimmed}.`;
  return `${lead} ${COPY_READY_SENTENCE}`;
}

/**
 * Meta description for a style page. SEO overrides replace the catalog summary
 * and skip the boilerplate second sentence.
 */
export function styleSeoDescription(style: {
  id: string;
  title: string;
  description?: string | null;
  note?: string | null;
}): string {
  const override = STYLE_SEO_OVERRIDES[style.id];
  if (override?.description) return override.description;
  return stylePageDescription(style.description || style.note || "", style.title);
}

/** Visible H1 for a style page (override title/h1 when present). */
export function styleDisplayTitle(style: { id: string; title: string }): string {
  const override = STYLE_SEO_OVERRIDES[style.id];
  if (!override?.h1 && !override?.title) return style.title;
  return override.h1 || override.title || style.title;
}

/** Full SEO override record when the style has one. */
export function styleSeoOverride(styleId: string): StyleSeoOverride | undefined {
  return STYLE_SEO_OVERRIDES[styleId];
}

/**
 * True when the style uses the compact AdSense uniqueness layout: top of page
 * matches catalog (description + main prompt/copy unchanged); short intro, tips,
 * optional add-on, and collapsed FAQ details render in the left column below
 * Limitations. Gated on `faqs` so legacy GSC thin overrides (intro + tips only)
 * keep their existing layout.
 */
export function styleHasUniqueContentSections(
  override: StyleSeoOverride | undefined,
): boolean {
  return Boolean(override?.faqs?.length);
}

/**
 * Shorten an overflowing title on a word boundary.
 * A cut that already ends a word keeps that word.
 */
function trimAtWordBoundary(value: string, limit: number): string {
  if (value.length <= limit) return value;
  const slice = value.slice(0, limit);
  if (slice.endsWith(" ") || value[limit] === " ") return slice.trimEnd();
  const boundary = slice.lastIndexOf(" ");
  if (boundary > 0) return slice.slice(0, boundary).trimEnd();
  return slice.trimEnd();
}

function fitDocumentTitle(look: string): string | { absolute: string } {
  if (`${look}${BRAND_SUFFIX}`.length <= TITLE_LIMIT) return look;
  if (look.length <= TITLE_LIMIT) return { absolute: look };
  return { absolute: trimAtWordBoundary(look, TITLE_LIMIT) };
}

/**
 * Style document titles. When the catalog title is already a full SEO prompt
 * title (contains "Prompt"), use it as-is via fitDocumentTitle so the root
 * ` · AI Prompt Grid` template does not double-append past 60 characters.
 * Legacy short 1980s looks and the character action styles get " AI Photo Prompt"; other short looks get
 * " Prompt". LinkedIn, merge, winter, anime, birthday, boys, and Christmas titles stay unchanged.
 */
export function styleMetadataTitle(style: {
  id: string;
  title: string;
}): string | { absolute: string } {
  const override = STYLE_SEO_OVERRIDES[style.id];
  if (override?.title) {
    return fitDocumentTitle(override.title);
  }
  if (/\bPrompt\b/i.test(style.title)) {
    return fitDocumentTitle(style.title);
  }
  if (eightiesStyleIds.has(style.id) || characterStyleIds.has(style.id)) {
    return fitDocumentTitle(`${style.title} AI Photo Prompt`);
  }
  if (
    linkedinStyleIds.has(style.id) ||
    mergeStyleIds.has(style.id) ||
    winterStyleIds.has(style.id) ||
    animeStyleIds.has(style.id) ||
    birthdayStyleIds.has(style.id) ||
    boysStyleIds.has(style.id) ||
    christmasStyleIds.has(style.id)
  ) {
    return fitDocumentTitle(style.title);
  }
  return fitDocumentTitle(`${style.title} Prompt`);
}

/** Open Graph / Twitter title, including the brand suffix when it fits. */
export function styleSocialTitle(style: { id: string; title: string }): string {
  const title = styleMetadataTitle(style);
  if (typeof title === "string") return `${title}${BRAND_SUFFIX}`;
  return title.absolute;
}
