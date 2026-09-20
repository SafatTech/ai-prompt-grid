import type { SupabaseClient } from "@supabase/supabase-js";
import type { AdminStyleContentInput } from "@/lib/admin/schemas";
import type { PublishStatus } from "@/lib/catalog/types";
import { promptOptionsSchema } from "@/lib/catalog/schemas";

export type AdminStyleEditorPayload = {
  id: string;
  slug: string;
  title: string;
  status: PublishStatus;
  publishedAt: string | null;
  category: string;
  subject: string;
  intent: string;
  requirement: string;
  tool: string;
  note: string;
  description: string;
  bestSourcePhoto: string[];
  changes: string[];
  stays: string[];
  targetSourcePhoto: string;
  cardHeight: number;
  cardSourceUrl: string;
  cardResultUrl: string;
  examplePairs: Array<{
    id: string;
    sourceUrl: string;
    resultUrl: string;
    altSource: string;
    altResult: string;
  }>;
  variant: {
    id: string;
    tool: string;
    mode: string;
    version: string;
    template: string;
    defaults: {
      mood: string;
      background: string;
      ratio: string;
      keepClothing: boolean;
      keepPose: boolean;
    };
    limitations: string[];
    lastVerified: string;
    inputImageCount: number;
    inputImageRoles: string[];
  };
};

function asRecord(value: unknown): Record<string, unknown> {
  return value && typeof value === "object" && !Array.isArray(value)
    ? (value as Record<string, unknown>)
    : {};
}

function asStringArray(value: unknown): string[] {
  if (!Array.isArray(value)) return [];
  return value.filter((item): item is string => typeof item === "string");
}

export async function listCategories(
  client: SupabaseClient,
): Promise<Array<{ id: string; name: string; slug: string }>> {
  const { data, error } = await client
    .from("categories")
    .select("id, name, slug")
    .order("sort_order", { ascending: true });
  if (error || !data) {
    if (error) console.warn("[admin] categories fetch failed", error.message);
    return [];
  }
  return data as Array<{ id: string; name: string; slug: string }>;
}

export async function fetchAdminStyleBySlug(
  client: SupabaseClient,
  slug: string,
): Promise<AdminStyleEditorPayload | null> {
  const { data, error } = await client
    .from("styles")
    .select(
      "id, slug, title, status, published_at, summary, description, supported_subjects, edit_intent, input_requirement, photo_requirements, preservation_targets, change_targets, target_source_photo, card_height, categories ( name ), prompt_variants ( id, tool, mode, version, template, variables, test_record, input_image_count, input_image_roles, is_primary, status ), style_assets ( id, kind, source_storage_key, result_storage_key, alt_text, sort_order )",
    )
    .eq("slug", slug)
    .maybeSingle();

  if (error || !data) {
    if (error) console.warn("[admin] style fetch failed", error.message);
    return null;
  }

  return mapRowToEditor(data);
}

export async function fetchAdminStyleById(
  client: SupabaseClient,
  id: string,
): Promise<AdminStyleEditorPayload | null> {
  const { data, error } = await client
    .from("styles")
    .select(
      "id, slug, title, status, published_at, summary, description, supported_subjects, edit_intent, input_requirement, photo_requirements, preservation_targets, change_targets, target_source_photo, card_height, categories ( name ), prompt_variants ( id, tool, mode, version, template, variables, test_record, input_image_count, input_image_roles, is_primary, status ), style_assets ( id, kind, source_storage_key, result_storage_key, alt_text, sort_order )",
    )
    .eq("id", id)
    .maybeSingle();

  if (error || !data) {
    if (error) console.warn("[admin] style fetch failed", error.message);
    return null;
  }

  return mapRowToEditor(data);
}

