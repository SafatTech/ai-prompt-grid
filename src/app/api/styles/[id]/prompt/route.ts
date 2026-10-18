import { NextResponse } from "next/server";
import { assemblePrompt, defaultsForStyle } from "@/lib/catalog/prompts";
import { getPublishedStyleBySlug } from "@/lib/catalog/repository";

/** Lightweight prompt payload for card copy buttons (avoids embedding full prompts in HTML). */
export async function GET(
  _request: Request,
  context: { params: Promise<{ id: string }> },
) {
  const { id } = await context.params;
  const style = await getPublishedStyleBySlug(id);
  if (!style) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }
  const assembled = assemblePrompt(style, defaultsForStyle(style));
  if (!assembled.ok) {
    return NextResponse.json(
      { error: assembled.errors[0] ?? "Prompt unavailable" },
      { status: 422 },
    );
  }
  return NextResponse.json(
    {
      prompt: assembled.prompt,
      variantId: style.promptVariant.id,
      tool: assembled.tool,
    },
    {
      headers: {
        "Cache-Control": "public, s-maxage=60, stale-while-revalidate=300",
      },
    },
  );
}
