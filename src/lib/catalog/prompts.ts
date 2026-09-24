import {
  backgroundSchema,
  moodSchema,
  promptOptionsSchema,
  ratioSchema,
  type PromptOptionsInput,
} from "./schemas";
import type { CatalogStyle } from "./types";

export type PromptOptions = PromptOptionsInput;

export const moodOptions = moodSchema.options;
export const backgroundOptions = backgroundSchema.options;
export const ratioOptions = ratioSchema.options;

export const defaultPromptOptions: PromptOptions = {
  mood: "Warm neutral",
  background: "Softly blurred interior",
  ratio: "4:5 Portrait",
  keepClothing: true,
  keepPose: true,
};

function naturalList(items: string[]) {
  if (items.length < 2) return items[0] || "";
  if (items.length === 2) return `${items[0]} and ${items[1]}`;
  return `${items.slice(0, -1).join(", ")}, and ${items.at(-1)}`;
}

function subjectToken(style: CatalogStyle) {
  if (style.subject === "Person") return "person";
  return style.subject.toLowerCase();
}

function preserveList(_style: CatalogStyle, options: PromptOptions) {
  const details = [
    "recognizable identity",
    "proportions",
    "defining features",
    "expression",
  ];
  if (options.keepPose) details.push("pose");
  if (options.keepClothing) details.push("clothing");
  return naturalList(details);
}

export type AssemblePromptResult =
  | { ok: true; prompt: string; version: string; tool: string; mode: string }
  | { ok: false; errors: string[] };

/**
 * Validate options and assemble a complete prompt from the style's tested template.
 * Blocks copy when required fields are missing or invalid.
 */
export function assemblePrompt(
  style: CatalogStyle,
  options: PromptOptions,
): AssemblePromptResult {
  const parsed = promptOptionsSchema.safeParse(options);
  if (!parsed.success) {
    return {
      ok: false,
      errors: parsed.error.issues.map((issue) => issue.message),
    };
  }

  const valid = parsed.data;
  const template = style.promptVariant.template;
  if (!template?.trim()) {
    return { ok: false, errors: ["Prompt template is missing for this style."] };
  }

  const prompt = template
    .replaceAll("{{subject}}", subjectToken(style))
    .replaceAll("{{mood}}", valid.mood.toLowerCase())
    .replaceAll("{{background}}", valid.background.toLowerCase())
    .replaceAll("{{ratio}}", valid.ratio)
    .replaceAll("{{preserve}}", preserveList(style, valid));

  if (/\{\{[a-zA-Z]+\}\}/.test(prompt)) {
    return {
      ok: false,
      errors: ["Prompt still contains unresolved placeholders and cannot be copied."],
    };
  }

  return {
    ok: true,
    prompt,
    version: style.promptVariant.version,
    tool: style.promptVariant.tool,
    mode: style.promptVariant.mode,
  };
}

/** Convenience for UI preview — returns empty string if invalid. */
export function previewPrompt(style: CatalogStyle, options: PromptOptions) {
  const result = assemblePrompt(style, options);
  return result.ok ? result.prompt : "";
}

export function defaultsForStyle(style: CatalogStyle): PromptOptions {
  const d = style.promptVariant.defaults;
  const parsed = promptOptionsSchema.safeParse(d);
  return parsed.success ? parsed.data : defaultPromptOptions;
}
