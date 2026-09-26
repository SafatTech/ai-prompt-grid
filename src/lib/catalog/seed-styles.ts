import { seedEditorialStyles } from "./seed-editorial-styles";
import { seedEditorialStyles10to30 } from "./seed-editorial-styles-10-30";
import { seedGroupStyles } from "./seed-group-styles";
import { seedProductStyles } from "./seed-product-styles";
import type { CatalogStyle } from "./types";

/**
 * Published catalog seed = person editorial 1–30 + product 1–10 + group 1–10.
 */
export const seedStyles: CatalogStyle[] = [
  ...seedEditorialStyles,
  ...seedEditorialStyles10to30,
  ...seedProductStyles,
  ...seedGroupStyles,
];
