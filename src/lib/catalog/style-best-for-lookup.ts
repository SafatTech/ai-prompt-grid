import { STYLE_BEST_FOR_DATA } from "@/lib/catalog/style-best-for-data";
import { STYLE_BEST_FOR } from "@/lib/catalog/style-best-for.generated";
import {
  formatBestForLine,
  type StyleBestForEntry,
  type StyleBestForLine,
} from "@/lib/catalog/style-best-for";

/**
 * Preferred: hand-authored per-style data (unique occasions).
 * Fallback: older heuristic generated map if an id is ever missing.
 */
export function styleBestForEntry(styleId: string): StyleBestForEntry | undefined {
  return STYLE_BEST_FOR_DATA[styleId] ?? STYLE_BEST_FOR[styleId];
}

export function styleBestForLine(styleId: string): StyleBestForLine | undefined {
  const entry = styleBestForEntry(styleId);
  if (!entry) return undefined;
  return {
    ...entry,
    line: formatBestForLine(entry),
  };
}
