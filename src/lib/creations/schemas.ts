import { z } from "zod";
import { MAX_NOTES_LENGTH } from "@/lib/creations/constants";

export const createCreationFieldsSchema = z.object({
  styleSlug: z.string().min(1).max(120),
  notes: z.string().max(MAX_NOTES_LENGTH).optional().default(""),
  promptSnapshot: z.string().min(1).max(20_000),
});

export const patchCreationSchema = z.object({
  removeSource: z.literal(true),
});
