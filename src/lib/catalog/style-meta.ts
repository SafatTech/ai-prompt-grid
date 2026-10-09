import { eightiesStyleIds } from "./seed-80s-styles";
import { linkedinStyleIds } from "./seed-linkedin-styles";

const COPY_READY_SENTENCE =
  "Copy-ready prompt for ChatGPT, Gemini, and other AI image editors.";

const BRAND_SUFFIX = " · AI Prompt Grid";
const TITLE_LIMIT = 60;

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

function fitDocumentTitle(look: string): string | { absolute: string } {
  if (`${look}${BRAND_SUFFIX}`.length <= TITLE_LIMIT) return look;
  if (look.length <= TITLE_LIMIT) return { absolute: look };
  return { absolute: look.slice(0, TITLE_LIMIT).trimEnd() };
}

/**
 * Style document titles. 1980s pages use "[Look] AI Photo Prompt".
 * LinkedIn pages already use a full prompt title, so nothing extra is added.
 * Other styles keep the existing "[Look] Prompt" title. All stay within 60 characters.
 */
export function styleMetadataTitle(style: {
  id: string;
  title: string;
}): string | { absolute: string } {
  if (eightiesStyleIds.has(style.id)) {
    return fitDocumentTitle(`${style.title} AI Photo Prompt`);
  }
  if (linkedinStyleIds.has(style.id)) return fitDocumentTitle(style.title);
  return `${style.title} Prompt`;
}

/** Open Graph / Twitter title, including the brand suffix when it fits. */
export function styleSocialTitle(style: { id: string; title: string }): string {
  const title = styleMetadataTitle(style);
  if (typeof title === "string") return `${title}${BRAND_SUFFIX}`;
  return title.absolute;
}
