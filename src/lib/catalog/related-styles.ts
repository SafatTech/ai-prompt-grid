import type { CatalogStyle } from "@/lib/catalog/types";

export const RELATED_STYLE_LIMIT = 6;

/**
 * Neighboring published styles for a detail page.
 * Same category comes first, walking forward through the catalog (and wrapping),
 * so each style links onward instead of always pointing at the same top three.
 */
export function relatedStylesFor(
  styleId: string,
  category: string,
  catalog: CatalogStyle[],
): CatalogStyle[] {
  const index = catalog.findIndex((item) => item.id === styleId);
  const rotated =
    index === -1
      ? catalog.filter((item) => item.id !== styleId)
      : catalog.slice(index + 1).concat(catalog.slice(0, index));
  const same = rotated.filter((item) => item.category === category);
  const rest = rotated.filter((item) => item.category !== category);
  return same.concat(rest).slice(0, RELATED_STYLE_LIMIT);
}
