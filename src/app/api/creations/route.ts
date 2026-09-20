import { randomUUID } from "node:crypto";
import { NextResponse } from "next/server";
import {
  MAX_CREATIONS_PER_USER,
  USER_CREATIONS_BUCKET,
  SIGNED_URL_TTL_SECONDS,
} from "@/lib/creations/constants";
import { processUploadImage } from "@/lib/creations/image";
import { createCreationFieldsSchema } from "@/lib/creations/schemas";
import { countCreations } from "@/lib/library/client";
import type { Creation } from "@/lib/library/types";
import { createServerSupabaseClient } from "@/lib/supabase/server";

export const runtime = "nodejs";

function formatCreationDate(iso: string): string {
  return new Intl.DateTimeFormat(undefined, {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(new Date(iso));
}

async function fileToBuffer(file: File): Promise<Buffer> {
  const ab = await file.arrayBuffer();
  return Buffer.from(ab);
}

export async function POST(request: Request) {
  const supabase = await createServerSupabaseClient();
  if (!supabase) {
    return NextResponse.json(
      { error: "Cloud saves require Supabase configuration." },
      { status: 503 },
    );
  }

  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) {
    return NextResponse.json({ error: "Sign in to save a creation." }, { status: 401 });
  }

  const existing = await countCreations(supabase, user.id);
  if (existing >= MAX_CREATIONS_PER_USER) {
    return NextResponse.json(
      {
        error: `You can save up to ${MAX_CREATIONS_PER_USER} creations. Delete one to add another.`,
      },
      { status: 403 },
    );
  }

  let form: FormData;
  try {
    form = await request.formData();
  } catch {
    return NextResponse.json({ error: "Invalid upload payload." }, { status: 400 });
  }

  const parsed = createCreationFieldsSchema.safeParse({
    styleSlug: form.get("styleSlug"),
    notes: form.get("notes") ?? "",
    promptSnapshot: form.get("promptSnapshot"),
  });
  if (!parsed.success) {
    return NextResponse.json(
      { error: parsed.error.issues[0]?.message ?? "Invalid fields." },
      { status: 400 },
    );
  }

  const resultFile = form.get("result");
  if (!(resultFile instanceof File) || resultFile.size === 0) {
    return NextResponse.json(
      { error: "Select your transformed result first." },
      { status: 400 },
    );
  }

  const sourceFile = form.get("source");
  const hasSource = sourceFile instanceof File && sourceFile.size > 0;

  const resultProcessed = await processUploadImage(
    await fileToBuffer(resultFile),
    resultFile.type,
  );
  if (!resultProcessed.ok) {
    return NextResponse.json({ error: resultProcessed.error }, { status: 400 });
  }

  let sourceProcessed: Awaited<ReturnType<typeof processUploadImage>> | null =
    null;
  if (hasSource && sourceFile instanceof File) {
    sourceProcessed = await processUploadImage(
      await fileToBuffer(sourceFile),
      sourceFile.type,
    );
    if (!sourceProcessed.ok) {
      return NextResponse.json({ error: sourceProcessed.error }, { status: 400 });
    }
  }

  const { data: styleRow, error: styleError } = await supabase
    .from("styles")
    .select("id, slug, title")
    .eq("slug", parsed.data.styleSlug)
    .eq("status", "published")
    .maybeSingle();

  if (styleError || !styleRow) {
    return NextResponse.json(
      {
        error:
          "That style is not in the database yet. Run npm run db:seed, then try again.",
      },
      { status: 400 },
    );
  }

  const { data: variant } = await supabase
    .from("prompt_variants")
    .select("id, tool")
    .eq("style_id", styleRow.id)
    .eq("is_primary", true)
    .eq("status", "published")
    .maybeSingle();

  const creationId = randomUUID();
  const resultKey = `${user.id}/${creationId}/result.${resultProcessed.image.ext}`;
  const sourceKey =
    sourceProcessed && sourceProcessed.ok
      ? `${user.id}/${creationId}/source.${sourceProcessed.image.ext}`
      : null;

  const { error: resultUploadError } = await supabase.storage
    .from(USER_CREATIONS_BUCKET)
    .upload(resultKey, resultProcessed.image.buffer, {
      contentType: resultProcessed.image.contentType,
      upsert: false,
    });
  if (resultUploadError) {
    console.warn("[creations] result upload failed", resultUploadError.message);
    return NextResponse.json(
      { error: "Could not store the result image." },
      { status: 500 },
    );
  }

  if (sourceKey && sourceProcessed && sourceProcessed.ok) {
    const { error: sourceUploadError } = await supabase.storage
      .from(USER_CREATIONS_BUCKET)
      .upload(sourceKey, sourceProcessed.image.buffer, {
        contentType: sourceProcessed.image.contentType,
        upsert: false,
      });
    if (sourceUploadError) {
      await supabase.storage.from(USER_CREATIONS_BUCKET).remove([resultKey]);
      console.warn("[creations] source upload failed", sourceUploadError.message);
      return NextResponse.json(
        { error: "Could not store the source image." },
        { status: 500 },
      );
    }
  }

  const { data: inserted, error: insertError } = await supabase
    .from("creations")
    .insert({
      id: creationId,
      owner_id: user.id,
      style_id: styleRow.id,
      prompt_variant_id: variant?.id ?? null,
      prompt_snapshot: parsed.data.promptSnapshot,
      tool_used: variant?.tool ?? "",
      result_storage_key: resultKey,
      source_storage_key: sourceKey,
      notes: parsed.data.notes || null,
    })
    .select(
      "id, prompt_snapshot, tool_used, result_storage_key, source_storage_key, notes, created_at",
    )
    .single();

  if (insertError || !inserted) {
    const keys = [resultKey, sourceKey].filter(Boolean) as string[];
    if (keys.length) {
      await supabase.storage.from(USER_CREATIONS_BUCKET).remove(keys);
    }
    console.warn("[creations] insert failed", insertError?.message);
    return NextResponse.json(
      { error: "Could not save the creation record." },
      { status: 500 },
    );
  }

  const { data: resultSigned } = await supabase.storage
    .from(USER_CREATIONS_BUCKET)
    .createSignedUrl(resultKey, SIGNED_URL_TTL_SECONDS);
  const { data: sourceSigned } = sourceKey
    ? await supabase.storage
        .from(USER_CREATIONS_BUCKET)
        .createSignedUrl(sourceKey, SIGNED_URL_TTL_SECONDS)
    : { data: null };

  const creation: Creation = {
    id: inserted.id as string,
    result: resultSigned?.signedUrl ?? "",
    source: sourceSigned?.signedUrl ?? "",
    styleId: styleRow.slug as string,
    styleName: styleRow.title as string,
    date: formatCreationDate(inserted.created_at as string),
    notes: (inserted.notes as string | null) ?? "",
    prompt: inserted.prompt_snapshot as string,
    toolUsed: (inserted.tool_used as string) ?? "",
    resultStorageKey: inserted.result_storage_key as string,
    sourceStorageKey: inserted.source_storage_key as string | null,
  };

  return NextResponse.json({ creation }, { status: 201 });
}
