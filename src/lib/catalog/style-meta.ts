const COPY_READY_SENTENCE =
  "Copy-ready prompt for ChatGPT, Gemini, and other AI image editors.";

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
