"use client";

import Image from "next/image";
import Link from "next/link";
import { useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/providers/toast-provider";
import {
  filterHomepageAdminStyles,
  MAX_NEW_PINS,
  MAX_TRENDING,
  type HomepageAdminData,
  type HomepageAdminStyle,
} from "@/lib/admin/homepage";
import type { HomepageSettings } from "@/lib/home/curation";

type ListKey = "hero" | "trending" | "new" | "hiddenNew" | "bannerLinks" | "bannerImages";
type PickerState = { key: ListKey; title: string; max: number } | null;
type Controls = Pick<
  HomepageAdminStyle,
  | "showOnHome"
  | "hideFromNew"
  | "exploreWeight"
  | "excludeFromExplore"
  | "allowInHero"
  | "heroPriority"
>;

const DEFAULT_CONTROLS: Controls = {
  showOnHome: true,
  hideFromNew: false,
  exploreWeight: 0,
  excludeFromExplore: false,
  allowInHero: true,
  heroPriority: 0,
};

export function HomepageCurationClient({
  initialData,
  seasons,
}: {
  initialData: HomepageAdminData;
  seasons: Array<{ id: string; label: string }>;
}) {
  const { toast } = useToast();
  const [settings, setSettings] = useState(initialData.settings);
  const [trending, setTrending] = useState(
    initialData.styles
      .filter((style) => style.trendingRank != null)
      .sort((a, b) => (a.trendingRank ?? 99) - (b.trendingRank ?? 99))
      .map((style) => style.id),
  );
  const [newPins, setNewPins] = useState(
    initialData.styles
      .filter((style) => style.pinNewRank != null)
      .sort((a, b) => (a.pinNewRank ?? 99) - (b.pinNewRank ?? 99))
      .map((style) => style.id),
  );
  const [controls, setControls] = useState<Record<string, Controls>>(() =>
    Object.fromEntries(
      initialData.styles.map((style) => [
        style.id,
        {
          showOnHome: style.showOnHome,
          hideFromNew: style.hideFromNew,
          exploreWeight: style.exploreWeight,
          excludeFromExplore: style.excludeFromExplore,
          allowInHero: style.allowInHero,
          heroPriority: style.heroPriority,
        },
      ]),
    ),
  );
  const [exploreEdited, setExploreEdited] = useState(
    () =>
      new Set(
        initialData.styles
          .filter(
            (style) =>
              !style.showOnHome ||
              style.exploreWeight !== 0 ||
              style.excludeFromExplore ||
              !style.allowInHero ||
              style.heroPriority !== 0,
          )
          .map((style) => style.id),
      ),
  );
  const [picker, setPicker] = useState<PickerState>(null);
  const [busy, setBusy] = useState(false);
  const byId = useMemo(
    () => new Map(initialData.styles.map((style) => [style.id, style])),
    [initialData.styles],
  );
  const bySlug = useMemo(
    () => new Map(initialData.styles.map((style) => [style.slug, style])),
    [initialData.styles],
  );

  const hiddenNew = initialData.styles
    .filter((style) => controls[style.id]?.hideFromNew)
    .map((style) => style.id);

  function idsFor(key: ListKey): string[] {
    if (key === "hero")
      return settings.heroSlugs
        .map((slug) => bySlug.get(slug)?.id)
        .filter(Boolean) as string[];
    if (key === "trending") return trending;
    if (key === "new") return newPins;
    if (key === "hiddenNew") return hiddenNew;
    if (key === "bannerLinks")
      return settings.seasonStyleSlugs
        .map((slug) => bySlug.get(slug)?.id)
        .filter(Boolean) as string[];
    return settings.seasonImageSlugs
      .map((slug) => bySlug.get(slug)?.id)
      .filter(Boolean) as string[];
  }

  function setIds(key: ListKey, ids: string[]) {
    if (key === "trending") return setTrending(ids);
    if (key === "new") return setNewPins(ids);
    if (key === "hiddenNew") {
      setControls((current) => {
        const selected = new Set(ids);
        return Object.fromEntries(
          Object.entries(current).map(([id, value]) => [
            id,
            { ...value, hideFromNew: selected.has(id) },
          ]),
        );
      });
      return;
    }
    const slugs = ids.map((id) => byId.get(id)?.slug).filter(Boolean) as string[];
    const field =
      key === "hero"
        ? "heroSlugs"
        : key === "bannerLinks"
          ? "seasonStyleSlugs"
          : "seasonImageSlugs";
    setSettings((current) => ({ ...current, [field]: slugs }));
  }

  function addExploreStyle(id: string) {
    setExploreEdited((current) => new Set([...current, id]));
  }

  function updateControl(id: string, patch: Partial<Controls>) {
    setControls((current) => ({
      ...current,
      [id]: { ...(current[id] ?? DEFAULT_CONTROLS), ...patch },
    }));
    addExploreStyle(id);
  }

  async function save() {
    setBusy(true);
    const styleOverrides = Object.entries(controls)
      .filter(([, value]) => JSON.stringify(value) !== JSON.stringify(DEFAULT_CONTROLS))
      .map(([id, value]) => ({ id, ...value }));
    const response = await fetch("/api/admin/homepage", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        settings,
        trendingStyleIds: trending,
        newPinStyleIds: newPins,
        styleOverrides,
      }),
    });
    const payload = (await response.json().catch(() => ({}))) as { error?: string };
    setBusy(false);
    if (!response.ok) {
      toast(payload.error ?? "Could not save homepage curation.", "error");
      return;
    }
    toast("Homepage curation saved.");
  }

  return (
    <main className="container py-10 pb-24 sm:py-16">
      <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
        <div>
          <Link
            href="/admin"
            className="text-sm text-[var(--muted)] hover:text-[var(--text)]"
          >
            ← Style lifecycle
          </Link>
          <h1 className="mt-3 mb-2 text-[clamp(32px,6vw,56px)] tracking-[-0.04em]">
            Homepage curation
          </h1>
          <p className="m-0 max-w-[66ch] text-[var(--muted)]">
            Choose styles by their after image. Homepage media always comes from the
            style’s primary result asset—no duplicate uploads.
          </p>
        </div>
        <Button
          onClick={() => void save()}
          disabled={busy || Boolean(initialData.loadError)}
          data-testid="save-homepage-curation"
        >
          {busy ? "Saving…" : "Save homepage"}
        </Button>
      </div>

      {initialData.loadError ? (
        <div
          role="alert"
          className="mb-6 rounded-xl border border-red-500/40 bg-red-500/10 p-4 text-sm text-red-200"
        >
          <b>Homepage curation data failed to load.</b> {initialData.loadError} Saving is
          disabled to protect the existing curation.
        </div>
      ) : null}

      <div className="grid gap-6">
        <Panel
          number="1"
          title="Hero background wall"
          description="Order up to 40 result images. Auto-fill uses eligible styles by hero priority, then popularity."
        >
          <OrderedStyles
            styles={idsFor("hero")}
            byId={byId}
            onChange={(ids) => setIds("hero", ids)}
          />
          <PanelActions
            onPick={() =>
              setPicker({ key: "hero", title: "Choose hero after-images", max: 40 })
            }
          >
            <label className="flex items-center gap-2 text-sm">
              <input
                type="checkbox"
                checked={settings.heroAutoFill}
                onChange={(event) =>
                  setSettings((current) => ({
                    ...current,
                    heroAutoFill: event.target.checked,
                  }))
                }
              />
              Auto-fill when the list is short
            </label>
          </PanelActions>
        </Panel>

        <Panel
          number="2"
          title="Featured / Trending rail"
          description={`Pick ${MAX_TRENDING} or fewer after-images. Drag the selected cards to set rank.`}
        >
          <OrderedStyles styles={trending} byId={byId} onChange={setTrending} />
          <PanelActions
            onPick={() =>
              setPicker({
                key: "trending",
                title: "Choose Trending after-images",
                max: MAX_TRENDING,
              })
            }
          />
        </Panel>

        <Panel
          number="3"
          title="New styles rail"
          description="Newest published styles appear automatically. Pin up to five first, or hide individual styles from this rail."
        >
          <h3 className="mb-2 text-sm">Pinned first</h3>
          <OrderedStyles styles={newPins} byId={byId} onChange={setNewPins} />
          <PanelActions
            onPick={() =>
              setPicker({
                key: "new",
                title: "Choose up to 5 pinned after-images",
                max: MAX_NEW_PINS,
              })
            }
          />
          <h3 className="mt-6 mb-2 text-sm">Hidden from New</h3>
          <OrderedStyles
            styles={hiddenNew}
            byId={byId}
            onChange={(ids) => setIds("hiddenNew", ids)}
          />
          <PanelActions
            onPick={() =>
              setPicker({
                key: "hiddenNew",
                title: "Hide styles from New",
                max: initialData.styles.length,
              })
            }
          />
        </Panel>

        <Panel
          number="4"
          title="Explore everything"
          description="Popularity stays the default. Add only exceptions, then boost, bury, exclude, or hide them from all homepage sections."
        >
          <div className="grid gap-3">
            {[...exploreEdited].map((id) => {
              const style = byId.get(id);
              if (!style) return null;
              const value = controls[id] ?? DEFAULT_CONTROLS;
              return (
                <div
                  key={id}
                  className="grid gap-3 rounded-xl border border-[var(--line)] bg-[var(--surface-2)] p-3 sm:grid-cols-[72px_1fr]"
                >
                  <StyleThumb style={style} />
                  <div>
                    <div className="mb-3 flex justify-between gap-2">
                      <b>{style.title}</b>
                      <button
                        type="button"
                        className="text-xs text-[var(--muted)] underline"
                        onClick={() => {
                          updateControl(id, DEFAULT_CONTROLS);
                          setExploreEdited((current) => {
                            const next = new Set(current);
                            next.delete(id);
                            return next;
                          });
                        }}
                      >
                        Reset
                      </button>
                    </div>
                    <div className="flex flex-wrap items-center gap-4 text-sm">
                      <label>
                        Weight{" "}
                        <input
                          className="ml-1 w-20 rounded-lg border border-[var(--line)] bg-[var(--surface)] px-2 py-1.5"
                          type="number"
                          min={-100}
                          max={100}
                          value={value.exploreWeight}
                          onChange={(event) =>
                            updateControl(id, {
                              exploreWeight: Number(event.target.value),
                            })
                          }
                        />
                      </label>
                      <Check
                        label="Exclude from Explore"
                        checked={value.excludeFromExplore}
                        onChange={(checked) =>
                          updateControl(id, { excludeFromExplore: checked })
                        }
                      />
                      <Check
                        label="Show on home"
                        checked={value.showOnHome}
                        onChange={(checked) => updateControl(id, { showOnHome: checked })}
                      />
                      <Check
                        label="Allow in hero"
                        checked={value.allowInHero}
                        onChange={(checked) =>
                          updateControl(id, { allowInHero: checked })
                        }
                      />
                      <label>
                        Hero priority{" "}
                        <input
                          className="ml-1 w-20 rounded-lg border border-[var(--line)] bg-[var(--surface)] px-2 py-1.5"
                          type="number"
                          min={-100}
                          max={100}
                          value={value.heroPriority}
                          onChange={(event) =>
                            updateControl(id, {
                              heroPriority: Number(event.target.value),
                            })
                          }
                        />
                      </label>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
          <div className="mt-4">
            <Button
              variant="ghost"
              onClick={() =>
                setPicker({
                  key: "bannerImages",
                  title: "Choose styles to adjust",
                  max: initialData.styles.length,
                })
              }
            >
              Add style adjustment
            </Button>
          </div>
        </Panel>

        <Panel
          number="5"
          title="Season / event banner"
          description="Keep the calendar, hide the banner, or override an event and its copy, links, and displayed after-images."
        >
          <div className="grid gap-3 md:grid-cols-2">
            <Field label="Mode">
              <select
                value={settings.seasonMode}
                onChange={(event) =>
                  setSettings((current) => ({
                    ...current,
                    seasonMode: event.target.value as HomepageSettings["seasonMode"],
                  }))
                }
                className="admin-curation-input"
              >
                <option value="calendar">Calendar (automatic)</option>
                <option value="override">Override</option>
                <option value="hidden">Hidden</option>
              </select>
            </Field>
            <Field label="Event">
              <select
                value={settings.seasonId ?? ""}
                onChange={(event) =>
                  setSettings((current) => ({
                    ...current,
                    seasonId: event.target.value || null,
                  }))
                }
                className="admin-curation-input"
              >
                <option value="">Current calendar event</option>
                {seasons.map((season) => (
                  <option key={season.id} value={season.id}>
                    {season.label}
                  </option>
                ))}
              </select>
            </Field>
            <Field label="Eyebrow">
              <input
                className="admin-curation-input"
                value={settings.seasonEyebrow ?? ""}
                onChange={(event) =>
                  setSettings((current) => ({
                    ...current,
                    seasonEyebrow: event.target.value || null,
                  }))
                }
              />
            </Field>
            <Field label="Headline">
              <input
                className="admin-curation-input"
                value={settings.seasonHeadline ?? ""}
                onChange={(event) =>
                  setSettings((current) => ({
                    ...current,
                    seasonHeadline: event.target.value || null,
                  }))
                }
              />
            </Field>
            <Field label="Body">
              <textarea
                className="admin-curation-input min-h-24"
                value={settings.seasonBody ?? ""}
                onChange={(event) =>
                  setSettings((current) => ({
                    ...current,
                    seasonBody: event.target.value || null,
                  }))
                }
              />
            </Field>
            <Field label="Chips (Label | query | sparkle/couple/family)">
              <textarea
                className="admin-curation-input min-h-24"
                value={(settings.seasonChips ?? [])
                  .map((chip) => `${chip.label} | ${chip.q} | ${chip.icon}`)
                  .join("\n")}
                onChange={(event) =>
                  setSettings((current) => ({
                    ...current,
                    seasonChips: parseChips(event.target.value),
                  }))
                }
              />
            </Field>
          </div>
          <h3 className="mt-6 mb-2 text-sm">Linked styles</h3>
          <OrderedStyles
            styles={idsFor("bannerLinks")}
            byId={byId}
            onChange={(ids) => setIds("bannerLinks", ids)}
          />
          <PanelActions
            onPick={() =>
              setPicker({
                key: "bannerLinks",
                title: "Choose event-linked styles",
                max: 12,
              })
            }
          />
          <h3 className="mt-6 mb-2 text-sm">Images displayed on banner</h3>
          <OrderedStyles
            styles={idsFor("bannerImages")}
            byId={byId}
            onChange={(ids) => setIds("bannerImages", ids)}
          />
          <PanelActions
            onPick={() =>
              setPicker({
                key: "bannerImages",
                title: "Choose event banner after-images",
                max: 8,
              })
            }
          />
        </Panel>
      </div>

      {picker ? (
        <ImagePicker
          title={picker.title}
          styles={initialData.styles}
          selected={
            picker.key === "bannerImages" && picker.title === "Choose styles to adjust"
              ? [...exploreEdited]
              : idsFor(picker.key)
          }
          max={picker.max}
          loadError={initialData.stylesLoadError}
          onClose={() => setPicker(null)}
          onChange={(ids) => {
            if (
              picker.key === "bannerImages" &&
              picker.title === "Choose styles to adjust"
            ) {
              const nextIds = new Set(ids);
              setControls((current) =>
                Object.fromEntries(
                  Object.entries(current).map(([id, value]) => [
                    id,
                    exploreEdited.has(id) && !nextIds.has(id) ? DEFAULT_CONTROLS : value,
                  ]),
                ),
              );
              setExploreEdited(new Set(ids));
            } else {
              setIds(picker.key, ids);
            }
          }}
        />
      ) : null}
    </main>
  );
}

function Panel({
  number,
  title,
  description,
  children,
}: {
  number: string;
  title: string;
  description: string;
  children: React.ReactNode;
}) {
  return (
    <section className="rounded-[var(--radius)] border border-[var(--line)] bg-[var(--surface)] p-5 sm:p-6">
      <div className="mb-5">
        <p className="m-0 text-xs font-bold tracking-widest text-[var(--violet)] uppercase">
          Section {number}
        </p>
        <h2 className="mt-1 mb-1 text-2xl">{title}</h2>
        <p className="m-0 max-w-[70ch] text-sm text-[var(--muted)]">{description}</p>
      </div>
      {children}
    </section>
  );
}

function PanelActions({
  onPick,
  children,
}: {
  onPick: () => void;
  children?: React.ReactNode;
}) {
  return (
    <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
      <Button variant="ghost" onClick={onPick}>
        Choose from after-images
      </Button>
      {children}
    </div>
  );
}

function OrderedStyles({
  styles,
  byId,
  onChange,
}: {
  styles: string[];
  byId: Map<string, HomepageAdminStyle>;
  onChange: (ids: string[]) => void;
}) {
  const [dragged, setDragged] = useState<string | null>(null);
  if (styles.length === 0)
    return (
      <p className="rounded-xl border border-dashed border-[var(--line)] p-4 text-sm text-[var(--muted)]">
        No manual selection. The homepage fallback remains active.
      </p>
    );
  return (
    <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
      {styles.map((id, index) => {
        const style = byId.get(id);
        if (!style) return null;
        return (
          <div
            key={id}
            draggable
            onDragStart={() => setDragged(id)}
            onDragOver={(event) => event.preventDefault()}
            onDrop={() => {
              if (!dragged || dragged === id) return;
              const next = [...styles];
              const from = next.indexOf(dragged);
              const to = next.indexOf(id);
              next.splice(from, 1);
              next.splice(to, 0, dragged);
              onChange(next);
              setDragged(null);
            }}
            className="relative cursor-grab rounded-xl border border-[var(--line)] bg-[var(--surface-2)] p-2"
          >
            <span className="absolute top-3 left-3 z-10 grid h-6 w-6 place-items-center rounded-full bg-black/70 text-xs font-bold text-white">
              {index + 1}
            </span>
            <StyleThumb style={style} />
            <p className="mt-2 mb-0 truncate text-xs font-bold">{style.title}</p>
            <button
              type="button"
              aria-label={`Remove ${style.title}`}
              className="absolute top-3 right-3 z-10 rounded-full bg-black/70 px-2 py-1 text-xs text-white"
              onClick={() => onChange(styles.filter((item) => item !== id))}
            >
              ×
            </button>
          </div>
        );
      })}
    </div>
  );
}

function StyleThumb({ style }: { style: HomepageAdminStyle }) {
  return (
    <div className="relative aspect-[4/5] overflow-hidden rounded-lg bg-[var(--surface)]">
      {style.resultUrl ? (
        <Image
          src={style.resultUrl}
          alt={`${style.title} after image`}
          fill
          sizes="160px"
          className="object-cover"
        />
      ) : (
        <span className="grid h-full place-items-center text-xs text-[var(--muted)]">
          No image
        </span>
      )}
    </div>
  );
}

function ImagePicker({
  title,
  styles,
  selected,
  max,
  loadError,
  onChange,
  onClose,
}: {
  title: string;
  styles: HomepageAdminStyle[];
  selected: string[];
  max: number;
  loadError: string | null;
  onChange: (ids: string[]) => void;
  onClose: () => void;
}) {
  const [query, setQuery] = useState("");
  const selectedSet = new Set(selected);
  const visible = filterHomepageAdminStyles(styles, query);
  return (
    <div
      className="fixed inset-0 z-[100] grid place-items-center bg-black/70 p-3"
      role="dialog"
      aria-modal="true"
    >
      <div className="flex max-h-[92vh] w-full max-w-5xl flex-col rounded-[var(--radius)] border border-[var(--line)] bg-[var(--surface)] p-4 shadow-2xl sm:p-6">
        <div className="mb-4 flex items-start justify-between gap-3">
          <div>
            <h2 className="m-0 text-2xl">{title}</h2>
            <p className="m-0 mt-1 text-sm text-[var(--muted)]">
              {selected.length} selected{Number.isFinite(max) ? ` · max ${max}` : ""}
            </p>
          </div>
          <Button variant="ghost" onClick={onClose}>
            Done
          </Button>
        </div>
        <input
          autoFocus
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder="Search styles…"
          className="admin-curation-input mb-4"
        />
        <div className="grid min-h-0 flex-1 grid-cols-2 gap-3 overflow-y-auto pr-1 sm:grid-cols-3 md:grid-cols-5">
          {visible.map((style) => {
            const checked = selectedSet.has(style.id);
            return (
              <button
                type="button"
                key={style.id}
                aria-pressed={checked}
                className={`rounded-xl border p-2 text-left ${checked ? "border-[var(--violet)] bg-[rgba(139,108,255,.12)]" : "border-[var(--line)] bg-[var(--surface-2)]"}`}
                onClick={() => {
                  if (checked) onChange(selected.filter((id) => id !== style.id));
                  else if (selected.length < max) onChange([...selected, style.id]);
                }}
              >
                <StyleThumb style={style} />
                <span className="mt-2 block truncate text-xs font-bold">
                  {checked ? "✓ " : ""}
                  {style.title}
                </span>
              </button>
            );
          })}
          {visible.length === 0 ? (
            <p className="col-span-full m-0 rounded-xl border border-dashed border-[var(--line)] p-6 text-center text-sm text-[var(--muted)]">
              {loadError
                ? "Styles could not be loaded. Apply the latest Supabase migrations and refresh this page."
                : styles.length === 0
                  ? "No published styles are available."
                  : `No styles match “${query.trim()}”. Try another search.`}
            </p>
          ) : null}
        </div>
      </div>
    </div>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="grid gap-1.5 text-sm font-bold">
      {label}
      {children}
    </label>
  );
}

function Check({
  label,
  checked,
  onChange,
}: {
  label: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
}) {
  return (
    <label className="flex items-center gap-2">
      <input
        type="checkbox"
        checked={checked}
        onChange={(event) => onChange(event.target.checked)}
      />
      {label}
    </label>
  );
}

function parseChips(value: string): HomepageSettings["seasonChips"] {
  const chips = value
    .split("\n")
    .map((line) => line.split("|").map((item) => item.trim()))
    .filter((parts) => parts[0] && parts[1])
    .map(([label, q, icon]) => {
      const chipIcon: "couple" | "family" | "sparkle" =
        icon === "couple" || icon === "family" ? icon : "sparkle";
      return { label: label!, q: q!, icon: chipIcon };
    });
  return chips.length > 0 ? chips : null;
}
