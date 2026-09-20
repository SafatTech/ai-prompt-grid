"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  STYLE_STATUS_TRANSITIONS,
  type AdminStyleRow,
  type ProfileRole,
} from "@/lib/admin/access";
import type { PublishStatus } from "@/lib/catalog/types";
import { useToast } from "@/components/providers/toast-provider";
import { cn } from "@/lib/utils";

type Props = {
  initialStyles: AdminStyleRow[];
  role: ProfileRole;
  displayName: string | null;
};

const STATUS_FILTERS: Array<PublishStatus | "all"> = [
  "all",
  "draft",
  "in_review",
  "published",
  "archived",
];

const ACTION_LABEL: Record<PublishStatus, string> = {
  draft: "Move to draft",
  in_review: "Send to review",
  published: "Publish",
  archived: "Archive",
};

export function AdminStylesClient({ initialStyles, role, displayName }: Props) {
  const { toast } = useToast();
  const [styles, setStyles] = useState(initialStyles);
  const [filter, setFilter] = useState<PublishStatus | "all">("all");
  const [busyId, setBusyId] = useState<string | null>(null);

  const visible = useMemo(
    () => (filter === "all" ? styles : styles.filter((s) => s.status === filter)),
    [styles, filter],
  );

  async function setStatus(style: AdminStyleRow, status: PublishStatus) {
    setBusyId(style.id);
    const response = await fetch(`/api/admin/styles/${style.id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status }),
    });
    const payload = (await response.json().catch(() => ({}))) as {
      style?: AdminStyleRow;
      error?: string;
    };
    setBusyId(null);
    if (!response.ok || !payload.style) {
      toast(payload.error ?? "Could not update status.", "error");
      return;
    }
    setStyles((prev) =>
      prev.map((row) => (row.id === style.id ? payload.style! : row)),
    );
    toast(`${style.title} → ${status.replace("_", " ")}.`);
  }

  return (
    <div>
      <section className="container pt-16 pb-6">
        <p className="m-0 mb-2 text-[11px] font-bold tracking-[0.08em] text-[var(--muted)] uppercase">
          Editorial · {role}
          {displayName ? ` · ${displayName}` : ""}
        </p>
        <h1 className="m-0 mb-2 text-[clamp(36px,4.5vw,56px)] tracking-[-0.04em]">
          Style lifecycle
        </h1>
        <p className="m-0 mb-5 max-w-[54ch] text-[var(--muted)]">
          Create and edit recipes, then draft, review, publish, or archive. Publish and
          archive write an audit log. Archiving never deletes private user creations.
        </p>
        <Link
          href="/admin/styles/new"
          data-testid="admin-new-style"
          className="inline-flex min-h-11 items-center justify-center rounded-xl bg-[var(--violet)] px-[18px] text-sm font-bold text-[#100d1a]"
        >
          New style
        </Link>
      </section>

      <div className="container flex flex-wrap gap-2 border-b border-[var(--line)] pb-4">
        {STATUS_FILTERS.map((value) => (
          <button
            key={value}
            type="button"
            className={cn(
              "cursor-pointer rounded-xl border border-[var(--line)] bg-[var(--surface)] px-3.5 py-2 text-sm font-bold text-[var(--muted)]",
              filter === value &&
                "border-[rgba(139,108,255,0.45)] bg-[rgba(139,108,255,0.12)] text-[var(--text)]",
            )}
            onClick={() => setFilter(value)}
          >
            {value === "all" ? "All" : value.replace("_", " ")}
            {value !== "all"
              ? ` (${styles.filter((s) => s.status === value).length})`
              : ` (${styles.length})`}
          </button>
        ))}
      </div>

      <section className="container py-8 pb-[100px]">
        {visible.length === 0 ? (
          <p className="text-[var(--muted)]">No styles in this filter.</p>
        ) : (
          <div className="overflow-x-auto rounded-[var(--radius)] border border-[var(--line)]">
            <table className="w-full min-w-[720px] border-collapse text-left text-sm">
              <thead className="bg-[var(--surface-2)] text-[11px] tracking-[0.06em] text-[var(--muted)] uppercase">
                <tr>
                  <th className="px-4 py-3 font-bold">Style</th>
                  <th className="px-4 py-3 font-bold">Status</th>
                  <th className="px-4 py-3 font-bold">Tool</th>
                  <th className="px-4 py-3 font-bold">Variant</th>
                  <th className="px-4 py-3 font-bold">Edit</th>
                  <th className="px-4 py-3 font-bold">Actions</th>
                </tr>
              </thead>
              <tbody>
                {visible.map((style) => {
                  const next = STYLE_STATUS_TRANSITIONS[style.status] ?? [];
                  return (
                    <tr
                      key={style.id}
                      className="border-t border-[var(--line)] bg-[var(--surface)]"
                    >
                      <td className="px-4 py-4 align-top">
                        <div className="font-bold text-[var(--text)]">{style.title}</div>
                        <div className="mt-1 text-[12px] text-[var(--muted)]">
                          {style.category} ·{" "}
                          <Link
                            href={`/styles/${style.slug}`}
                            className="text-[var(--text)] underline-offset-2 hover:underline"
                          >
                            {style.slug}
                          </Link>
                        </div>
                      </td>
                      <td className="px-4 py-4 align-top">
                        <StatusPill status={style.status} />
                      </td>
                      <td className="px-4 py-4 align-top text-[var(--muted)]">
                        {style.tool}
                      </td>
                      <td className="px-4 py-4 align-top text-[var(--muted)]">
                        {style.variantStatus}
                      </td>
                      <td className="px-4 py-4 align-top">
                        <Link
                          href={`/admin/styles/${style.slug}/edit`}
                          data-testid={`admin-edit-${style.slug}`}
                          className="inline-flex min-h-10 items-center justify-center rounded-xl border border-[var(--line)] bg-[var(--surface-2)] px-3 text-sm font-bold text-[var(--text)]"
                        >
                          Edit
                        </Link>
                      </td>
                      <td className="px-4 py-4 align-top">
                        <div className="flex flex-wrap gap-2">
                          {next.map((status) => (
                            <Button
                              key={status}
                              variant={
                                status === "published"
                                  ? "primary"
                                  : status === "archived"
                                    ? "danger"
                                    : "ghost"
                              }
                              disabled={busyId === style.id}
                              data-testid={`admin-${style.slug}-${status}`}
                              onClick={() => void setStatus(style, status)}
                            >
                              {ACTION_LABEL[status]}
                            </Button>
                          ))}
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </section>
    </div>
  );
}

function StatusPill({ status }: { status: PublishStatus }) {
  return (
    <span
      className={cn(
        "inline-flex rounded-lg px-2 py-1 text-[11px] font-bold tracking-[0.04em] uppercase",
        status === "published" && "bg-[rgba(103,216,178,0.15)] text-[#67d8b2]",
        status === "draft" && "bg-[rgba(255,255,255,0.06)] text-[var(--muted)]",
        status === "in_review" && "bg-[rgba(139,108,255,0.16)] text-[#c5b9ff]",
        status === "archived" && "bg-[rgba(255,124,142,0.14)] text-[#ff7c8e]",
      )}
    >
      {status.replace("_", " ")}
    </span>
  );
}
