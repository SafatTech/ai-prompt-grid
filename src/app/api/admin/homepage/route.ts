import { revalidatePath } from "next/cache";
import { NextResponse } from "next/server";
import { requireEditor } from "@/lib/admin/access";
import {
  getHomepageAdminData,
  homepageCurationSaveSchema,
  saveHomepageCuration,
} from "@/lib/admin/homepage";
import { expireHomepageSettingsCache } from "@/lib/catalog/public-cache-invalidation";
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
  const data = await getHomepageAdminData(supabase);
  return NextResponse.json(data, { status: data.loadError ? 500 : 200 });
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
  const parsed = homepageCurationSaveSchema.safeParse(
    await request.json().catch(() => null),
  );
  if (!parsed.success) {
    return NextResponse.json(
      { error: parsed.error.issues[0]?.message ?? "Invalid curation settings." },
      { status: 400 },
    );
  }
  const result = await saveHomepageCuration(supabase, parsed.data, access.userId);
  if (!result.ok) {
    return NextResponse.json({ error: result.error }, { status: 500 });
  }
  expireHomepageSettingsCache();
  revalidatePath("/");
  revalidatePath("/explore");
  return NextResponse.json({ ok: true });
}