function mapRowToEditor(data: Record<string, unknown>): AdminStyleEditorPayload {
  const categories = data.categories as
    | { name: string }
    | { name: string }[]
    | null;
  const category = Array.isArray(categories)
    ? categories[0]?.name ?? ""
    : categories?.name ?? "";

  const variants = (data.prompt_variants ?? []) as Array<Record<string, unknown>>;
  const primary =
    variants.find((v) => v.is_primary) ?? variants[0] ?? null;
  const variables = asRecord(primary?.variables);
  const defaultsRaw = asRecord(variables.defaults ?? variables);
  const parsedDefaults = promptOptionsSchema.safeParse({
    mood: defaultsRaw.mood ?? "Warm neutral",
    background: defaultsRaw.background ?? "Softly blurred interior",
    ratio: defaultsRaw.ratio ?? "4:5 Portrait",
    keepClothing: defaultsRaw.keepClothing !== false,
    keepPose: defaultsRaw.keepPose !== false,
  });
  const defaults = parsedDefaults.success
    ? parsedDefaults.data
    : {
        mood: "Warm neutral",
        background: "Softly blurred interior",
        ratio: "4:5 Portrait",
        keepClothing: true,
        keepPose: true,
      };

  const test = asRecord(primary?.test_record);
  const photoReq = asRecord(data.photo_requirements);
  const assets = (
    (data.style_assets ?? []) as Array<{
      id: string;
      kind: string;
      source_storage_key: string;
      result_storage_key: string;
      alt_text: string;
      sort_order: number;
    }>
  ).slice().sort((a, b) => a.sort_order - b.sort_order);

  const card =
    assets.find((a) => a.kind === "card_pair") ??
    assets.find((a) => a.kind === "example_pair") ??
    null;
  const examples = assets.filter((a) => a.kind === "example_pair");

  const subjects = asStringArray(data.supported_subjects);

  return {
    id: data.id as string,
    slug: data.slug as string,
    title: data.title as string,
    status: data.status as PublishStatus,
    publishedAt: (data.published_at as string | null) ?? null,
    category,
    subject: subjects[0] ?? "Person",
    intent: (data.edit_intent as string) ?? "",
    requirement: (data.input_requirement as string) ?? "One photo",
    tool: (primary?.tool as string) ?? "",
    note: (data.summary as string) ?? "",
    description: (data.description as string) ?? "",
    bestSourcePhoto: asStringArray(photoReq.best),
    changes: asStringArray(data.change_targets),
    stays: asStringArray(data.preservation_targets),
    targetSourcePhoto: (data.target_source_photo as string) ?? "",
    cardHeight: (data.card_height as number) || 330,
    cardSourceUrl: card?.source_storage_key ?? "",
    cardResultUrl: card?.result_storage_key ?? "",
    examplePairs: examples.map((ex) => ({
      id: ex.id,
      sourceUrl: ex.source_storage_key,
      resultUrl: ex.result_storage_key,
      altSource: ex.alt_text || "Source",
      altResult: ex.alt_text || "Result",
    })),
    variant: {
      id: (primary?.id as string) ?? "",
      tool: (primary?.tool as string) ?? "",
      mode: (primary?.mode as string) ?? "",
      version: (primary?.version as string) ?? "v1",
      template: (primary?.template as string) ?? "",
      defaults,
      limitations: asStringArray(test.limitations),
      lastVerified:
        typeof test.lastVerified === "string" ? test.lastVerified : "",
      inputImageCount: (primary?.input_image_count as number) || 1,
      inputImageRoles: asStringArray(primary?.input_image_roles).length
        ? asStringArray(primary?.input_image_roles)
        : ["source photo"],
    },
  };
}

/** Shape used to prefill the create form from editor payload. */
export function editorPayloadToFormInput(
  payload: AdminStyleEditorPayload,
): AdminStyleContentInput {
  return {
    title: payload.title,
    slug: payload.slug,
    category: payload.category as AdminStyleContentInput["category"],
    subject: payload.subject as AdminStyleContentInput["subject"],
    intent: payload.intent as AdminStyleContentInput["intent"],
    requirement: payload.requirement as AdminStyleContentInput["requirement"],
    tool: payload.tool as AdminStyleContentInput["tool"],
    note: payload.note,
    description: payload.description,
    bestSourcePhoto: payload.bestSourcePhoto,
    changes: payload.changes,
    stays: payload.stays,
    targetSourcePhoto: payload.targetSourcePhoto,
    cardHeight: payload.cardHeight,
    cardSourceUrl: payload.cardSourceUrl,
    cardResultUrl: payload.cardResultUrl,
    examplePairs: payload.examplePairs.map((p) => ({
      sourceUrl: p.sourceUrl,
      resultUrl: p.resultUrl,
      altSource: p.altSource,
      altResult: p.altResult,
    })),
    variant: {
      tool: payload.variant.tool as AdminStyleContentInput["variant"]["tool"],
      mode: payload.variant.mode,
      version: payload.variant.version,
      template: payload.variant.template,
      defaults: payload.variant.defaults as AdminStyleContentInput["variant"]["defaults"],
      limitations: payload.variant.limitations,
      lastVerified: payload.variant.lastVerified,
      inputImageCount: payload.variant.inputImageCount,
      inputImageRoles: payload.variant.inputImageRoles,
    },
  };
}
