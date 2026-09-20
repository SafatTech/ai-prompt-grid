import { randomUUID } from "node:crypto";
import { NextResponse } from "next/server";
import { requireEditor } from "@/lib/admin/access";
import { adminAssetUploadMetaSchema } from "@/lib/admin/schemas";
import { processUploadImage } from "@/lib/creations/image";
import { createServerSupabaseClient } from "@/lib/supabase/server";

export const runtime = "nodejs";

const CATALOG_BUCKET = "catalog-public";

type RouteContext = { params: Promise<{ id: string }> };

async function fileToBuffer(file: File): Promise<Buffer> {
  return Buffer.from(await file.arrayBuffer());
}

/**
 * Upload a catalog image (source or result) into catalog-public and
 * optionally attach/update a style_assets row.
 *
 * Multipart fields:
 * - file: image
 * - role: "source" | "result"
 * - meta: JSON string matching adminAssetUploadMetaSchema
 * - assetId: optional existing style_assets id to update one side
 */
export async function POST(request: Request, context: RouteContext) {
  const { id: styleId } = await context.params;
  const supabase = await createServerSupabaseClient();
  if (!supabase) {
    return NextResponse.json({ error: "Supabase is not configured." }, { status: 503 });
  }

  const access = await requireEditor(supabase);
  if (!access.ok) {
    return NextResponse.json({ error: access.error }, { status: access.status });
  }

  const { data: style, error: styleError } = await supabase
    .from("styles")
    .select("id, slug")
    .eq("id", styleId)
    .maybeSingle();
  if (styleError || !style) {
    return NextResponse.json({ error: "Style not found." }, { status: 404 });
  }

  let form: FormData;
  try {
    form = await request.formData();
  } catch {
    return NextResponse.json({ error: "Invalid upload payload." }, { status: 400 });
  }

  const file = form.get("file");
  if (!(file instanceof File) || file.size === 0) {
    return NextResponse.json({ error: "Choose an image file." }, { status: 400 });
  }

  const role = String(form.get("role") || "");
  if (role !== "source" && role !== "result") {
    return NextResponse.json({ error: "role must be source or result." }, { status: 400 });
  }

  let metaRaw: unknown = {};
  try {
    metaRaw = JSON.parse(String(form.get("meta") || "{}"));
  } catch {
    return NextResponse.json({ error: "Invalid meta JSON." }, { status: 400 });
  }
  const metaParsed = adminAssetUploadMetaSchema.safeParse(metaRaw);
  if (!metaParsed.success) {
    return NextResponse.json(
      { error: metaParsed.error.issues[0]?.message ?? "Invalid meta." },
      { status: 400 },
    );
  }

  const processed = await processUploadImage(await fileToBuffer(file), file.type);
  if (!processed.ok) {
    return NextResponse.json({ error: processed.error }, { status: 400 });
  }

  const assetId = String(form.get("assetId") || "") || randomUUID();
  const key = `${style.slug}/${assetId}/${role}.${processed.image.ext}`;

  const { error: uploadError } = await supabase.storage
    .from(CATALOG_BUCKET)
    .upload(key, processed.image.buffer, {
      contentType: processed.image.contentType,
      upsert: true,
    });
  if (uploadError) {
    console.warn("[admin] catalog upload failed", uploadError.message);
    return NextResponse.json({ error: "Could not store catalog image." }, { status: 500 });
  }

  const { data: publicUrlData } = supabase.storage
    .from(CATALOG_BUCKET)
    .getPublicUrl(key);
  const publicUrl = publicUrlData.publicUrl;

  const existingId = String(form.get("assetId") || "");
  if (existingId) {
    const { data: existing } = await supabase
      .from("style_assets")
      .select("id, source_storage_key, result_storage_key")
      .eq("id", existingId)
      .eq("style_id", styleId)
      .maybeSingle();

    if (existing) {
      const patch =
        role === "source"
          ? { source_storage_key: publicUrl }
          : { result_storage_key: publicUrl };
      await supabase
        .from("style_assets")
        .update({
          ...patch,
          alt_text: metaParsed.data.altText,
          provenance: metaParsed.data.provenance,
        })
        .eq("id", existingId);
    }
  } else if (role === "source") {
    // Create a placeholder pair row; result filled on second upload with same assetId returned.
    await supabase.from("style_assets").insert({
      id: assetId,
      style_id: styleId,
      kind: metaParsed.data.kind,
      source_storage_key: publicUrl,
      result_storage_key: publicUrl,
      alt_text: metaParsed.data.altText,
      provenance: metaParsed.data.provenance,
      sort_order: metaParsed.data.sortOrder,
    });
  }

  await supabase.from("audit_logs").insert({
    actor_id: access.userId,
    action: "upload_asset",
    entity_type: "style",
    entity_id: styleId,
    payload: { assetId, role, key, kind: metaParsed.data.kind },
  });

  return NextResponse.json({
    assetId,
    role,
    key,
    url: publicUrl,
  });
}
