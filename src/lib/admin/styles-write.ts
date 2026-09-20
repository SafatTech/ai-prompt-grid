import { randomUUID } from "node:crypto";
import type { SupabaseClient } from "@supabase/supabase-js";
import type { AdminStyleContentInput } from "@/lib/admin/schemas";
import type { AdminStyleEditorPayload } from "@/lib/admin/styles-read";
import { fetchAdminStyleById } from "@/lib/admin/styles-read";

function slugify(value: string): string {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

async function resolveCategoryId(
  client: SupabaseClient,
  categoryName: string,
): Promise<string | null> {
  const { data, error } = await client
    .from("categories")
    .select("id")
    .eq("name", categoryName)
    .maybeSingle();
  if (error || !data) {
    if (error) console.warn("[admin] category resolve failed", error.message);
    return null;
  }
  return data.id as string;
}

async function upsertStyleTags(
  client: SupabaseClient,
  styleId: string,
  input: AdminStyleContentInput,
) {
  await client.from("style_tags").delete().eq("style_id", styleId);

  const tagSpecs = [
    { name: input.subject, kind: "subject" },
    { name: input.intent, kind: "intent" },
    { name: input.variant.tool, kind: "tool" },
  ] as const;

  for (const tag of tagSpecs) {
    const tagSlug = slugify(`${tag.kind}-${tag.name}`);
    const { data: existing } = await client
      .from("tags")
      .select("id")
      .eq("slug", tagSlug)
      .maybeSingle();

    let tagId = existing?.id as string | undefined;
    if (!tagId) {
      const { data: inserted, error } = await client
        .from("tags")
        .insert({
          id: randomUUID(),
          name: tag.name,
          slug: tagSlug,
          kind: tag.kind,
        })
        .select("id")
        .single();
      if (error || !inserted) {
        console.warn("[admin] tag insert failed", error?.message);
        continue;
      }
      tagId = inserted.id as string;
    }

    await client.from("style_tags").upsert(
      { style_id: styleId, tag_id: tagId },
      { onConflict: "style_id,tag_id" },
    );
  }
}

async function replaceAssets(
  client: SupabaseClient,
  styleId: string,
  input: AdminStyleContentInput,
  provenance: Record<string, unknown>,
) {
  await client.from("style_assets").delete().eq("style_id", styleId);

  const assets = [
    {
      id: randomUUID(),
      style_id: styleId,
      kind: "card_pair",
      source_storage_key: input.cardSourceUrl,
      result_storage_key: input.cardResultUrl,
      alt_text: `${input.title} card pair`,
      provenance,
      sort_order: 0,
    },
    ...input.examplePairs.map((pair, index) => ({
      id: randomUUID(),
      style_id: styleId,
      kind: "example_pair",
      source_storage_key: pair.sourceUrl,
      result_storage_key: pair.resultUrl,
      alt_text: pair.altSource,
      provenance,
      sort_order: index + 1,
    })),
  ];

  const { error } = await client.from("style_assets").insert(assets);
  if (error) throw new Error(error.message);
}

async function writeAudit(
  client: SupabaseClient,
  actorId: string,
  action: string,
  entityId: string,
  payload: Record<string, unknown>,
) {
  const { error } = await client.from("audit_logs").insert({
    actor_id: actorId,
    action,
    entity_type: "style",
    entity_id: entityId,
    payload,
  });
  if (error) console.warn("[admin] audit failed", error.message);
}

export type WriteStyleResult =
  | { ok: true; style: AdminStyleEditorPayload }
  | { ok: false; error: string; status: number };

export async function createAdminStyle(
  client: SupabaseClient,
  actorId: string,
  input: AdminStyleContentInput,
): Promise<WriteStyleResult> {
  const { data: existing } = await client
    .from("styles")
    .select("id")
    .eq("slug", input.slug)
    .maybeSingle();
  if (existing) {
    return { ok: false, error: "That slug is already in use.", status: 409 };
  }

  const categoryId = await resolveCategoryId(client, input.category);
  if (!categoryId) {
    return {
      ok: false,
      error: `Category "${input.category}" is not in the database. Seed categories first.`,
      status: 400,
    };
  }

  const styleId = randomUUID();
  const variantId = randomUUID();
  const now = new Date().toISOString();

  const { error: styleError } = await client.from("styles").insert({
    id: styleId,
    slug: input.slug,
    title: input.title,
    category_id: categoryId,
    summary: input.note,
    description: input.description,
    supported_subjects: [input.subject],
    edit_intent: input.intent,
    input_requirement: input.requirement,
    photo_requirements: { best: input.bestSourcePhoto },
    preservation_targets: input.stays,
    change_targets: input.changes,
    target_source_photo: input.targetSourcePhoto,
    card_height: input.cardHeight ?? 330,
    save_count: 0,
    status: "draft",
    author_id: actorId,
    published_at: null,
    created_at: now,
    updated_at: now,
  });
  if (styleError) {
    return { ok: false, error: styleError.message, status: 500 };
  }

  const { error: variantError } = await client.from("prompt_variants").insert({
    id: variantId,
    style_id: styleId,
    tool: input.variant.tool,
    mode: input.variant.mode,
    input_image_count: input.variant.inputImageCount ?? 1,
    input_image_roles: input.variant.inputImageRoles ?? ["source photo"],
    version: input.variant.version,
    template: input.variant.template,
    variables: { defaults: input.variant.defaults },
    settings: {},
    test_record: {
      lastVerified: input.variant.lastVerified,
      limitations: input.variant.limitations,
    },
    is_primary: true,
    status: "draft",
    created_at: now,
    updated_at: now,
  });
  if (variantError) {
    await client.from("styles").delete().eq("id", styleId);
    return { ok: false, error: variantError.message, status: 500 };
  }

  try {
    await replaceAssets(client, styleId, input, {
      source: "admin",
      licence: "pending",
    });
    await upsertStyleTags(client, styleId, input);
  } catch (err) {
    await client.from("styles").delete().eq("id", styleId);
    return {
      ok: false,
      error: err instanceof Error ? err.message : "Could not save assets.",
      status: 500,
    };
  }

  await writeAudit(client, actorId, "create", styleId, {
    slug: input.slug,
    title: input.title,
  });

  const style = await fetchAdminStyleById(client, styleId);
  if (!style) {
    return { ok: false, error: "Created but could not re-fetch style.", status: 500 };
  }
  return { ok: true, style };
}

export async function updateAdminStyle(
  client: SupabaseClient,
  actorId: string,
  styleId: string,
  input: AdminStyleContentInput,
): Promise<WriteStyleResult> {
  const { data: current, error: fetchError } = await client
    .from("styles")
    .select("id, slug, status, published_at")
    .eq("id", styleId)
    .maybeSingle();

  if (fetchError || !current) {
    return { ok: false, error: "Style not found.", status: 404 };
  }

  const status = current.status as string;
  if (status !== "draft" && input.slug !== current.slug) {
    return {
      ok: false,
      error: "Slug can only be changed while the style is in draft.",
      status: 400,
    };
  }

  if (input.slug !== current.slug) {
    const { data: clash } = await client
      .from("styles")
      .select("id")
      .eq("slug", input.slug)
      .maybeSingle();
    if (clash) {
      return { ok: false, error: "That slug is already in use.", status: 409 };
    }
  }

  const categoryId = await resolveCategoryId(client, input.category);
  if (!categoryId) {
    return {
      ok: false,
      error: `Category "${input.category}" is not in the database.`,
      status: 400,
    };
  }

  const now = new Date().toISOString();
  const { error: styleError } = await client
    .from("styles")
    .update({
      slug: input.slug,
      title: input.title,
      category_id: categoryId,
      summary: input.note,
      description: input.description,
      supported_subjects: [input.subject],
      edit_intent: input.intent,
      input_requirement: input.requirement,
      photo_requirements: { best: input.bestSourcePhoto },
      preservation_targets: input.stays,
      change_targets: input.changes,
      target_source_photo: input.targetSourcePhoto,
      card_height: input.cardHeight ?? 330,
      updated_at: now,
    })
    .eq("id", styleId);

  if (styleError) {
    return { ok: false, error: styleError.message, status: 500 };
  }

  const { data: primary } = await client
    .from("prompt_variants")
    .select("id")
    .eq("style_id", styleId)
    .eq("is_primary", true)
    .maybeSingle();

  const variantPayload = {
    tool: input.variant.tool,
    mode: input.variant.mode,
    input_image_count: input.variant.inputImageCount ?? 1,
    input_image_roles: input.variant.inputImageRoles ?? ["source photo"],
    version: input.variant.version,
    template: input.variant.template,
    variables: { defaults: input.variant.defaults },
    test_record: {
      lastVerified: input.variant.lastVerified,
      limitations: input.variant.limitations,
    },
    updated_at: now,
  };

  if (primary?.id) {
    const { error: variantError } = await client
      .from("prompt_variants")
      .update(variantPayload)
      .eq("id", primary.id);
    if (variantError) {
      return { ok: false, error: variantError.message, status: 500 };
    }
  } else {
    const { error: variantError } = await client.from("prompt_variants").insert({
      id: randomUUID(),
      style_id: styleId,
      ...variantPayload,
      is_primary: true,
      status: status === "published" ? "published" : "draft",
      settings: {},
      created_at: now,
    });
    if (variantError) {
      return { ok: false, error: variantError.message, status: 500 };
    }
  }

  try {
    await replaceAssets(client, styleId, input, {
      source: "admin",
      licence: "pending",
    });
    await upsertStyleTags(client, styleId, input);
  } catch (err) {
    return {
      ok: false,
      error: err instanceof Error ? err.message : "Could not save assets.",
      status: 500,
    };
  }

  await writeAudit(client, actorId, "update", styleId, {
    slug: input.slug,
    title: input.title,
  });

  const style = await fetchAdminStyleById(client, styleId);
  if (!style) {
    return { ok: false, error: "Updated but could not re-fetch style.", status: 500 };
  }
  return { ok: true, style };
}
