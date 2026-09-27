import { NextResponse } from "next/server";
import { listPublishedStyles } from "@/lib/catalog/repository";
import {
  buildSearchSuggestions,
  toSuggestionIndex,
} from "@/lib/catalog/search-suggestions";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const q = searchParams.get("q") ?? "";

  if (q.length > 80) {
    return NextResponse.json({ suggestions: [] }, { status: 400 });
  }

  const styles = await listPublishedStyles();
  const suggestions = buildSearchSuggestions(q, toSuggestionIndex(styles));

  return NextResponse.json(
    { suggestions },
    {
      headers: {
        "Cache-Control": "public, s-maxage=60, stale-while-revalidate=300",
      },
    },
  );
}
