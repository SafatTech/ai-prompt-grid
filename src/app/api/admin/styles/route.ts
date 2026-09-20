import { NextResponse } from "next/server";
import { listAdminStyles, requireEditor } from "@/lib/admin/access";
import { adminStyleContentSchema } from "@/lib/admin/schemas";
import { listCategories } from "@/lib/admin/styles-read";
import { createAdminStyle } from "@/lib/admin/styles-write";
import { createServerSupabaseClient } from "@/lib/supabase/server";

export const runtime = "nodejs";

export async function GET() {
  const supabase = await createServerSupabaseClient();
  if (!supabase) {
    return NextResponse.json({ error: "Supabase is not configured." }, { status: 503 });
  }

  const access = await requireEditor(supabase);
  if (!access.ok) {
    return NextResponse.json({ error: access.error }, { status: access.status });
  }

  const [styles, categories] = await Promise.all([
    listAdminStyles(supabase),
    listCategories(supabase),
  ]);
  return NextResponse.json({
    profile: access.profile,
    styles,
    categories,
  });
}

export async function POST(request: Request) {
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

  const result = await createAdminStyle(supabase, access.userId, parsed.data);
  if (!result.ok) {
    return NextResponse.json({ error: result.error }, { status: result.status });
  }

  return NextResponse.json({ style: result.style }, { status: 201 });
}
