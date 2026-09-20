/**
 * Seed the Supabase catalog from static seedStyles.
 *
 * Usage:
 *   cp .env.example .env.local   # fill URL + anon + service role
 *   npx tsx --env-file=.env.local scripts/seed-catalog.ts
 *
 * Requires migrations applied first (supabase db push / SQL editor).
 */

import { createHash } from "node:crypto";
import { createClient, type SupabaseClient } from "@supabase/supabase-js";
import { seedStyles } from "../src/lib/catalog/seed-styles";
import type { CatalogStyle } from "../src/lib/catalog/types";

/** Untyped until generated Database types land; schema is defined in SQL migrations. */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
type SeedClient = SupabaseClient<any>;

function requireEnv(name: string): string {
  const value = process.env[name];
  if (!value) {
    throw new Error(`Missing required env: ${name}`);
  }
  return value;
}

function uuidFromKey(key: string): string {
  const hash = createHash("sha256").update(`ai-prompt-grid:${key}`).digest("hex");
  const chars = hash.slice(0, 32).split("");
  chars[12] = "5";
  const variant = (parseInt(chars[16], 16) & 0x3) | 0x8;
  chars[16] = variant.toString(16);
  const h = chars.join("");
  return `${h.slice(0, 8)}-${h.slice(8, 12)}-${h.slice(12, 16)}-${h.slice(16, 20)}-${h.slice(20, 32)}`;
}

function slugify(value: string): string {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

async function upsertCategory(
  client: SeedClient,
  name: string,
  sortOrder: number,
) {
  const slug = slugify(name);
  const id = uuidFromKey(`category:${slug}`);
  const { error } = await client.from("categories").upsert(
    { id, name, slug, sort_order: sortOrder },
    { onConflict: "slug" },
  );
  if (error) throw error;
  return { id, name, slug };
}

async function seedStyle(
  client: SeedClient,
  style: CatalogStyle,
  categoryId: string,
) {
  const styleId = uuidFromKey(`style:${style.id}`);

  const { error: styleError } = await client.from("styles").upsert(
    {
      id: styleId,
      slug: style.id,
      title: style.title,
      category_id: categoryId,
      summary: style.note,
      description: style.description,
      supported_subjects: [style.subject],
      edit_intent: style.intent,
      input_requirement: style.requirement,
      photo_requirements: { best: style.bestSourcePhoto },
      preservation_targets: style.stays,
      change_targets: style.changes,
      target_source_photo: style.targetSourcePhoto,
      card_height: style.height,
      save_count: style.saved,
      status: style.status,
      published_at: style.status === "published" ? new Date().toISOString() : null,
    },
    { onConflict: "slug" },
  );
  if (styleError) throw styleError;

  const variantId = uuidFromKey(`variant:${style.promptVariant.id}`);
  await client.from("prompt_variants").delete().eq("style_id", styleId);

  const { error: variantError } = await client.from("prompt_variants").insert({
    id: variantId,
    style_id: styleId,
    tool: style.promptVariant.tool,
    mode: style.promptVariant.mode,
    input_image_count: style.promptVariant.inputImageCount,
    input_image_roles: style.promptVariant.inputImageRoles,
    version: style.promptVariant.version,
    template: style.promptVariant.template,
    variables: { defaults: style.promptVariant.defaults },
    settings: {},
    test_record: {
      lastVerified: style.promptVariant.lastVerified,
      limitations: style.promptVariant.limitations,
    },
    is_primary: true,
    status: "published",
  });
  if (variantError) throw variantError;

  await client.from("style_assets").delete().eq("style_id", styleId);

  const assets = [
    {
      id: uuidFromKey(`asset:${style.id}:card`),
      style_id: styleId,
      kind: "card_pair",
      source_storage_key: style.source,
      result_storage_key: style.result,
      alt_text: `${style.title} card pair`,
      provenance: { source: "seed", licence: "placeholder" },
      sort_order: 0,
    },
    ...style.examplePairs.map((pair, index) => ({
      id: uuidFromKey(`asset:${style.id}:ex:${index + 1}`),
      style_id: styleId,
      kind: "example_pair",
      source_storage_key: pair.source,
      result_storage_key: pair.result,
      alt_text: pair.altSource,
      provenance: { source: "seed", licence: "placeholder" },
      sort_order: index + 1,
    })),
  ];

  const { error: assetsError } = await client.from("style_assets").insert(assets);
  if (assetsError) throw assetsError;

  // Subject / intent / tool tags for future filtering facets
  const tagSpecs = [
    { name: style.subject, kind: "subject" },
    { name: style.intent, kind: "intent" },
    { name: style.tool, kind: "tool" },
  ] as const;

  for (const tag of tagSpecs) {
    const tagSlug = slugify(`${tag.kind}-${tag.name}`);
    const tagId = uuidFromKey(`tag:${tagSlug}`);
    const { error: tagError } = await client.from("tags").upsert(
      { id: tagId, name: tag.name, slug: tagSlug, kind: tag.kind },
      { onConflict: "slug" },
    );
    if (tagError) throw tagError;

    const { error: linkError } = await client.from("style_tags").upsert(
      { style_id: styleId, tag_id: tagId },
      { onConflict: "style_id,tag_id" },
    );
    if (linkError) throw linkError;
  }
}

async function main() {
  const url = requireEnv("NEXT_PUBLIC_SUPABASE_URL");
  const serviceRoleKey = requireEnv("SUPABASE_SERVICE_ROLE_KEY");

  const client: SeedClient = createClient(url, serviceRoleKey, {
    auth: { autoRefreshToken: false, persistSession: false },
  });

  const categoryNames = [...new Set(seedStyles.map((s) => s.category))];
  const categoryIds = new Map<string, string>();

  for (let i = 0; i < categoryNames.length; i++) {
    const cat = await upsertCategory(client, categoryNames[i]!, i);
    categoryIds.set(cat.name, cat.id);
  }

  for (const style of seedStyles) {
    const categoryId = categoryIds.get(style.category);
    if (!categoryId) throw new Error(`Missing category for ${style.id}`);
    await seedStyle(client, style, categoryId);
    console.log(`Seeded ${style.id}`);
  }

  console.log(`Done. Seeded ${seedStyles.length} styles.`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
