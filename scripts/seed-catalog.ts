/**
 * Seed the Supabase catalog from static seedStyles.
 *
 * Usage:
 *   npx tsx --env-file=.env.local scripts/seed-catalog.ts
 *
 * Local `/catalog/...` asset paths are uploaded to catalog-public (WebP),
 * same pipeline as admin upload, then stored as public URLs on style_assets.
 */

import { createHash } from "node:crypto";
import fs from "node:fs";
import path from "node:path";
import { createClient, type SupabaseClient } from "@supabase/supabase-js";
import { processUploadImage } from "../src/lib/creations/image";
import {
  eightiesAssetProvenance,
  eightiesStyleIds,
} from "../src/lib/catalog/seed-80s-styles";
import { seedStyles } from "../src/lib/catalog/seed-styles";
import type { CatalogStyle } from "../src/lib/catalog/types";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type SeedClient = SupabaseClient<any>;

const CATALOG_BUCKET = "catalog-public";
const ROOT = path.resolve(import.meta.dirname, "..");

function requireEnv(name: string): string {
  const value = process.env[name];
  if (!value) throw new Error(`Missing required env: ${name}`);
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

function isRemoteCatalogUrl(url: string): boolean {
  return (
    /^https?:\/\//i.test(url) && url.includes("/storage/v1/object/public/catalog-public/")
  );
}

async function ensureCatalogBucket(client: SeedClient) {
  const { data: buckets, error: listError } = await client.storage.listBuckets();
  if (listError) throw listError;
  if ((buckets ?? []).some((b) => b.name === CATALOG_BUCKET)) return;

  const { error: createError } = await client.storage.createBucket(CATALOG_BUCKET, {
    public: true,
    fileSizeLimit: "10MB",
    allowedMimeTypes: ["image/jpeg", "image/png", "image/webp"],
  });
  if (createError && !/already exists/i.test(createError.message)) {
    throw createError;
  }
  console.log(`Created storage bucket ${CATALOG_BUCKET}`);
}

async function resolveAssetUrl(
  client: SeedClient,
  assetUrl: string,
  cache: Map<string, string>,
): Promise<string> {
  if (!assetUrl) return assetUrl;
  if (isRemoteCatalogUrl(assetUrl) || /^https?:\/\//i.test(assetUrl)) {
    return assetUrl;
  }
  if (cache.has(assetUrl)) return cache.get(assetUrl)!;
  if (!assetUrl.startsWith("/catalog/")) return assetUrl;

  const localPath = path.join(ROOT, "public", assetUrl.replace(/^\//, ""));
  if (!fs.existsSync(localPath)) {
    throw new Error(`Missing catalog file for seed: ${localPath}`);
  }

  const input = fs.readFileSync(localPath);
  const processed = await processUploadImage(input, "image/png");
  if (!processed.ok) throw new Error(`${localPath}: ${processed.error}`);

  const cleaned = assetUrl.replace(/^\//, "").replace(/\.[^.]+$/, "");
  const key = `seed/${cleaned}.${processed.image.ext}`;
  const { error: uploadError } = await client.storage
    .from(CATALOG_BUCKET)
    .upload(key, processed.image.buffer, {
      contentType: processed.image.contentType,
      upsert: true,
    });
  if (uploadError) {
    throw new Error(`Upload failed for ${key}: ${uploadError.message}`);
  }

  const { data } = client.storage.from(CATALOG_BUCKET).getPublicUrl(key);
  cache.set(assetUrl, data.publicUrl);
  return data.publicUrl;
}

async function upsertCategory(client: SeedClient, name: string, sortOrder: number) {
  const slug = slugify(name);
  const id = uuidFromKey(`category:${slug}`);
  const { error } = await client
    .from("categories")
    .upsert({ id, name, slug, sort_order: sortOrder }, { onConflict: "slug" });
  if (error) throw error;
  return { id, name, slug };
}

async function seedStyle(
  client: SeedClient,
  style: CatalogStyle,
  categoryId: string,
  assetCache: Map<string, string>,
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

  const cardSource = await resolveAssetUrl(client, style.source, assetCache);
  const cardResult = await resolveAssetUrl(client, style.result, assetCache);
  const cardSourceAlt = style.examplePairs[0]?.altSource ?? `${style.title} source`;
  const cardResultAlt = style.examplePairs[0]?.altResult ?? `${style.title} result`;

  const assets = [
    {
      id: uuidFromKey(`asset:${style.id}:card`),
      style_id: styleId,
      kind: "card_pair",
      source_storage_key: cardSource,
      result_storage_key: cardResult,
      alt_text: eightiesStyleIds.has(style.id)
        ? cardSourceAlt
        : `${style.title} card pair`,
      provenance: provenanceFor(style, cardSourceAlt, cardResultAlt),
      sort_order: 0,
    },
  ];

  for (let index = 0; index < style.examplePairs.length; index++) {
    const pair = style.examplePairs[index]!;
    assets.push({
      id: uuidFromKey(`asset:${style.id}:ex:${index + 1}`),
      style_id: styleId,
      kind: "example_pair",
      source_storage_key: await resolveAssetUrl(client, pair.source, assetCache),
      result_storage_key: await resolveAssetUrl(client, pair.result, assetCache),
      alt_text: pair.altSource,
      provenance: provenanceFor(style, pair.altSource, pair.altResult),
      sort_order: index + 1,
    });
  }

  const { error: assetsError } = await client.from("style_assets").insert(assets);
  if (assetsError) throw assetsError;

  const tagSpecs = [
    { name: style.subject, kind: "subject" },
    { name: style.intent, kind: "intent" },
    { name: style.tool, kind: "tool" },
  ] as const;

  for (const tag of tagSpecs) {
    const tagSlug = slugify(`${tag.kind}-${tag.name}`);
    const tagId = uuidFromKey(`tag:${tagSlug}`);
    const { error: tagError } = await client
      .from("tags")
      .upsert(
        { id: tagId, name: tag.name, slug: tagSlug, kind: tag.kind },
        { onConflict: "slug" },
      );
    if (tagError) throw tagError;

    const { error: linkError } = await client
      .from("style_tags")
      .upsert({ style_id: styleId, tag_id: tagId }, { onConflict: "style_id,tag_id" });
    if (linkError) throw linkError;
  }
}

function provenanceFor(style: CatalogStyle, altSource: string, altResult: string) {
  if (!eightiesStyleIds.has(style.id)) {
    return { source: "seed", licence: "catalog" };
  }
  return {
    ...eightiesAssetProvenance,
    altSource,
    altResult,
  };
}

async function main() {
  const url = requireEnv("NEXT_PUBLIC_SUPABASE_URL");
  const serviceRoleKey = requireEnv("SUPABASE_SERVICE_ROLE_KEY");

  const client: SeedClient = createClient(url, serviceRoleKey, {
    auth: { autoRefreshToken: false, persistSession: false },
  });

  await ensureCatalogBucket(client);

  const categoryNames = [...new Set(seedStyles.map((s) => s.category))];
  const categoryIds = new Map<string, string>();
  const assetCache = new Map<string, string>();

  for (let i = 0; i < categoryNames.length; i++) {
    const cat = await upsertCategory(client, categoryNames[i]!, i);
    categoryIds.set(cat.name, cat.id);
  }

  const only = process.argv
    .find((arg) => arg.startsWith("--only="))
    ?.slice("--only=".length);
  const stylesToSeed =
    only === "80s"
      ? seedStyles.filter((style) => eightiesStyleIds.has(style.id))
      : seedStyles;

  for (const style of stylesToSeed) {
    const categoryId = categoryIds.get(style.category);
    if (!categoryId) throw new Error(`Missing category for ${style.id}`);
    await seedStyle(client, style, categoryId, assetCache);
    console.log(`Seeded ${style.id}`);
  }

  if (only) {
    console.log(`Done. Seeded ${stylesToSeed.length} styles (--only=${only}).`);
    return;
  }

  const keepSlugs = seedStyles.map((s) => s.id);
  const { data: existing, error: listError } = await client
    .from("styles")
    .select("id, slug");
  if (listError) throw listError;

  const keep = new Set(keepSlugs);
  const orphans = (existing ?? []).filter(
    (row: { id: string; slug: string }) => !keep.has(row.slug),
  );

  for (const orphan of orphans) {
    await client.from("creations").delete().eq("style_id", orphan.id);
    await client.from("style_tags").delete().eq("style_id", orphan.id);
    await client.from("style_assets").delete().eq("style_id", orphan.id);
    await client.from("prompt_variants").delete().eq("style_id", orphan.id);
    const { error: deleteError } = await client
      .from("styles")
      .delete()
      .eq("id", orphan.id);
    if (deleteError) throw deleteError;
    console.log(`Removed orphan style ${orphan.slug}`);
  }

  console.log(
    `Done. Seeded ${seedStyles.length} styles; removed ${orphans.length} orphans; catalog uploads ${assetCache.size}.`,
  );
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
