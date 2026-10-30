import { seedAnimeStyles } from "./seed-anime-styles";
import { seedBirthdayStyles } from "./seed-birthday-styles";
import { seedBoysStyles } from "./seed-boys-styles";
import { seedCharacterStyles } from "./seed-character-styles";
import { seedChristmasStyles } from "./seed-christmas-styles";
import { seedDiwaliStyles } from "./seed-diwali-styles";
import { seedEightiesStyles } from "./seed-80s-styles";
import { seedLinkedinStyles } from "./seed-linkedin-styles";
import { seedLuxuryLifestyleStyles } from "./seed-luxury-lifestyle-styles";
import { seedMergeStyles } from "./seed-merge-styles";
import { seedWinterStyles } from "./seed-winter-styles";
import { seedEditorialStyles } from "./seed-editorial-styles";
import { seedEditorialStyles10to30 } from "./seed-editorial-styles-10-30";
import { seedGroupStyles } from "./seed-group-styles";
import { seedHalloweenStyles } from "./seed-halloween-styles";
import { seedPetStyles } from "./seed-pet-styles";
import { seedPlaceStyles } from "./seed-place-styles";
import { seedProductStyles } from "./seed-product-styles";
import { seedStylishStyles } from "./seed-stylish-styles";
import type { CatalogStyle } from "./types";

/**
 * Published catalog seed =
 * person/group/pet editorial 1–258 (Halloween 31–35 + Diwali 36–47 + 1980s 48–59 + LinkedIn 60–74 + merge 75–86 + winter 87–98 + anime 99–110 + birthday 111–122 + boys 123–134 + Christmas 135–146 + character styles 147–222 + Stylish 223–236 + Luxury Lifestyle 237–249 + Diwali add-on 250–258)
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
  ...seedWinterStyles,
  ...seedAnimeStyles,
  ...seedBirthdayStyles,
  ...seedBoysStyles,
  ...seedChristmasStyles,
  ...seedCharacterStyles,
  ...seedStylishStyles,
  ...seedLuxuryLifestyleStyles,
  ...seedProductStyles,
  ...seedGroupStyles,
  ...seedPlaceStyles,
  ...seedPetStyles,
];
