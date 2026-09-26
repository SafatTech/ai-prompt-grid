"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { EmptyState } from "@/components/empty-state";
import { StyleCard } from "@/components/style-card";
import { Button } from "@/components/ui/button";
import { useLibrary } from "@/components/providers/library-provider";
import { useUiModals } from "@/components/providers/ui-modal-provider";
import { useToast } from "@/components/providers/toast-provider";
import type { CatalogStyle } from "@/lib/catalog/types";
import { cn } from "@/lib/utils";

type Tab = "saved" | "collections" | "creations";

type Props = { styles: CatalogStyle[] };

export function LibraryClient({ styles }: Props) {
  const {
    signedIn,
    savedStyles,
    collections,
    creations,
    deleteCreation,
    moveStyleToCollection,
    setPendingAction,
  } = useLibrary();
  const { openSignIn, openCollection, openSaveResult } = useUiModals();
  const { toast } = useToast();
  const [tab, setTab] = useState<Tab>("saved");
  const [deletingId, setDeletingId] = useState<string | null>(null);

  useEffect(() => {
    function readHash() {
      const hash = window.location.hash.replace("#", "");
      if (hash === "saved" || hash === "collections" || hash === "creations") {
        setTab(hash);
      } else if (!hash) {
        setTab("saved");
      }
    }
    readHash();
    window.addEventListener("hashchange", readHash);
    return () => window.removeEventListener("hashchange", readHash);
  }, []);

  if (!signedIn) {
    return (
      <section className="container py-12 sm:py-[88px]">
        <EmptyState
          icon="♡"
          title="Sign in to open your library"
          description="Keep saved styles, collections, and your finished transformations together."
          action={
            <Button
              data-testid="library-sign-in"
              onClick={() => {
                setPendingAction({ type: "open-library" });
                openSignIn();
              }}
            >
              Sign in
            </Button>
          }
        />
      </section>
    );
  }

  return (
    <div>
      <section className="container pt-10 pb-6 sm:pt-16">
        <h1 className="m-0 mb-2 text-[clamp(36px,8vw,66px)] tracking-[-0.05em]">
          My library
        </h1>
        <p className="m-0 text-[15px] text-[var(--muted)] sm:text-base">
          Saved styles, collections, and creations sync privately to your account when
          Supabase is configured.
        </p>
      </section>

      <div className="container flex gap-1.5 overflow-x-auto border-b border-[var(--line)]" role="tablist">
        {(
          [
            ["saved", "Saved styles"],
            ["collections", "Collections"],
            ["creations", "My creations"],
          ] as const
        ).map(([id, label]) => (
          <button
            key={id}
            type="button"
            role="tab"
            aria-selected={tab === id}
            className={cn(
              "cursor-pointer border-0 border-b-2 border-transparent bg-transparent px-4 py-3.5 font-bold whitespace-nowrap text-[var(--muted)]",
              tab === id && "border-[var(--violet)] text-[var(--text)]",
            )}
            onClick={() => setTab(id)}
          >
            {label}
          </button>
        ))}
      </div>

      <section className="container py-8 pb-16 sm:py-[34px] sm:pb-[100px]">
        {tab === "saved" ? (
          <>
            <div className="mb-[22px] flex flex-col items-start gap-3 sm:flex-row sm:items-center sm:justify-between">
              <h2 className="m-0 text-[22px] sm:text-[27px]">Saved styles</h2>
              <Link
                href="/explore"
                className="inline-flex min-h-11 w-full items-center justify-center rounded-xl border border-[var(--line)] bg-[var(--surface-2)] px-[18px] text-sm font-bold sm:w-auto"
              >
                Explore more
              </Link>
            </div>
            {savedStyles.length ? (
              <div className="grid grid-cols-1 gap-[18px] sm:grid-cols-2 lg:grid-cols-3">
                {styles
                  .filter((style) => savedStyles.includes(style.id))
                  .map((style) => (
                    <StyleCard key={style.id} style={style} compact />
                  ))}
              </div>
            ) : (
              <EmptyState
                icon="♡"
                title="No saved styles yet"
                description="Explore looks you want to try."
                action={
                  <Link
                    href="/explore"
                    className="inline-flex min-h-11 items-center justify-center rounded-xl bg-[var(--violet)] px-[18px] text-sm font-bold text-[#100d1a]"
                  >
                    Explore styles
                  </Link>
                }
              />
            )}
          </>
        ) : null}

        {tab === "collections" ? (
          <>
            <div className="mb-[22px] flex flex-col items-start gap-3 sm:flex-row sm:items-center sm:justify-between">
              <h2 className="m-0 text-[22px] sm:text-[27px]">Collections</h2>
              <Button className="w-full sm:w-auto" onClick={openCollection}>
                New collection
              </Button>
            </div>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {collections.map((collection) => {
                const ids =
                  collection.id === "saved-styles" ? savedStyles : collection.styleIds;
                const items = styles.filter((style) => ids.includes(style.id));
                return (
                  <article
                    key={collection.id}
                    className="flex min-h-[210px] flex-col justify-between rounded-[var(--radius)] border border-[var(--line)] bg-[var(--surface)] p-[22px]"
                  >
                    <div className="flex">
                      {items.length ? (
                        items.slice(0, 3).map((style, index) => (
                          // eslint-disable-next-line @next/next/no-img-element
                          <img
                            key={style.id}
                            src={style.result}
                            alt=""
                            className={cn(
                              "h-[62px] w-[62px] rounded-xl border-[3px] border-[var(--surface)] object-cover",
                              index > 0 && "-ml-[13px]",
                            )}
                          />
                        ))
                      ) : (
                        <div className="grid h-[62px] w-[62px] place-items-center rounded-[17px] bg-[rgba(139,108,255,0.11)] text-[#c5b9ff]">
                          ♡
                        </div>
                      )}
                    </div>
                    <div>
                      <h3 className="mt-[18px] mb-0.5 text-xl">{collection.name}</h3>
                      <p className="m-0 text-[13px] text-[var(--muted)]">
                        {items.length} {items.length === 1 ? "style" : "styles"}
                      </p>
                    </div>
                  </article>
                );
              })}
            </div>
            {savedStyles.length ? (
              <section className="mt-16">
                <h2 className="mb-7 text-[clamp(28px,3vw,42px)]">Organize saved styles</h2>
                <div className="grid grid-cols-1 gap-[18px] sm:grid-cols-2 lg:grid-cols-3">
                  {styles
                    .filter((style) => savedStyles.includes(style.id))
                    .map((style) => (
                      <div key={style.id}>
                        <StyleCard style={style} compact />
                        <select
                          className="mt-3 w-full min-h-[41px] rounded-[11px] border border-[var(--line)] bg-[var(--surface)] px-3 text-[var(--text)]"
                          aria-label={`Move ${style.title} to collection`}
                          defaultValue=""
                          onChange={(event) => {
                            if (!event.target.value) return;
                            moveStyleToCollection(style.id, event.target.value);
                            const name =
                              collections.find((c) => c.id === event.target.value)?.name ??
                              "collection";
                            toast(`Added to ${name}.`);
                            event.target.value = "";
                          }}
                        >
                          <option value="">Add to collection...</option>
                          {collections
                            .filter((c) => c.id !== "saved-styles")
                            .map((c) => (
                              <option key={c.id} value={c.id}>
                                {c.name}
                              </option>
                            ))}
                        </select>
                      </div>
                    ))}
                </div>
              </section>
            ) : null}
          </>
        ) : null}

        {tab === "creations" ? (
          <>
            <div className="mb-[22px] flex flex-col items-start gap-3 sm:flex-row sm:items-center sm:justify-between">
              <h2 className="m-0 text-[22px] sm:text-[27px]">My creations</h2>
              <Button
                className="w-full sm:w-auto"
                onClick={() => openSaveResult(styles[0].id)}
              >
                Add a result
              </Button>
            </div>
            {creations.length ? (
              <div className="grid grid-cols-1 gap-[18px] md:grid-cols-2">
                {creations.map((creation) => (
                  <article
                    key={creation.id}
                    className="overflow-hidden rounded-[var(--radius)] border border-[var(--line)] bg-[var(--surface)]"
                  >
                    <Link href={`/creations/${creation.id}`} className="block">
                      <div className="grid h-[200px] grid-cols-1 gap-0.5 bg-[var(--line)] sm:h-[240px] sm:grid-cols-[1fr_1.25fr] md:h-[290px]">
                        {creation.source ? (
                          // eslint-disable-next-line @next/next/no-img-element
                          <img
                            src={creation.source}
                            alt="Source photo"
                            className="h-full max-h-[140px] w-full object-cover sm:max-h-none"
                          />
                        ) : (
                          <div className="grid min-h-[100px] place-items-center bg-[var(--surface-2)] text-xs text-[var(--muted)] sm:min-h-0">
                            No source photo saved
                          </div>
                        )}
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={creation.result}
                          alt="Saved AI result"
                          className="h-full max-h-[140px] w-full object-cover sm:max-h-none"
                        />
                      </div>
                    </Link>
                    <div className="p-[19px]">
                      <div className="flex flex-col gap-1 text-[11px] text-[var(--muted)] sm:flex-row sm:justify-between sm:gap-3">
                        <span>{creation.styleName}</span>
                        <span>{creation.date}</span>
                      </div>
                      <h3 className="my-2">
                        <Link
                          href={`/creations/${creation.id}`}
                          className="text-inherit no-underline hover:underline"
                        >
                          {creation.styleName}
                        </Link>
                      </h3>
                      {creation.notes ? (
                        <p className="mb-4 text-[13px] text-[var(--muted)]">{creation.notes}</p>
                      ) : null}
                      <div className="mb-4 max-h-[74px] overflow-auto rounded-[10px] bg-[#101016] p-2.5 font-mono text-[11px] leading-normal text-[#bebbc7]">
                        {creation.prompt}
                      </div>
                      <div className="flex flex-wrap gap-2">
                        <Link
                          href={`/creations/${creation.id}`}
                          className="inline-flex min-h-11 items-center justify-center rounded-xl border border-[var(--line)] bg-[var(--surface-2)] px-[18px] text-sm font-bold"
                        >
                          Open
                        </Link>
                        <Button
                          variant="danger"
                          disabled={deletingId === creation.id}
                          onClick={() => {
                            void (async () => {
                              setDeletingId(creation.id);
                              const ok = await deleteCreation(creation.id);
                              setDeletingId(null);
                              if (ok) toast("Creation deleted.");
                              else toast("Could not delete creation.", "error");
                            })();
                          }}
                        >
                          Delete
                        </Button>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            ) : (
              <EmptyState
                icon="↔"
                title="Your transformations will appear here"
                description="Create them in an AI image editor, then save the finished images privately here."
                action={
                  <Link
                    href="/explore"
                    className="inline-flex min-h-11 items-center justify-center rounded-xl bg-[var(--violet)] px-[18px] text-sm font-bold text-[#100d1a]"
                  >
                    Find a style
                  </Link>
                }
              />
            )}
          </>
        ) : null}
      </section>
    </div>
  );
}
