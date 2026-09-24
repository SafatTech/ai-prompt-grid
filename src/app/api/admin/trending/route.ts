import { NextResponse } from "next/server";
import { requireEditor } from "@/lib/admin/access";
import {
  adminTrendingSchema,
  listTrendingAdminStyles,
  setTrendingStyles,
} from "@/lib/admin/trending";
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

  const styles = await listTrendingAdminStyles(supabase);
  return NextResponse.json({ styles });
}

export async function PUT(request: Request) {
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

  const parsed = adminTrendingSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      {
        error: parsed.error.issues[0]?.message ?? "Invalid trending payload.",
      },
      { status: 400 },
    );
  }

  const result = await setTrendingStyles(supabase, parsed.data.styleIds);
  if (!result.ok) {
    return NextResponse.json({ error: result.error }, { status: result.status });
  }

  const styles = await listTrendingAdminStyles(supabase);
  return NextResponse.json({ styles });
}
