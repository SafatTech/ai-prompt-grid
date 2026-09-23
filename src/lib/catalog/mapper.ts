import type {
  CatalogStyle,
  EditIntent,
  ExamplePair,
  InputRequirement,
  PromptVariant,
  PublishStatus,
  StyleSubject,
} from "./types";

const SUBJECTS = new Set<StyleSubject>([
  "Person",
  "Group",
  "Pet",
  "Place",
  "Product or object",
]);

const INTENTS = new Set<EditIntent>([
  "Change lighting",
  "Change background",
  "Artistic restyle",
  "New outfit or theme",
  "Full scene transformation",
]);

const REQUIREMENTS = new Set<InputRequirement>([
  "One photo",
  "Photo plus style reference",
]);

const STATUSES = new Set<PublishStatus>([
  "draft",
  "in_review",
  "published",
  "archived",
]);

export type DbCategory = {
  name: string;
  slug: string;
};

export type DbPromptVariant = {
  id: string;
  tool: string;
  mode: string;
  input_image_count: number;
  input_image_roles: unknown;
  version: string;
  template: string;
  variables: unknown;
  test_record: unknown;
  is_primary: boolean;
  status: string;
};

export type DbStyleAsset = {
  id: string;
  kind: string;
  source_storage_key: string;
  result_storage_key: string;
  alt_text: string;
  sort_order: number;
};

export type DbStyleRow = {
  id: string;
  slug: string;
  title: string;
  summary: string;
  description: string;
  supported_subjects: string[] | null;
  edit_intent: string;
  input_requirement: string;
  photo_requirements: unknown;
  preservation_targets: string[] | null;
  change_targets: string[] | null;
  target_source_photo: string;
  card_height: number;
  save_count: number;
  status: string;
  categories: DbCategory | DbCategory[] | null;
  prompt_variants: DbPromptVariant[] | null;
  style_assets: DbStyleAsset[] | null;
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

function resolveAssetUrl(key: string, publicBaseUrl: string | null): string {
  if (!key) return "";
  if (/^https?:\/\//i.test(key)) return key;
  // App-public paths (e.g. /catalog/editorial/source-01.png) stay site-relative.
  if (key.startsWith("/")) return key;
  if (!publicBaseUrl) return key;
  const base = publicBaseUrl.replace(/\/$/, "");
  return `${base}/storage/v1/object/public/catalog-public/${key.replace(/^\//, "")}`;
}

function pickCategoryName(row: DbStyleRow): string {
  const cat = row.categories;
  if (Array.isArray(cat)) return cat[0]?.name ?? "";
  return cat?.name ?? "";
}

function pickPrimaryVariant(variants: DbPromptVariant[] | null): DbPromptVariant | null {
  if (!variants?.length) return null;
  return variants.find((v) => v.is_primary) ?? variants[0] ?? null;
}

function mapSubject(raw: string[] | null): StyleSubject {
  const first = raw?.[0];
  if (first && SUBJECTS.has(first as StyleSubject)) return first as StyleSubject;
  return "Person";
}

function mapIntent(raw: string): EditIntent {
  if (INTENTS.has(raw as EditIntent)) return raw as EditIntent;
  return "Artistic restyle";
}

function mapRequirement(raw: string): InputRequirement {
  if (REQUIREMENTS.has(raw as InputRequirement)) return raw as InputRequirement;
  return "One photo";
}

function mapStatus(raw: string): PublishStatus {
  if (STATUSES.has(raw as PublishStatus)) return raw as PublishStatus;
  return "draft";
}

function mapPromptVariant(row: DbPromptVariant): PromptVariant {
  const variables = asRecord(row.variables);
  const test = asRecord(row.test_record);
  const defaults = asRecord(variables.defaults ?? variables);

  return {
    id: row.id,
    version: row.version,
    tool: row.tool,
    mode: row.mode,
    inputImageCount: row.input_image_count,
    inputImageRoles: asStringArray(row.input_image_roles),
    template: row.template,
    defaults: {
      mood: typeof defaults.mood === "string" ? defaults.mood : "Warm neutral",
      background:
        typeof defaults.background === "string"
          ? defaults.background
          : "Softly blurred interior",
      ratio: typeof defaults.ratio === "string" ? defaults.ratio : "4:5 Portrait",
      keepClothing: defaults.keepClothing !== false,
      keepPose: defaults.keepPose !== false,
    },
    lastVerified:
      typeof test.lastVerified === "string" ? test.lastVerified : "",
    limitations: asStringArray(test.limitations),
  };
}

function mapExamplePairs(
  assets: DbStyleAsset[] | null,
  publicBaseUrl: string | null,
): ExamplePair[] {
  const pairs = (assets ?? [])
    .filter((a) => a.kind === "example_pair" || a.kind === "card_pair")
    .sort((a, b) => a.sort_order - b.sort_order);

  const examples = pairs.filter((a) => a.kind === "example_pair");
  const source = examples.length > 0 ? examples : pairs;

  return source.map((asset, index) => ({
    source: resolveAssetUrl(asset.source_storage_key, publicBaseUrl),
    result: resolveAssetUrl(asset.result_storage_key, publicBaseUrl),
    altSource: asset.alt_text || `Source example ${index + 1}`,
    altResult: asset.alt_text || `Result example ${index + 1}`,
  }));
}

function mapCardMedia(
  assets: DbStyleAsset[] | null,
  publicBaseUrl: string | null,
): { source: string; result: string } {
  const list = assets ?? [];
  const card =
    list.find((a) => a.kind === "card_pair") ??
    list.find((a) => a.kind === "example_pair") ??
    null;

  if (!card) return { source: "", result: "" };
  return {
    source: resolveAssetUrl(card.source_storage_key, publicBaseUrl),
    result: resolveAssetUrl(card.result_storage_key, publicBaseUrl),
  };
}

/**
 * Maps a joined styles row from Supabase into the app CatalogStyle shape.
 * `CatalogStyle.id` stays the public slug for URL compatibility.
 */
export function mapDbStyleToCatalog(
  row: DbStyleRow,
  publicBaseUrl: string | null = null,
): CatalogStyle | null {
  const variantRow = pickPrimaryVariant(row.prompt_variants);
  if (!variantRow) return null;

  const photoReq = asRecord(row.photo_requirements);
  const best = asStringArray(photoReq.best);
  const card = mapCardMedia(row.style_assets, publicBaseUrl);
  const examplePairs = mapExamplePairs(row.style_assets, publicBaseUrl);
  const promptVariant = mapPromptVariant(variantRow);

  return {
    id: row.slug,
    title: row.title,
    category: pickCategoryName(row),
    subject: mapSubject(row.supported_subjects),
    intent: mapIntent(row.edit_intent),
    requirement: mapRequirement(row.input_requirement),
    tool: promptVariant.tool,
    note: row.summary,
    height: row.card_height || 330,
    saved: row.save_count || 0,
    source: card.source,
    result: card.result,
    description: row.description,
    status: mapStatus(row.status),
    bestSourcePhoto: best,
    changes: row.change_targets ?? [],
    stays: row.preservation_targets ?? [],
    targetSourcePhoto: row.target_source_photo,
    examplePairs:
      examplePairs.length > 0
        ? examplePairs
        : [
            {
              source: card.source,
              result: card.result,
              altSource: `${row.title} source`,
              altResult: `${row.title} result`,
            },
          ],
    promptVariant,
  };
}
