import { z } from "zod";

export const styleSubjectSchema = z.enum([
  "Person",
  "Group",
  "Pet",
  "Place",
  "Product or object",
]);

export const editIntentSchema = z.enum([
  "Change lighting",
  "Change background",
  "Artistic restyle",
  "New outfit or theme",
  "Full scene transformation",
]);

export const inputRequirementSchema = z.enum([
  "One photo",
  "Photo plus style reference",
]);

export const publishStatusSchema = z.enum([
  "draft",
  "in_review",
  "published",
  "archived",
]);

export const moodSchema = z.enum([
  "Warm neutral",
  "Deep blue",
  "Soft pastel",
  "Black and white",
  "Warm neutral with luminous gold highlights",
  "Deep charcoal, black, and warm amber",
  "Sunlit warm gold with fresh natural greens",
  "Vintage teal, burnt orange, cream, and faded sepia",
  "Muted espresso, charcoal, and warm amber",
  "Luminous golden-hour warmth",
  "Deep teal shadows with burnt-orange highlights",
  "Rich amber-gold with deep brown shadows",
  "Soft sunlit analog warmth with a slightly faded film look",
]);

export const backgroundSchema = z.enum([
  "Softly blurred interior",
  "Window-lit studio",
  "Minimal cream wall",
  "Keep original background",
  "Upscale softly blurred interior with lateral motion blur",
  "Dark luxury urban interior with a moving blurred crowd",
  "Bright outdoor park with mature trees and colorful floating confetti",
  "Retro roadside diner at sunset with a classic red car",
  "Dim artist studio or reading room beside a textured window",
  "Historic European-style cobblestone city street with soft café details",
  "Dense dark city crowd at blue hour with heavy motion blur",
  "Dark indoor room with strong late-afternoon window shadows",
  "Tree-lined city street with parked cars and subtle street motion blur",
]);

export const ratioSchema = z.enum(["4:5 Portrait", "1:1 Square", "9:16 Story"]);

export const promptOptionsSchema = z.object({
  mood: moodSchema,
  background: backgroundSchema,
  ratio: ratioSchema,
  keepClothing: z.boolean(),
  keepPose: z.boolean(),
});

export type PromptOptionsInput = z.infer<typeof promptOptionsSchema>;

export const exploreQuerySchema = z.object({
  q: z.string().max(120).optional().default(""),
  sort: z.enum(["Trending", "Newest", "Most saved"]).optional().default("Trending"),
  category: z.array(z.string()).optional().default([]),
  subject: z.array(z.string()).optional().default([]),
  intent: z.array(z.string()).optional().default([]),
  requirement: z.array(z.string()).optional().default([]),
  tool: z.array(z.string()).optional().default([]),
});

export type ExploreQuery = z.infer<typeof exploreQuerySchema>;
