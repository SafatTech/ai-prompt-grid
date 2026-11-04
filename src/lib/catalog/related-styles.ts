import type { CatalogStyle } from "@/lib/catalog/types";

export const RELATED_STYLE_LIMIT = 6;

function neighboringRelated(
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
  return same.concat(rest);
}

/**
 * Neighboring published styles for a detail page.
 * Same category comes first, walking forward through the catalog (and wrapping),
 * so each style links onward instead of always pointing at the same top three.
 * When `preferredIds` is set (SEO overrides), those styles lead the block.
 */
export function relatedStylesFor(
  styleId: string,
  category: string,
  catalog: CatalogStyle[],
  preferredIds?: readonly string[],
): CatalogStyle[] {
  const neighbors = neighboringRelated(styleId, category, catalog);

  if (!preferredIds?.length) {
    return neighbors.slice(0, RELATED_STYLE_LIMIT);
  }

  const byId = new Map(catalog.map((item) => [item.id, item]));
  const preferred: CatalogStyle[] = [];
  const seen = new Set<string>([styleId]);
  for (const id of preferredIds) {
    if (seen.has(id)) continue;
    const style = byId.get(id);
    if (!style) continue;
    preferred.push(style);
    seen.add(id);
    if (preferred.length >= RELATED_STYLE_LIMIT) {
      return preferred;
    }
  }

  for (const item of neighbors) {
    if (seen.has(item.id)) continue;
    preferred.push(item);
    seen.add(item.id);
    if (preferred.length >= RELATED_STYLE_LIMIT) break;
  }
  return preferred;
}
