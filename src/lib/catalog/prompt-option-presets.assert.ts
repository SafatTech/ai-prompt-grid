import { backgroundSchema, moodSchema } from "./schemas";
import { categories } from "./filter-constants";
import {
  categoryBackgroundPresets,
  categoryMoodPresets,
} from "./prompt-option-presets";

/** Dev/test helper: ensure preset values exist in the schema enums. */
export function assertPresetValuesInSchema(): void {
  const moodSet = new Set<string>(moodSchema.options);
  const backgroundSet = new Set<string>(backgroundSchema.options);

  for (const category of categories) {
    for (const mood of categoryMoodPresets[category]) {
      if (!moodSet.has(mood)) {
        throw new Error(`Unknown mood preset for ${category}: ${mood}`);
      }
    }
    for (const background of categoryBackgroundPresets[category]) {
      if (!backgroundSet.has(background)) {
        throw new Error(`Unknown background preset for ${category}: ${background}`);
      }
    }
  }
}
