import type { CatalogStyle } from "@/lib/catalog/types";
import { styleIdsSharingGuide } from "@/lib/guides/style-featured-guides";

export const RELATED_STYLE_LIMIT = 8;

const THEME_STOP_WORDS = new Set([
  "ai",
  "photo",
  "photos",
  "prompt",
  "prompts",
  "free",
  "gemini",
  "chatgpt",
  "for",
  "the",
  "and",
  "with",
  "from",
  "into",
  "your",
  "edit",
  "editing",
  "look",
  "style",
  "image",
  "portrait",
]);

function themeTokens(style: CatalogStyle): Set<string> {
  const tokens = new Set<string>();
  const hay = `${style.title} ${style.category} ${style.note} ${style.description}`;
  for (const raw of hay.toLowerCase().split(/[^a-z0-9]+/)) {
    if (raw.length < 3 || THEME_STOP_WORDS.has(raw)) continue;
    tokens.add(raw);
  }
  return tokens;
}

function sharedThemeCount(a: Set<string>, b: Set<string>): number {
  let count = 0;
  for (const token of a) {
    if (b.has(token)) count += 1;
  }
  return count;
}

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
 * Related styles for a detail page (limit 8).
 * Order: preferredIds overrides → styles sharing a published guide → same
 * category → shared theme words in title/note → catalog neighbours.
 * `catalog` must already be published/indexable only.
 */
export function relatedStylesFor(
  styleId: string,
  category: string,
  catalog: CatalogStyle[],
  preferredIds?: readonly string[],
): CatalogStyle[] {
  const byId = new Map(catalog.map((item) => [item.id, item]));
  const current = byId.get(styleId);
  const currentTokens = current ? themeTokens(current) : new Set<string>();
  const guidePeers = styleIdsSharingGuide(styleId);
  const neighbors = neighboringRelated(styleId, category, catalog);
  const neighborRank = new Map(neighbors.map((item, index) => [item.id, index]));

  const scored = catalog
    .filter((item) => item.id !== styleId)
    .map((item) => {
      let score = 0;
      if (guidePeers.has(item.id)) score += 1_000;
      if (item.category === category) score += 300;
      score += sharedThemeCount(currentTokens, themeTokens(item)) * 20;
      const nRank = neighborRank.get(item.id);
      if (nRank != null) score += Math.max(0, 50 - nRank);
      return { item, score };
    })
    .sort((a, b) => {
      if (b.score !== a.score) return b.score - a.score;
      return a.item.title.localeCompare(b.item.title);
    });

  const result: CatalogStyle[] = [];
  const seen = new Set<string>([styleId]);

  const push = (style: CatalogStyle | undefined) => {
    if (!style || seen.has(style.id)) return;
    // Catalog is published-only; still guard against accidental drafts.
    if (style.status !== "published") return;
    seen.add(style.id);
    result.push(style);
  };

  if (preferredIds?.length) {
    for (const id of preferredIds) {
      push(byId.get(id));
      if (result.length >= RELATED_STYLE_LIMIT) return result;
    }
  }

  for (const { item } of scored) {
    push(item);
    if (result.length >= RELATED_STYLE_LIMIT) break;
  }

  return result;
}
