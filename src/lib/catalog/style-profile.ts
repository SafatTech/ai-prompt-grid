import type { CatalogStyle } from "./types";

export type StyleProfile = {
  description: string;
  best: string[];
  changes: string[];
  stays: string[];
};

/** Derive profile fields from a style already in hand (no catalog lookup). */
export function getStyleProfile(style: CatalogStyle): StyleProfile {
  return {
    description: style.description,
    best: style.bestSourcePhoto,
    changes: style.changes,
    stays: style.stays,
  };
}
