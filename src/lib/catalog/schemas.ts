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
]);

export const backgroundSchema = z.enum([
  "Softly blurred interior",
  "Window-lit studio",
  "Minimal cream wall",
  "Keep original background",
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
