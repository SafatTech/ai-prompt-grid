import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { getAdminDashboardCounts } from "@/lib/data/catalog";

export const metadata: Metadata = {
  title: "Admin",
  robots: { index: false, follow: false },
};

export default async function AdminHomePage() {
  const counts = await getAdminDashboardCounts();

  return (
    <div className="py-10">
      <Container width="wide">
        <p className="text-xs font-semibold uppercase tracking-[0.16em] text-ink-faint">
          Admin
        </p>
        <h1 className="mt-2 font-display text-3xl tracking-tight">Dashboard</h1>
        <p className="mt-2 max-w-xl text-sm text-ink-muted">
          Data layer is live. Full create/edit/publish forms land in Phase 4 —
          you can already inspect styles and categories from the DB.
        </p>

        <dl className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          <Stat label="Categories" value={counts.categories} />
          <Stat label="Published" value={counts.published} />
          <Stat label="Drafts" value={counts.drafts} />
          <Stat label="Waitlist" value={counts.waitlist} />
        </dl>

        <ul className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          <AdminCard href="/admin/styles" title="Styles" body="List drafts and published" />
          <AdminCard href="/admin/styles/new" title="New style" body="Form shell — CRUD in Phase 4" />
          <AdminCard href="/admin/categories" title="Categories" body="Seed taxonomy from the DB" />
        </ul>
      </Container>
    </div>
  );
}

function Stat({ label, value }: { label: string; value: number }) {
  return (
    <div className="rounded-md border border-border bg-bg-elevated px-4 py-4">
      <dt className="text-xs uppercase tracking-[0.14em] text-ink-faint">{label}</dt>
      <dd className="mt-1 font-display text-3xl tracking-tight text-ink">{value}</dd>
    </div>
  );
}

function AdminCard({
  href,
  title,
  body,
}: {
  href: string;
  title: string;
  body: string;
}) {
  return (
    <li>
      <Link
        href={href}
        className="block rounded-md border border-border bg-bg-elevated px-5 py-5 transition-colors hover:border-border-strong"
      >
        <span className="font-medium text-ink">{title}</span>
        <span className="mt-1 block text-sm text-ink-muted">{body}</span>
      </Link>
    </li>
  );
}
