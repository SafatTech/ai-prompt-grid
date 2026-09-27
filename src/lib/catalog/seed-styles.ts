import { seedEditorialStyles } from "./seed-editorial-styles";
import { seedEditorialStyles10to30 } from "./seed-editorial-styles-10-30";
import { seedGroupStyles } from "./seed-group-styles";
import { seedPetStyles } from "./seed-pet-styles";
import { seedPlaceStyles } from "./seed-place-styles";
import { seedProductStyles } from "./seed-product-styles";
import type { CatalogStyle } from "./types";

/**
 * Published catalog seed =
 * person 1–30 + product 1–10 + group 1–10 + place 1–10 + pet 1–9.
 */
export const seedStyles: CatalogStyle[] = [
  ...seedEditorialStyles,
  ...seedEditorialStyles10to30,
  ...seedProductStyles,
  ...seedGroupStyles,
  ...seedPlaceStyles,
  ...seedPetStyles,
];
