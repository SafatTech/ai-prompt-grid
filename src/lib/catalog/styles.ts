import { seedStyles } from "./seed-styles";
import type { CatalogStyle } from "./types";

export type {
  CatalogStyle,
  EditIntent,
  ExamplePair,
  InputRequirement,
  PromptVariant,
  PublishStatus,
  StyleSubject,
} from "./types";

export type { StyleProfile } from "./style-profile";
export { getStyleProfile } from "./style-profile";

export {
  categories,
  filterGroups,
  groupLabels,
} from "./filter-constants";

/** All seed rows. Prefer listPublishedStyles() (async) for guest catalog UI. */
export const styles: CatalogStyle[] = seedStyles;

/** Sync seed helper for tests and offline fallback. Prefer listPublishedStyles(). */
export function getPublishedStyles(): CatalogStyle[] {
  return seedStyles.filter((style) => style.status === "published");
}

export function getStyleById(id: string): CatalogStyle | undefined {
  return seedStyles.find((style) => style.id === id);
}

export function getPublishedStyleById(id: string): CatalogStyle | undefined {
  const style = getStyleById(id);
  return style?.status === "published" ? style : undefined;
}
