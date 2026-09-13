import type { Metadata } from "next";
import Link from "next/link";
import { requireAdmin, getAuthState } from "@/lib/auth/session";
import { isSupabaseConfigured } from "@/lib/supabase/config";
import { createClient } from "@/lib/supabase/server";

export const metadata: Metadata = {
  robots: { index: false, follow: false },
};

export const dynamic = "force-dynamic";

export default async function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  await requireAdmin();
  const { user } = await getAuthState();

  let draftCount = 0;
  let publishedCount = 0;
  if (isSupabaseConfigured()) {
    const supabase = await createClient();
    const [{ count: drafts }, { count: published }] = await Promise.all([
      supabase
        .from("styles")
        .select("*", { count: "exact", head: true })
        .eq("status", "draft"),
      supabase
        .from("styles")
        .select("*", { count: "exact", head: true })
        .eq("status", "published"),
    ]);
    draftCount = drafts ?? 0;
    publishedCount = published ?? 0;
  }

  return (
    <div className="min-h-[50vh] border-b border-border bg-[#f3f1eb]">
      <div className="border-b border-border bg-bg-elevated">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center gap-4 px-5 py-3 text-sm sm:px-8">
          <Link href="/admin" className="font-semibold text-ink">
            Admin
          </Link>
          <Link href="/admin/styles" className="text-ink-muted hover:text-ink">
            Styles
          </Link>
          <Link
            href="/admin/categories"
            className="text-ink-muted hover:text-ink"
          >
            Categories
          </Link>
          <span className="ml-auto text-xs text-ink-faint">
            {user?.email} · {publishedCount} published · {draftCount} drafts
          </span>
          <Link href="/" className="text-ink-faint hover:text-ink">
            ← Site
          </Link>
        </div>
      </div>
      {children}
    </div>
  );
}
