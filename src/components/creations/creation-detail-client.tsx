"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import { EmptyState } from "@/components/empty-state";
import { useLibrary } from "@/components/providers/library-provider";
import { useToast } from "@/components/providers/toast-provider";
import type { Creation } from "@/lib/library/types";
import { isSupabaseConfigured } from "@/lib/env";

type Props = {
  creation?: Creation;
  creationId?: string;
};

export function CreationDetailClient({ creation: initial, creationId }: Props) {
  const router = useRouter();
  const { ready, signedIn, creations, deleteCreation, removeCreationSource } =
    useLibrary();
  const { toast } = useToast();
  const remote = isSupabaseConfigured();

  const fromLibrary = useMemo(() => {
    if (initial) return null;
    if (!creationId) return null;
    return creations.find((c) => c.id === creationId) ?? null;
  }, [initial, creationId, creations]);

  const [creation, setCreation] = useState<Creation | null>(initial ?? null);
  const [busy, setBusy] = useState(false);

  const active = creation ?? fromLibrary;

  if (!ready) {
    return (
      <section className="container py-[88px]">
        <p className="text-[var(--muted)]">Loading…</p>
      </section>
    );
  }

  if (!signedIn) {
    return (
      <section className="container py-[88px]">
        <EmptyState
          icon="♡"
          title="Sign in to view this creation"
          description="Private creations are only available to their owner."
          action={
            <Link
              href="/sign-in"
              className="inline-flex min-h-11 items-center justify-center rounded-xl bg-[var(--violet)] px-[18px] text-sm font-bold text-[#100d1a]"
            >
              Sign in
            </Link>
          }
        />
      </section>
    );
  }

  if (!active) {
    return (
      <section className="container py-[88px]">
        <EmptyState
          icon="↔"
          title="Creation not found"
          description="It may have been deleted, or you do not have access."
          action={
            <Link
              href="/library"
              className="inline-flex min-h-11 items-center justify-center rounded-xl bg-[var(--violet)] px-[18px] text-sm font-bold text-[#100d1a]"
            >
              Back to library
            </Link>
          }
        />
      </section>
    );
  }

  async function onDelete() {
    if (!active) return;
    if (!window.confirm("Delete this creation and its files permanently?")) return;
    setBusy(true);
    const ok = await deleteCreation(active.id);
    setBusy(false);
    if (!ok) {
      toast("Could not delete creation.", "error");
      return;
    }
    toast("Creation deleted.");
    router.push("/library");
  }

  async function onRemoveSource() {
    if (!active?.source) return;
    if (!window.confirm("Remove only the source photo? The result stays.")) return;
    setBusy(true);
    const ok = await removeCreationSource(active.id);
    setBusy(false);
    if (!ok) {
      toast("Could not remove source photo.", "error");
      return;
    }
    const next = { ...active, source: "", sourceStorageKey: null };
    setCreation(next);
    toast("Source photo removed.");
  }

  const downloadHref = remote
    ? `/api/creations/${active.id}?download=result`
    : active.result;

  return (
    <section className="container pb-[100px]">
      <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="m-0 mb-2 text-[11px] font-bold tracking-[0.08em] text-[var(--muted)] uppercase">
            Private creation
          </p>
          <h1 className="m-0 text-[clamp(32px,4vw,52px)] tracking-[-0.04em]">
            {active.styleName}
          </h1>
          <p className="mt-2 mb-0 text-[var(--muted)]">
            Saved {active.date}
            {active.toolUsed ? ` · ${active.toolUsed}` : ""}
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          <a
            className="inline-flex min-h-11 items-center justify-center rounded-xl border border-[var(--line)] bg-[var(--surface-2)] px-[18px] text-sm font-bold"
            href={downloadHref}
            download={remote ? undefined : "ai-prompt-grid-result.webp"}
          >
            Download result
          </a>
          <Button variant="danger" onClick={onDelete} disabled={busy}>
            Delete creation
          </Button>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
        <div className="overflow-hidden rounded-[var(--radius)] border border-[var(--line)] bg-[var(--surface)]">
          <div className="grid min-h-[360px] grid-cols-1 gap-0.5 bg-[var(--line)] sm:grid-cols-[1fr_1.25fr]">
            {active.source ? (
              <div className="relative">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={active.source}
                  alt="Source photo"
                  className="h-full min-h-[280px] w-full object-cover"
                />
                <span className="absolute top-3 left-3 rounded-lg bg-black/55 px-2 py-1 text-[11px] font-bold">
                  Source
                </span>
              </div>
            ) : (
              <div className="grid min-h-[200px] place-items-center bg-[var(--surface-2)] px-6 text-center text-sm text-[var(--muted)]">
                No source photo saved
              </div>
            )}
            <div className="relative">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={active.result}
                alt="Saved AI result"
                className="h-full min-h-[280px] w-full object-cover"
              />
              <span className="absolute top-3 left-3 rounded-lg bg-black/55 px-2 py-1 text-[11px] font-bold">
                Result
              </span>
            </div>
          </div>
        </div>

        <aside className="flex flex-col gap-4 rounded-[var(--radius)] border border-[var(--line)] bg-[var(--surface)] p-5">
          <div>
            <h2 className="mt-0 mb-2 text-lg">Prompt snapshot</h2>
            <p className="m-0 mb-3 text-[13px] text-[var(--muted)]">
              Frozen at save time. Later recipe edits do not change this copy.
            </p>
            <pre className="m-0 max-h-[220px] overflow-auto rounded-[10px] bg-[#101016] p-3 font-mono text-[12px] leading-relaxed whitespace-pre-wrap text-[#bebbc7]">
              {active.prompt}
            </pre>
          </div>
          {active.notes ? (
            <div>
              <h2 className="mt-0 mb-2 text-lg">Notes</h2>
              <p className="m-0 text-[14px] text-[var(--muted)]">{active.notes}</p>
            </div>
          ) : null}
          <div className="mt-auto flex flex-col gap-2 pt-2">
            {active.styleId ? (
              <Link
                href={`/styles/${active.styleId}`}
                className="inline-flex min-h-11 items-center justify-center rounded-xl bg-[var(--violet)] px-[18px] text-sm font-bold text-[#100d1a]"
              >
                Open style
              </Link>
            ) : null}
            {active.source ? (
              <Button
                variant="ghost"
                onClick={onRemoveSource}
                disabled={busy}
                data-testid="remove-source"
              >
                Remove source photo only
              </Button>
            ) : null}
          </div>
        </aside>
      </div>
    </section>
  );
}
