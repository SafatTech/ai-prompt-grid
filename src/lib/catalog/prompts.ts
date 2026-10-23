/**
 * Server/API prompt helpers with zod validation.
 * Client UI should import from prompt-core.ts instead.
 */
import { promptOptionsSchema, moodSchema, backgroundSchema, ratioSchema } from "./schemas";
import type { CatalogStyle } from "./types";
import {
  assemblePromptCore,
  defaultPromptOptions as defaultPromptOptionsCore,
  defaultsForStyleCore,
  previewPromptCore,
  preserveToggleLabels as preserveToggleLabelsCore,
  RATIO_OPTIONS,
  type AssemblePromptResult,
  type PromptOptions as PromptOptionsCore,
} from "./prompt-core";

export type PromptOptions = PromptOptionsCore;
export type { AssemblePromptResult };

export const moodOptions = moodSchema.options;
export const backgroundOptions = backgroundSchema.options;
export const ratioOptions = ratioSchema.options;
/** Prefer RATIO_OPTIONS / prompt-core on the client. */
export { RATIO_OPTIONS };

export const defaultPromptOptions: PromptOptions = defaultPromptOptionsCore;

export const preserveToggleLabels = preserveToggleLabelsCore;

/**
 * Validate options (zod) and assemble a complete prompt from the style template.
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
  return assemblePromptCore(style, parsed.data);
}

/** Convenience for UI preview — returns empty string if invalid. */
export function previewPrompt(style: CatalogStyle, options: PromptOptions) {
  const parsed = promptOptionsSchema.safeParse(options);
  if (!parsed.success) return "";
  return previewPromptCore(style, parsed.data);
}

export function defaultsForStyle(style: CatalogStyle): PromptOptions {
  const d = style.promptVariant.defaults;
  const parsed = promptOptionsSchema.safeParse(d);
  return parsed.success ? parsed.data : defaultsForStyleCore(style);
}
