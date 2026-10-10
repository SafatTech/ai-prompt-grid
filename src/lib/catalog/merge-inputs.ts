import type { CatalogStyle } from "./types";

export type MergeInputPhoto = {
  src: string;
  alt: string;
};

/**
 * Photos that belong to one merged result.
 * Photo 1 is the first example pair. Photo 2+ are later pairs that share
 * that same result URL (the source-<n>b row). No extra database columns.
 * A declared multi-photo style with only one stored source returns that
 * single photo so the page can show one before instead of a missing file.
 * One-photo styles, including a second example with its own result, return
 * an empty list and keep CompareSlider.
 */
export function mergeInputPhotos(style: CatalogStyle): MergeInputPhoto[] {
  const pairs = style.examplePairs.filter((pair) => pair.source && pair.result);
  const primary = pairs[0];
  if (!primary) return [];

  const photos: MergeInputPhoto[] = [];
  const seen = new Set<string>();
  for (const pair of pairs) {
    if (pair.result !== primary.result) continue;
    if (seen.has(pair.source)) continue;
    seen.add(pair.source);
    photos.push({ src: pair.source, alt: pair.altSource });
  }

  const declared = style.promptVariant.inputImageCount;
  if (photos.length >= 2) return photos;
  if (declared >= 2 && photos.length === 1) return photos;
  return [];
}

/** Hero print stack, including a two-photo style that only has one stored before. */
export function usesMergeHero(style: CatalogStyle): boolean {
  return (
    style.promptVariant.inputImageCount >= 2 && mergeInputPhotos(style).length >= 1
  );
}

/** Docked guide, card, and example block. Needs both stored input photos. */
export function usesMergeStack(style: CatalogStyle): boolean {
  return mergeInputPhotos(style).length >= 2;
}
