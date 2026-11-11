import { STYLE_BEST_FOR } from "@/lib/catalog/style-best-for.generated";
import {
  formatBestForLine,
  type StyleBestForEntry,
  type StyleBestForLine,
} from "@/lib/catalog/style-best-for";

/** Stored best-for entry for a style page (generated data, not runtime regex). */
export function styleBestForEntry(styleId: string): StyleBestForEntry | undefined {
  return STYLE_BEST_FOR[styleId];
}

export function styleBestForLine(styleId: string): StyleBestForLine | undefined {
  const entry = STYLE_BEST_FOR[styleId];
  if (!entry) return undefined;
  return {
    ...entry,
    line: formatBestForLine(entry),
  };
}
