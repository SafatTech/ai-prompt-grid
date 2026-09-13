import type { Metadata } from "next";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { EmptyState } from "@/components/ui/EmptyState";
import { listAdminStyles } from "@/lib/data/catalog";
import { isSupabaseConfigured } from "@/lib/supabase/config";

export const metadata: Metadata = {
  title: "Admin · Styles",
  robots: { index: false, follow: false },
};

export default async function AdminStylesPage() {
  const styles = await listAdminStyles();

  return (
    <div className="py-10">
      <Container width="wide">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <h1 className="font-display text-3xl tracking-tight">Styles</h1>
            <p className="mt-1 text-sm text-ink-muted">
              {isSupabaseConfigured()
                ? "Loaded from Supabase with RLS (admin read)."
                : "Configure Supabase to load styles."}
            </p>
          </div>
          <Button href="/admin/styles/new">New style</Button>
        </div>

        {styles.length === 0 ? (
          <EmptyState
            className="mt-8"
            title="No styles yet"
            description="Apply the Phase 2 migration to seed two draft styles, or create one in Phase 4."
            action={
              <Link href="/admin/styles/new" className="text-sm font-medium text-accent">
                Create draft →
              </Link>
            }
          />
        ) : (
          <div className="mt-8 overflow-x-auto rounded-md border border-border bg-bg-elevated">
            <table className="min-w-full text-left text-sm">
              <thead className="border-b border-border text-xs uppercase tracking-[0.12em] text-ink-faint">
                <tr>
                  <th className="px-4 py-3 font-medium">Title</th>
                  <th className="px-4 py-3 font-medium">Status</th>
                  <th className="px-4 py-3 font-medium">Models</th>
                  <th className="px-4 py-3 font-medium">Featured</th>
                  <th className="px-4 py-3 font-medium">Copies</th>
                  <th className="px-4 py-3 font-medium" />
                </tr>
              </thead>
              <tbody>
                {styles.map((style) => (
                  <tr key={style.id} className="border-b border-border/70 last:border-0">
                    <td className="px-4 py-3">
                      <div className="font-medium text-ink">{style.title}</div>
                      <div className="text-xs text-ink-faint">{style.slug}</div>
                    </td>
                    <td className="px-4 py-3 capitalize text-ink-muted">{style.status}</td>
                    <td className="px-4 py-3 text-ink-muted">
                      {style.model_slugs.join(", ") || "—"}
                    </td>
                    <td className="px-4 py-3 text-ink-muted">
                      {style.is_featured ? "Yes" : "No"}
                    </td>
                    <td className="px-4 py-3 text-ink-muted">{style.copy_count}</td>
                    <td className="px-4 py-3 text-right">
                      <Link
                        href={`/admin/styles/${style.id}/edit`}
                        className="font-medium text-accent hover:text-accent-hover"
                      >
                        Edit
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </Container>
    </div>
  );
}
