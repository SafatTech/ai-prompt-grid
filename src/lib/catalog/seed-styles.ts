import { seedDiwaliStyles } from "./seed-diwali-styles";
import { seedEightiesStyles } from "./seed-80s-styles";
import { seedLinkedinStyles } from "./seed-linkedin-styles";
import { seedMergeStyles } from "./seed-merge-styles";
import { seedEditorialStyles } from "./seed-editorial-styles";
import { seedEditorialStyles10to30 } from "./seed-editorial-styles-10-30";
import { seedGroupStyles } from "./seed-group-styles";
import { seedHalloweenStyles } from "./seed-halloween-styles";
import { seedPetStyles } from "./seed-pet-styles";
import { seedPlaceStyles } from "./seed-place-styles";
import { seedProductStyles } from "./seed-product-styles";
import type { CatalogStyle } from "./types";

/**
 * Published catalog seed =
 * person/group editorial 1–86 (Halloween 31–35 + Diwali 36–47 + 1980s 48–59 + LinkedIn 60–74 + merge 75–86)
 * + product 1–10 + group 1–10 + place 1–10 + pet 1–9.
 */
export const seedStyles: CatalogStyle[] = [
  ...seedEditorialStyles,
  ...seedEditorialStyles10to30,
  ...seedHalloweenStyles,
  ...seedDiwaliStyles,
  ...seedEightiesStyles,
  ...seedLinkedinStyles,
  ...seedMergeStyles,
  ...seedProductStyles,
  ...seedGroupStyles,
  ...seedPlaceStyles,
  ...seedPetStyles,
];
