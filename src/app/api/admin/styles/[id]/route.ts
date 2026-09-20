import { NextResponse } from "next/server";
import {
  canTransition,
  listAdminStyles,
  requireEditor,
} from "@/lib/admin/access";
import {
  adminStyleContentSchema,
  adminStyleStatusSchema,
} from "@/lib/admin/schemas";
import { fetchAdminStyleById } from "@/lib/admin/styles-read";
import { updateAdminStyle } from "@/lib/admin/styles-write";
import type { PublishStatus } from "@/lib/catalog/types";
import { createServerSupabaseClient } from "@/lib/supabase/server";

export const runtime = "nodejs";

type RouteContext = { params: Promise<{ id: string }> };

export async function GET(_request: Request, context: RouteContext) {
  const { id } = await context.params;
  const supabase = await createServerSupabaseClient();
  if (!supabase) {
    return NextResponse.json({ error: "Supabase is not configured." }, { status: 503 });
  }

  const access = await requireEditor(supabase);
  if (!access.ok) {
    return NextResponse.json({ error: access.error }, { status: access.status });
  }

  const style = await fetchAdminStyleById(supabase, id);
  if (!style) {
    return NextResponse.json({ error: "Style not found." }, { status: 404 });
  }
  return NextResponse.json({ style });
}

export async function PUT(request: Request, context: RouteContext) {
  const { id } = await context.params;
  const supabase = await createServerSupabaseClient();
  if (!supabase) {
    return NextResponse.json({ error: "Supabase is not configured." }, { status: 503 });
  }

  const access = await requireEditor(supabase);
  if (!access.ok) {
    return NextResponse.json({ error: access.error }, { status: access.status });
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON." }, { status: 400 });
  }

  const parsed = adminStyleContentSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      {
        error: parsed.error.issues[0]?.message ?? "Invalid style payload.",
        issues: parsed.error.issues,
      },
      { status: 400 },
    );
  }

  const result = await updateAdminStyle(supabase, access.userId, id, parsed.data);
  if (!result.ok) {
    return NextResponse.json({ error: result.error }, { status: result.status });
  }
  return NextResponse.json({ style: result.style });
}

export async function PATCH(request: Request, context: RouteContext) {
  const { id } = await context.params;
  const supabase = await createServerSupabaseClient();
  if (!supabase) {
    return NextResponse.json({ error: "Supabase is not configured." }, { status: 503 });
  }

  const access = await requireEditor(supabase);
  if (!access.ok) {
    return NextResponse.json({ error: access.error }, { status: access.status });
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON." }, { status: 400 });
  }

  const parsed = adminStyleStatusSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: "Invalid status." }, { status: 400 });
  }

  const nextStatus = parsed.data.status as PublishStatus;

  const { data: current, error: fetchError } = await supabase
    .from("styles")
    .select("id, slug, title, status, published_at")
    .eq("id", id)
    .maybeSingle();

  if (fetchError || !current) {
    return NextResponse.json({ error: "Style not found." }, { status: 404 });
  }

  const fromStatus = current.status as PublishStatus;
  if (fromStatus === nextStatus) {
    const styles = await listAdminStyles(supabase);
    const style = styles.find((s) => s.id === id) ?? null;
    return NextResponse.json({ style });
  }

  if (!canTransition(fromStatus, nextStatus)) {
    return NextResponse.json(
      { error: `Cannot move from ${fromStatus} to ${nextStatus}.` },
      { status: 400 },
    );
  }

  const now = new Date().toISOString();
  const publishedAt =
    nextStatus === "published"
      ? ((current.published_at as string | null) ?? now)
      : current.published_at;

  const { error: updateError } = await supabase
    .from("styles")
    .update({
      status: nextStatus,
      published_at: nextStatus === "published" ? publishedAt : current.published_at,
      updated_at: now,
    })
    .eq("id", id);

  if (updateError) {
    console.warn("[admin] style update failed", updateError.message);
    return NextResponse.json({ error: "Could not update style." }, { status: 500 });
  }

  if (nextStatus === "published") {
    await supabase
      .from("prompt_variants")
      .update({ status: "published", updated_at: now })
      .eq("style_id", id)
      .eq("is_primary", true);
  } else if (nextStatus === "archived") {
    await supabase
      .from("prompt_variants")
      .update({ status: "archived", updated_at: now })
      .eq("style_id", id);
  } else if (nextStatus === "draft" || nextStatus === "in_review") {
    await supabase
      .from("prompt_variants")
      .update({ status: "draft", updated_at: now })
      .eq("style_id", id)
      .eq("is_primary", true);
  }

  if (nextStatus === "published" || nextStatus === "archived") {
    const { error: auditError } = await supabase.from("audit_logs").insert({
      actor_id: access.userId,
      action: nextStatus === "published" ? "publish" : "archive",
      entity_type: "style",
      entity_id: id,
      payload: {
        slug: current.slug,
        title: current.title,
        from: fromStatus,
        to: nextStatus,
      },
    });
    if (auditError) {
      console.warn("[admin] audit log failed", auditError.message);
    }
  }

  const styles = await listAdminStyles(supabase);
  const style = styles.find((s) => s.id === id) ?? null;
  return NextResponse.json({ style });
}
