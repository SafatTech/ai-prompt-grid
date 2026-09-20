import { z } from "zod";
import {
  backgroundSchema,
  editIntentSchema,
  inputRequirementSchema,
  moodSchema,
  promptOptionsSchema,
  ratioSchema,
  styleSubjectSchema,
} from "@/lib/catalog/schemas";
import { categories, filterGroups } from "@/lib/catalog/styles";

export const adminStyleStatusSchema = z.object({
  status: z.enum(["draft", "in_review", "published", "archived"]),
});

export const styleSlugSchema = z
  .string()
  .min(2)
  .max(80)
  .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, {
    message: "Slug must be lowercase letters, numbers, and hyphens only.",
  });

const KNOWN_PLACEHOLDERS = new Set([
  "mood",
  "background",
  "ratio",
  "preserve",
  "subject",
]);

export function findUnknownPlaceholders(template: string): string[] {
  const found = new Set<string>();
  const re = /\{\{([a-zA-Z]+)\}\}/g;
  let match: RegExpExecArray | null;
  while ((match = re.exec(template)) !== null) {
    const name = match[1];
    if (name && !KNOWN_PLACEHOLDERS.has(name)) found.add(name);
  }
  return [...found];
}

export const adminExamplePairSchema = z.object({
  sourceUrl: z.string().url().max(2000),
  resultUrl: z.string().url().max(2000),
  altSource: z.string().min(1).max(200),
  altResult: z.string().min(1).max(200),
});

export const adminStyleContentSchema = z
  .object({
    title: z.string().min(2).max(120),
    slug: styleSlugSchema,
    category: z.enum(categories),
    subject: styleSubjectSchema,
    intent: editIntentSchema,
    requirement: inputRequirementSchema,
    tool: z.enum(filterGroups.tool),
    note: z.string().min(1).max(240),
    description: z.string().min(1).max(2000),
    bestSourcePhoto: z.array(z.string().min(1).max(200)).min(1).max(12),
    changes: z.array(z.string().min(1).max(80)).min(1).max(12),
    stays: z.array(z.string().min(1).max(80)).min(1).max(12),
    targetSourcePhoto: z.string().min(1).max(240),
    cardHeight: z.number().int().min(240).max(520).optional().default(330),
    cardSourceUrl: z.string().url().max(2000),
    cardResultUrl: z.string().url().max(2000),
    examplePairs: z.array(adminExamplePairSchema).min(2).max(8),
    variant: z.object({
      tool: z.enum(filterGroups.tool),
      mode: z.string().min(1).max(120),
      version: z.string().min(1).max(40),
      template: z.string().min(20).max(20_000),
      defaults: promptOptionsSchema,
      limitations: z.array(z.string().min(1).max(240)).min(1).max(12),
      lastVerified: z.string().min(1).max(40),
      inputImageCount: z.number().int().min(1).max(4).optional().default(1),
      inputImageRoles: z
        .array(z.string().min(1).max(80))
        .min(1)
        .max(4)
        .optional()
        .default(["source photo"]),
    }),
  })
  .superRefine((data, ctx) => {
    const unknown = findUnknownPlaceholders(data.variant.template);
    if (unknown.length) {
      ctx.addIssue({
        code: "custom",
        path: ["variant", "template"],
        message: `Unknown placeholders: ${unknown.map((n) => `{{${n}}}`).join(", ")}. Allowed: {{mood}}, {{background}}, {{ratio}}, {{preserve}}, {{subject}}.`,
      });
    }
    // Defaults must match global enums (already via promptOptionsSchema)
    void moodSchema;
    void backgroundSchema;
    void ratioSchema;
  });

export type AdminStyleContentInput = z.infer<typeof adminStyleContentSchema>;

export const adminAssetUploadMetaSchema = z.object({
  kind: z.enum(["card_pair", "example_pair"]),
  altText: z.string().min(1).max(200),
  sortOrder: z.number().int().min(0).max(20).optional().default(0),
  provenance: z
    .object({
      owner: z.string().max(200).optional().default(""),
      licence: z.string().max(200).optional().default(""),
      modelRelease: z.boolean().optional().default(false),
      notes: z.string().max(500).optional().default(""),
    })
    .optional()
    .default({ owner: "", licence: "", modelRelease: false, notes: "" }),
});
