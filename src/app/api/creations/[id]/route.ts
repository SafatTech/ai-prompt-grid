import { NextResponse } from "next/server";
import { patchCreationSchema } from "@/lib/creations/schemas";
import {
  createSignedDownloadUrl,
  deleteCreationRemote,
  fetchCreationById,
  removeCreationSourceRemote,
} from "@/lib/library/client";
import { createServerSupabaseClient } from "@/lib/supabase/server";

export const runtime = "nodejs";

type RouteContext = { params: Promise<{ id: string }> };

export async function GET(request: Request, context: RouteContext) {
  const { id } = await context.params;
  const supabase = await createServerSupabaseClient();
  if (!supabase) {
    return NextResponse.json({ error: "Supabase is not configured." }, { status: 503 });
  }

  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) {
    return NextResponse.json({ error: "Sign in required." }, { status: 401 });
  }

  const creation = await fetchCreationById(supabase, id);
  if (!creation) {
    return NextResponse.json({ error: "Creation not found." }, { status: 404 });
  }

  const url = new URL(request.url);
  const download = url.searchParams.get("download");
  if (download === "result" || download === "source") {
    const key =
      download === "result"
        ? creation.resultStorageKey
        : creation.sourceStorageKey;
    if (!key) {
      return NextResponse.json({ error: "File not available." }, { status: 404 });
    }
    const filename =
      download === "result"
        ? `ai-prompt-grid-${creation.styleId}-result.webp`
        : `ai-prompt-grid-${creation.styleId}-source.webp`;
    const signed = await createSignedDownloadUrl(supabase, key, filename);
    if (!signed) {
      return NextResponse.json({ error: "Could not create download link." }, { status: 500 });
    }
    return NextResponse.redirect(signed);
  }

  return NextResponse.json({ creation });
}

export async function DELETE(_request: Request, context: RouteContext) {
  const { id } = await context.params;
  const supabase = await createServerSupabaseClient();
  if (!supabase) {
    return NextResponse.json({ error: "Supabase is not configured." }, { status: 503 });
  }

  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) {
    return NextResponse.json({ error: "Sign in required." }, { status: 401 });
  }

  const creation = await fetchCreationById(supabase, id);
  if (!creation) {
    return NextResponse.json({ error: "Creation not found." }, { status: 404 });
  }

  const ok = await deleteCreationRemote(supabase, creation);
  if (!ok) {
    return NextResponse.json({ error: "Could not delete creation." }, { status: 500 });
  }

  return NextResponse.json({ ok: true });
}

export async function PATCH(request: Request, context: RouteContext) {
  const { id } = await context.params;
  const supabase = await createServerSupabaseClient();
  if (!supabase) {
    return NextResponse.json({ error: "Supabase is not configured." }, { status: 503 });
  }

  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) {
    return NextResponse.json({ error: "Sign in required." }, { status: 401 });
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON." }, { status: 400 });
  }

  const parsed = patchCreationSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: "Unsupported patch." }, { status: 400 });
  }

  const creation = await fetchCreationById(supabase, id);
  if (!creation) {
    return NextResponse.json({ error: "Creation not found." }, { status: 404 });
  }

  const ok = await removeCreationSourceRemote(supabase, creation);
  if (!ok) {
    return NextResponse.json({ error: "Could not remove source photo." }, { status: 500 });
  }

  const updated = await fetchCreationById(supabase, id);
  return NextResponse.json({ creation: updated });
}
