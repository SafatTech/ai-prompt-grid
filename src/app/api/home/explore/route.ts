import { NextResponse } from "next/server";
import { listExploreFeed } from "@/lib/catalog/repository";

const PAGE_SIZE = 24;

/**
 * Homepage explore masonry pages after the server-rendered first page.
 * Query: ?page=2 (1-based). Page 1 is SSR'd on `/`.
 */
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const raw = searchParams.get("page") ?? "2";
  if (!/^[1-9]\d*$/.test(raw)) {
    return NextResponse.json({ error: "Invalid page" }, { status: 400 });
  }
  const page = Number(raw);
  if (page < 2) {
    return NextResponse.json({ error: "Use SSR page 1 on the homepage" }, { status: 400 });
  }

  const feed = await listExploreFeed({ page, pageSize: PAGE_SIZE });
  return NextResponse.json(
    {
      styles: feed.styles,
      page: feed.page,
      pageSize: feed.pageSize,
      total: feed.total,
    },
    {
      headers: {
        "Cache-Control": "public, s-maxage=60, stale-while-revalidate=300",
      },
    },
  );
}
