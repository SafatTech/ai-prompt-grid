import {
  getStyleChangeCategory,
  inferStyleChangeCategory,
  STYLE_CHANGE_CATEGORIES,
  type StyleChangeCategoryId,
} from "./style-change-categories";
import type { StyleChangeDetail } from "./style-change-detail-types";
import { STYLE_CHANGE_DETAILS } from "./style-change-details";

const SHORT_MAX = 95;

function clampChars(text: string, max: number): string {
  const cleaned = text.replace(/\s+/g, " ").trim();
  if (cleaned.length <= max) return cleaned;
  const sliced = cleaned.slice(0, max - 1);
  const lastSpace = sliced.lastIndexOf(" ");
  return `${(lastSpace > 40 ? sliced.slice(0, lastSpace) : sliced).trimEnd()}…`;
}

function isCategory(value: string): value is StyleChangeCategoryId {
  return value in STYLE_CHANGE_CATEGORIES;
}

function fallbackDetail(label: string, styleTitle: string): StyleChangeDetail {
  const category = inferStyleChangeCategory(label);
  const cat = getStyleChangeCategory(category);
  const theme = styleTitle
    .replace(/\([^)]*\)/g, " ")
    .replace(/\b(AI|Photo|Prompt|Editing|Gemini|ChatGPT|Free|Copy-?Paste)\b/gi, " ")
    .replace(/\s+/g, " ")
    .trim();
  const shortTheme = theme.split(/\s+/).slice(0, 4).join(" ") || "this look";

  return {
    label,
    category,
    shortDescription: clampChars(
      `Updates ${label.toLowerCase()} to match ${shortTheme} while keeping your face.`,
      SHORT_MAX,
    ),
    summary: `This pass reworks ${label.toLowerCase()} so the result matches ${shortTheme}. Your facial identity stays locked while the rest of the frame shifts into the style’s intended look.`,
    beforeLabel: `Source ${label.toLowerCase()}`,
    afterLabel: label,
    trigger: label.toLowerCase(),
    chip: cat.defaultChip,
  };
}

/**
 * Resolve authored change details for a style, falling back per-label when a
 * newly added style (or label) is missing from STYLE_CHANGE_DETAILS.
 */
export function resolveStyleChangeDetails(options: {
  styleId: string;
  styleTitle: string;
  labels: readonly string[];
}): StyleChangeDetail[] {
  const authored = STYLE_CHANGE_DETAILS[options.styleId];
  const byLabel = new Map((authored ?? []).map((item) => [item.label, item]));

  return options.labels.map((label) => {
    const hit = byLabel.get(label);
    if (hit) {
      return {
        ...hit,
        category: isCategory(hit.category)
          ? hit.category
          : inferStyleChangeCategory(label),
      };
    }
    return fallbackDetail(label, options.styleTitle);
  });
}
