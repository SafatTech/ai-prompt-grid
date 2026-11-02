import { animeStyleIds } from "./seed-anime-styles";
import { birthdayStyleIds } from "./seed-birthday-styles";
import { boysStyleIds } from "./seed-boys-styles";
import { characterStyleIds } from "./seed-character-styles";
import { christmasStyleIds } from "./seed-christmas-styles";
import { eightiesStyleIds } from "./seed-80s-styles";
import { linkedinStyleIds } from "./seed-linkedin-styles";
import { mergeStyleIds } from "./seed-merge-styles";
import { winterStyleIds } from "./seed-winter-styles";

const COPY_READY_SENTENCE =
  "Copy-ready prompt for ChatGPT, Gemini, and other AI image editors.";

const BRAND_SUFFIX = " · AI Prompt Grid";
const TITLE_LIMIT = 60;

/**
 * Code-level SEO overrides for published styles whose title/description live
 * in Supabase. Values replace catalog fields for <title> and meta description
 * only (display H1 stays on the DB/seed title).
 */
export const STYLE_SEO_OVERRIDES: Readonly<
  Record<string, { readonly title: string; readonly description: string }>
> = {
  "passport-size-photo-ai-prompt-gemini-white-background": {
    title: "Passport Size Photo Prompt: Gemini & ChatGPT, White BG",
    description:
      "Copy-paste passport size photo prompt for Gemini and ChatGPT. Turn one selfie into a white or blue background ID, 2x2 or visa photo with your real face kept.",
  },
  "cv-photo-ai-prompt-plain-background-resume-headshot": {
    title: "CV Photo AI Prompt for Resume Pictures (Gemini/ChatGPT)",
    description:
      "Free AI prompt for a CV or resume photo: turn a selfie into a clean, professional headshot on a plain background in Gemini or ChatGPT. Copy and paste.",
  },
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
  if (override) return override.description;
  return stylePageDescription(style.description || style.note || "", style.title);
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
  if (override) {
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
