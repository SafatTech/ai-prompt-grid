import { seedEditorialStyles } from "./seed-editorial-styles";
import { seedEditorialStyles10to30 } from "./seed-editorial-styles-10-30";
import type { CatalogStyle } from "./types";

/**
 * Published catalog seed = editorial templates 1–30 only.
 * Prototype Picsum placeholders were removed.
 */
export const seedStyles: CatalogStyle[] = [
  ...seedEditorialStyles,
  ...seedEditorialStyles10to30,
];
