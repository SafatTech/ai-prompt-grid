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

export type StyleProfile = {
  description: string;
  best: string[];
  changes: string[];
  stays: string[];
};

export const categories = [
  "Cinematic",
  "Anime",
  "Painting",
  "Vintage",
  "Professional portraits",
  "Fantasy",
  "Pets",
  "Travel",
  "3D avatars",
  "Product and objects",
] as const;

export const filterGroups = {
  category: [...categories],
  subject: ["Person", "Group", "Pet", "Place", "Product or object"] as const,
  intent: [
    "Change lighting",
    "Change background",
    "Artistic restyle",
    "New outfit or theme",
    "Full scene transformation",
  ] as const,
  requirement: ["One photo", "Photo plus style reference"] as const,
  tool: ["ChatGPT Image", "Gemini", "Flux", "Other AI editor"] as const,
};

export const groupLabels: Record<keyof typeof filterGroups, string> = {
  category: "Category",
  subject: "Photo subject",
  intent: "Edit intent",
  requirement: "Input requirement",
  tool: "Tested with",
};

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

export function getStyleProfile(style: CatalogStyle): StyleProfile {
  return {
    description: style.description,
    best: style.bestSourcePhoto,
    changes: style.changes,
    stays: style.stays,
  };
}
