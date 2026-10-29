import { NextResponse } from "next/server";
import { requireEditor } from "@/lib/admin/access";
import { detectFaceFocusFromBuffer } from "@/lib/catalog/detect-face-focus-node";
import { createServerSupabaseClient } from "@/lib/supabase/server";

export const runtime = "nodejs";

/**
 * Admin-only face focus detection for a file upload or remote image URL.
 * Used by the style editor when setting focus without going through assets POST.
 */
export async function POST(request: Request) {
  const supabase = await createServerSupabaseClient();
  if (!supabase) {
    return NextResponse.json({ error: "Supabase is not configured." }, { status: 503 });
  }

  const access = await requireEditor(supabase);
  if (!access.ok) {
    return NextResponse.json({ error: access.error }, { status: access.status });
  }

  const contentType = request.headers.get("content-type") || "";

  try {
    if (contentType.includes("multipart/form-data")) {
      const form = await request.formData();
      const file = form.get("file");
      if (!(file instanceof File) || file.size === 0) {
        return NextResponse.json({ error: "Choose an image file." }, { status: 400 });
      }
      const focus = await detectFaceFocusFromBuffer(Buffer.from(await file.arrayBuffer()));
      return NextResponse.json({ focusX: focus.x, focusY: focus.y });
    }

    const body = (await request.json()) as { url?: string };
    const url = typeof body.url === "string" ? body.url.trim() : "";
    if (!url || !/^https?:\/\//i.test(url)) {
      return NextResponse.json({ error: "Provide an https image URL." }, { status: 400 });
    }

    const imageResponse = await fetch(url);
    if (!imageResponse.ok) {
      return NextResponse.json(
        { error: `Could not download image (${imageResponse.status}).` },
        { status: 400 },
      );
    }
    const focus = await detectFaceFocusFromBuffer(
      Buffer.from(await imageResponse.arrayBuffer()),
    );
    return NextResponse.json({ focusX: focus.x, focusY: focus.y });
  } catch (error) {
    console.warn("[admin] detect-focus failed", error);
    return NextResponse.json({ error: "Focus detection failed." }, { status: 500 });
  }
}
