/**
 * Client-safe prompt helpers: no zod, no seed catalog.
 * Server/API keep using prompts.ts for schema-validated assemble.
 */
import type { CatalogStyle } from "./types";

export type PromptOptions = {
  mood: string;
  background: string;
  ratio: string;
  keepClothing: boolean;
  keepPose: boolean;
};

export const RATIO_OPTIONS = ["4:5 Portrait", "1:1 Square", "9:16 Story"] as const;

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
  if (style.subject === "Product or object") return "product";
  return style.subject.toLowerCase();
}

/** Labels for the two preserve toggles (mapped to keepClothing / keepPose). */
export function preserveToggleLabels(subject: CatalogStyle["subject"]): {
  clothing: string;
  pose: string;
} {
  if (subject === "Product or object") {
    return {
      clothing: "Product details & genuine packaging",
      pose: "Camera angle & framing",
    };
  }
  if (subject === "Group") {
    return {
      clothing: "Identities & facial features",
      pose: "Group arrangement & pose",
    };
  }
  if (subject === "Place") {
    return {
      clothing: "Structural layout",
      pose: "Camera perspective",
    };
  }
  if (subject === "Pet") {
    return {
      clothing: "Pet identity and distinctive markings",
      pose: "Original pose and composition",
    };
  }
  return {
    clothing: "Keep clothing from original photo",
    pose: "Keep original pose",
  };
}

function preserveList(style: CatalogStyle, options: PromptOptions) {
  if (style.subject === "Product or object") {
    const details: string[] = [];
    if (options.keepClothing) details.push("product details & genuine packaging");
    if (options.keepPose) details.push("camera angle & framing");
    return details.length ? naturalList(details) : "no additional preserve requirements";
  }

  if (style.subject === "Group") {
    const details: string[] = [];
    if (options.keepClothing) details.push("identities and facial features");
    if (options.keepPose) details.push("group arrangement and pose");
    return details.length ? naturalList(details) : "no additional preserve requirements";
  }

  if (style.subject === "Place") {
    const details: string[] = [];
    if (options.keepClothing) details.push("structural layout");
    if (options.keepPose) details.push("camera perspective");
    return details.length ? naturalList(details) : "no additional preserve requirements";
  }

  if (style.subject === "Pet") {
    const details: string[] = [];
    if (options.keepClothing) details.push("pet identity and distinctive markings");
    if (options.keepPose) details.push("original pose and composition");
    return details.length ? naturalList(details) : "no additional preserve requirements";
  }

  const details = [
    "recognizable identity",
    "proportions",
    "defining features",
  ];
  // #190 battle knight: omit expression so the template's battle-face instruction wins.
  if (style.id !== "dark-fantasy-armored-knight-ai-photo-prompt") {
    details.push("expression");
  }
  if (options.keepPose) details.push("pose");
  if (options.keepClothing) details.push("clothing");
  return naturalList(details);
}

export type AssemblePromptResult =
  | { ok: true; prompt: string; version: string; tool: string; mode: string }
  | { ok: false; errors: string[] };

function normalizeOptions(options: PromptOptions): PromptOptions | null {
  const mood = options.mood?.trim();
  const background = options.background?.trim();
  const ratio = options.ratio?.trim();
  if (!mood || !background || !ratio) return null;
  if (!(RATIO_OPTIONS as readonly string[]).includes(ratio)) return null;
  return {
    mood,
    background,
    ratio,
    keepClothing: Boolean(options.keepClothing),
    keepPose: Boolean(options.keepPose),
  };
}

/**
 * Assemble a prompt from the style template without zod.
 * Callers should only pass options from trusted UI selects / seed defaults.
 */
export function assemblePromptCore(
  style: CatalogStyle,
  options: PromptOptions,
): AssemblePromptResult {
  const valid = normalizeOptions(options);
  if (!valid) {
    return { ok: false, errors: ["Prompt options are incomplete or invalid."] };
  }

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

export function previewPromptCore(style: CatalogStyle, options: PromptOptions) {
  const result = assemblePromptCore(style, options);
  return result.ok ? result.prompt : "";
}

/** Read defaults from the style without schema round-trips. */
export function defaultsForStyleCore(style: CatalogStyle): PromptOptions {
  const d = style.promptVariant.defaults;
  return {
    mood: d.mood?.trim() || defaultPromptOptions.mood,
    background: d.background?.trim() || defaultPromptOptions.background,
    ratio: d.ratio?.trim() || defaultPromptOptions.ratio,
    keepClothing: d.keepClothing ?? true,
    keepPose: d.keepPose ?? true,
  };
}
