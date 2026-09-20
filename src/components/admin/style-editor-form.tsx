"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useMemo, useState, type FormEvent, type ReactNode } from "react";
import { Button } from "@/components/ui/button";
import type { AdminStyleContentInput } from "@/lib/admin/schemas";
import type { AdminStyleEditorPayload } from "@/lib/admin/styles-read";
import {
  backgroundOptions,
  moodOptions,
  previewPrompt,
  ratioOptions,
} from "@/lib/catalog/prompts";
import { categories, filterGroups } from "@/lib/catalog/styles";
import type { CatalogStyle } from "@/lib/catalog/types";
import { useToast } from "@/components/providers/toast-provider";
import { cn } from "@/lib/utils";

const DEFAULT_TEMPLATE = `Edit the uploaded {{subject}} photo into this look. Use the main subject in the source image as the subject. Preserve {{preserve}}. Apply a refined treatment with {{mood}} color grading. Use {{background}} while keeping natural, accurate edges around the subject. Keep important textures realistic. Do not add people, lettering, or logos. Compose for {{ratio}} without cropping important features.`;

export function emptyStyleForm(): AdminStyleContentInput {
  return {
    title: "",
    slug: "",
    category: "Cinematic",
    subject: "Person",
    intent: "Artistic restyle",
    requirement: "One photo",
    tool: "ChatGPT Image",
    note: "",
    description: "",
    bestSourcePhoto: ["One clear frontal photo"],
    changes: ["Lighting", "Background"],
    stays: ["Recognizable identity", "Facial proportions"],
    targetSourcePhoto: "One clear frontal photo of the subject",
    cardHeight: 330,
    cardSourceUrl: "https://picsum.photos/seed/admin-card-source/900/1100",
    cardResultUrl: "https://picsum.photos/seed/admin-card-result/900/1100",
    examplePairs: [
      {
        sourceUrl: "https://picsum.photos/seed/admin-ex-source-1/650/800",
        resultUrl: "https://picsum.photos/seed/admin-ex-result-1/650/800",
        altSource: "Source example 1",
        altResult: "Result example 1",
      },
      {
        sourceUrl: "https://picsum.photos/seed/admin-ex-source-2/650/800",
        resultUrl: "https://picsum.photos/seed/admin-ex-result-2/650/800",
        altSource: "Source example 2",
        altResult: "Result example 2",
      },
    ],
    variant: {
      tool: "ChatGPT Image",
      mode: "Image edit",
      version: "v1",
      template: DEFAULT_TEMPLATE,
      defaults: {
        mood: "Warm neutral",
        background: "Softly blurred interior",
        ratio: "4:5 Portrait",
        keepClothing: true,
        keepPose: true,
      },
      limitations: ["Works best with a clear, well-lit source photo."],
      lastVerified: new Date().toISOString().slice(0, 10),
      inputImageCount: 1,
      inputImageRoles: ["source photo"],
    },
  };
}

function slugifyTitle(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "")
    .slice(0, 80);
}

function toPreviewStyle(form: AdminStyleContentInput): CatalogStyle {
  return {
    id: form.slug || "preview",
    title: form.title || "Untitled",
    category: form.category,
    subject: form.subject,
    intent: form.intent,
    requirement: form.requirement,
    tool: form.variant.tool,
    note: form.note,
    height: form.cardHeight ?? 330,
    saved: 0,
    source: form.cardSourceUrl,
    result: form.cardResultUrl,
    description: form.description,
    status: "draft",
    bestSourcePhoto: form.bestSourcePhoto,
    changes: form.changes,
    stays: form.stays,
    targetSourcePhoto: form.targetSourcePhoto,
    examplePairs: form.examplePairs.map((p) => ({
      source: p.sourceUrl,
      result: p.resultUrl,
      altSource: p.altSource,
      altResult: p.altResult,
    })),
    promptVariant: {
      id: "preview",
      version: form.variant.version,
      tool: form.variant.tool,
      mode: form.variant.mode,
      inputImageCount: form.variant.inputImageCount ?? 1,
      inputImageRoles: form.variant.inputImageRoles ?? ["source photo"],
      template: form.variant.template,
      defaults: form.variant.defaults,
      lastVerified: form.variant.lastVerified,
      limitations: form.variant.limitations,
    },
  };
}

type Props = {
  mode: "create" | "edit";
  styleId?: string;
  initial?: AdminStyleContentInput;
  lockSlug?: boolean;
  statusLabel?: string;
};

export function StyleEditorForm({
  mode,
  styleId,
  initial,
  lockSlug = false,
  statusLabel,
}: Props) {
  const router = useRouter();
  const { toast } = useToast();
  const [form, setForm] = useState<AdminStyleContentInput>(
    initial ?? emptyStyleForm(),
  );
  const [busy, setBusy] = useState(false);
  const [slugTouched, setSlugTouched] = useState(mode === "edit");
  const [uploading, setUploading] = useState<string | null>(null);

  const preview = useMemo(() => {
    const style = toPreviewStyle(form);
    return previewPrompt(style, form.variant.defaults);
  }, [form]);

  function patch<K extends keyof AdminStyleContentInput>(
    key: K,
    value: AdminStyleContentInput[K],
  ) {
    setForm((prev) => ({ ...prev, [key]: value }));
  }

  function patchList(
    key: "bestSourcePhoto" | "changes" | "stays",
    raw: string,
  ) {
    // Keep empty lines and trailing spaces while typing so Enter/Space work.
    // Normalize (trim + drop blanks) on submit.
    patch(key, raw.split("\n"));
  }

  function normalizeLines(lines: string[]): string[] {
    return lines.map((l) => l.trim()).filter(Boolean);
  }

  async function onSubmit(event: FormEvent) {
    event.preventDefault();
    setBusy(true);
    const payloadBody: AdminStyleContentInput = {
      ...form,
      bestSourcePhoto: normalizeLines(form.bestSourcePhoto),
      changes: normalizeLines(form.changes),
      stays: normalizeLines(form.stays),
      variant: {
        ...form.variant,
        limitations: normalizeLines(form.variant.limitations),
      },
    };
    const url =
      mode === "create" ? "/api/admin/styles" : `/api/admin/styles/${styleId}`;
    const method = mode === "create" ? "POST" : "PUT";
    const response = await fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payloadBody),
    });
    const payload = (await response.json().catch(() => ({}))) as {
      style?: AdminStyleEditorPayload;
      error?: string;
    };
    setBusy(false);
    if (!response.ok || !payload.style) {
      toast(payload.error ?? "Could not save style.", "error");
      return;
    }
    toast(mode === "create" ? "Draft style created." : "Style saved.");
    router.push(`/admin/styles/${payload.style.slug}/edit`);
    router.refresh();
  }

  async function uploadImage(
    file: File | undefined,
    target:
      | { kind: "card"; role: "source" | "result" }
      | { kind: "example"; index: number; role: "source" | "result" },
  ) {
    if (!file || !styleId) {
      toast("Save the style once before uploading files.", "error");
      return;
    }
    const key =
      target.kind === "card"
        ? `card-${target.role}`
        : `ex-${target.index}-${target.role}`;
    setUploading(key);
    const meta = {
      kind: target.kind === "card" ? "card_pair" : "example_pair",
      altText:
        target.kind === "card"
          ? `${form.title} card ${target.role}`
          : form.examplePairs[target.index]?.altSource || "Example",
      sortOrder: target.kind === "card" ? 0 : target.index + 1,
      provenance: {
        owner: "",
        licence: "uploaded",
        modelRelease: false,
        notes: "",
      },
    };
    const body = new FormData();
    body.append("file", file);
    body.append("role", target.role);
    body.append("meta", JSON.stringify(meta));

    const response = await fetch(`/api/admin/styles/${styleId}/assets`, {
      method: "POST",
      body,
    });
    const payload = (await response.json().catch(() => ({}))) as {
      url?: string;
      error?: string;
    };
    setUploading(null);
    if (!response.ok || !payload.url) {
      toast(payload.error ?? "Upload failed.", "error");
      return;
    }
    if (target.kind === "card") {
      if (target.role === "source") patch("cardSourceUrl", payload.url);
      else patch("cardResultUrl", payload.url);
    } else {
      const next = form.examplePairs.map((pair, i) => {
        if (i !== target.index) return pair;
        return target.role === "source"
          ? { ...pair, sourceUrl: payload.url! }
          : { ...pair, resultUrl: payload.url! };
      });
      patch("examplePairs", next);
    }
    toast("Image uploaded. Save the form to persist URLs on the style.");
  }

  return (
    <form onSubmit={(e) => void onSubmit(e)} className="grid gap-8 pb-[100px]">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="m-0 mb-2 text-[11px] font-bold tracking-[0.08em] text-[var(--muted)] uppercase">
            {mode === "create" ? "New style" : "Edit style"}
            {statusLabel ? ` · ${statusLabel}` : ""}
          </p>
          <h1 className="m-0 text-[clamp(28px,3.5vw,44px)] tracking-[-0.04em]">
            {form.title || "Untitled style"}
          </h1>
        </div>
        <div className="flex flex-wrap gap-2">
          <Link
            href="/admin"
            className="inline-flex min-h-11 items-center justify-center rounded-xl border border-[var(--line)] bg-[var(--surface-2)] px-[18px] text-sm font-bold"
          >
            Back to list
          </Link>
          <Button type="submit" disabled={busy} data-testid="admin-style-save">
            {busy ? "Saving…" : mode === "create" ? "Create draft" : "Save changes"}
          </Button>
        </div>
      </div>

      <Section title="Identity">
        <Field label="Title">
          <input
            required
            value={form.title}
            data-testid="admin-style-title"
            onChange={(e) => {
              const title = e.target.value;
              setForm((prev) => ({
                ...prev,
                title,
                slug:
                  !slugTouched && !lockSlug ? slugifyTitle(title) : prev.slug,
              }));
            }}
            className={inputClass}
          />
        </Field>
        <Field label="Slug (URL)">
          <input
            required
            value={form.slug}
            disabled={lockSlug}
            data-testid="admin-style-slug"
            onChange={(e) => {
              setSlugTouched(true);
              patch("slug", e.target.value);
            }}
            className={cn(inputClass, lockSlug && "opacity-60")}
          />
        </Field>
      </Section>

      <Section title="Taxonomy">
        <div className="grid gap-3 sm:grid-cols-2">
          <SelectField
            label="Category"
            value={form.category}
            options={[...categories]}
            onChange={(v) => patch("category", v as AdminStyleContentInput["category"])}
          />
          <SelectField
            label="Subject"
            value={form.subject}
            options={[...filterGroups.subject]}
            onChange={(v) => patch("subject", v as AdminStyleContentInput["subject"])}
          />
          <SelectField
            label="Edit intent"
            value={form.intent}
            options={[...filterGroups.intent]}
            onChange={(v) => patch("intent", v as AdminStyleContentInput["intent"])}
          />
          <SelectField
            label="Input requirement"
            value={form.requirement}
            options={[...filterGroups.requirement]}
            onChange={(v) =>
              patch("requirement", v as AdminStyleContentInput["requirement"])
            }
          />
          <SelectField
            label="Tool (card badge)"
            value={form.tool}
            options={[...filterGroups.tool]}
            onChange={(v) => {
              const tool = v as AdminStyleContentInput["tool"];
              setForm((prev) => ({
                ...prev,
                tool,
                variant: { ...prev.variant, tool },
              }));
            }}
          />
        </div>
      </Section>

      <Section title="Copy">
        <Field label="Card note">
          <input
            required
            value={form.note}
            onChange={(e) => patch("note", e.target.value)}
            className={inputClass}
          />
        </Field>
        <Field label="Description">
          <textarea
            required
            rows={3}
            value={form.description}
            onChange={(e) => patch("description", e.target.value)}
            className={inputClass}
          />
        </Field>
        <Field label="Target source photo">
          <input
            required
            value={form.targetSourcePhoto}
            onChange={(e) => patch("targetSourcePhoto", e.target.value)}
            className={inputClass}
          />
        </Field>
        <Field label="Best source photo (one per line)">
          <textarea
            rows={3}
            value={form.bestSourcePhoto.join("\n")}
            onChange={(e) => patchList("bestSourcePhoto", e.target.value)}
            className={inputClass}
          />
        </Field>
        <div className="grid gap-3 sm:grid-cols-2">
          <Field label="What changes (one per line)">
            <textarea
              rows={4}
              value={form.changes.join("\n")}
              onChange={(e) => patchList("changes", e.target.value)}
              className={inputClass}
            />
          </Field>
          <Field label="What stays (one per line)">
            <textarea
              rows={4}
              value={form.stays.join("\n")}
              onChange={(e) => patchList("stays", e.target.value)}
              className={inputClass}
            />
          </Field>
        </div>
      </Section>

      <Section title="Primary prompt variant">
        <div className="grid gap-3 sm:grid-cols-2">
          <SelectField
            label="Tool"
            value={form.variant.tool}
            options={[...filterGroups.tool]}
            onChange={(v) =>
              setForm((prev) => ({
                ...prev,
                tool: v as AdminStyleContentInput["tool"],
                variant: {
                  ...prev.variant,
                  tool: v as AdminStyleContentInput["variant"]["tool"],
                },
              }))
            }
          />
          <Field label="Mode">
            <input
              required
              value={form.variant.mode}
              onChange={(e) =>
                setForm((prev) => ({
                  ...prev,
                  variant: { ...prev.variant, mode: e.target.value },
                }))
              }
              className={inputClass}
            />
          </Field>
          <Field label="Version">
            <input
              required
              value={form.variant.version}
              onChange={(e) =>
                setForm((prev) => ({
                  ...prev,
                  variant: { ...prev.variant, version: e.target.value },
                }))
              }
              className={inputClass}
            />
          </Field>
          <Field label="Last verified">
            <input
              required
              value={form.variant.lastVerified}
              onChange={(e) =>
                setForm((prev) => ({
                  ...prev,
                  variant: { ...prev.variant, lastVerified: e.target.value },
                }))
              }
              className={inputClass}
            />
          </Field>
        </div>
        <Field label="Template (use {{mood}} {{background}} {{ratio}} {{preserve}} {{subject}})">
          <textarea
            required
            rows={8}
            value={form.variant.template}
            data-testid="admin-style-template"
            onChange={(e) =>
              setForm((prev) => ({
                ...prev,
                variant: { ...prev.variant, template: e.target.value },
              }))
            }
            className={cn(inputClass, "font-mono text-[12px]")}
          />
        </Field>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          <SelectField
            label="Default mood"
            value={form.variant.defaults.mood}
            options={[...moodOptions]}
            onChange={(v) =>
              setForm((prev) => ({
                ...prev,
                variant: {
                  ...prev.variant,
                  defaults: {
                    ...prev.variant.defaults,
                    mood: v as typeof prev.variant.defaults.mood,
                  },
                },
              }))
            }
          />
          <SelectField
            label="Default background"
            value={form.variant.defaults.background}
            options={[...backgroundOptions]}
            onChange={(v) =>
              setForm((prev) => ({
                ...prev,
                variant: {
                  ...prev.variant,
                  defaults: {
                    ...prev.variant.defaults,
                    background: v as typeof prev.variant.defaults.background,
                  },
                },
              }))
            }
          />
          <SelectField
            label="Default ratio"
            value={form.variant.defaults.ratio}
            options={[...ratioOptions]}
            onChange={(v) =>
              setForm((prev) => ({
                ...prev,
                variant: {
                  ...prev.variant,
                  defaults: {
                    ...prev.variant.defaults,
                    ratio: v as typeof prev.variant.defaults.ratio,
                  },
                },
              }))
            }
          />
        </div>
        <div className="flex flex-wrap gap-4">
          <label className="inline-flex items-center gap-2 text-sm">
            <input
              type="checkbox"
              checked={form.variant.defaults.keepClothing}
              onChange={(e) =>
                setForm((prev) => ({
                  ...prev,
                  variant: {
                    ...prev.variant,
                    defaults: {
                      ...prev.variant.defaults,
                      keepClothing: e.target.checked,
                    },
                  },
                }))
              }
            />
            Default: keep clothing
          </label>
          <label className="inline-flex items-center gap-2 text-sm">
            <input
              type="checkbox"
              checked={form.variant.defaults.keepPose}
              onChange={(e) =>
                setForm((prev) => ({
                  ...prev,
                  variant: {
                    ...prev.variant,
                    defaults: {
                      ...prev.variant.defaults,
                      keepPose: e.target.checked,
                    },
                  },
                }))
              }
            />
            Default: keep pose
          </label>
        </div>
        <Field label="Limitations (one per line)">
          <textarea
            rows={3}
            value={form.variant.limitations.join("\n")}
            onChange={(e) =>
              setForm((prev) => ({
                ...prev,
                variant: {
                  ...prev.variant,
                  // Preserve empty lines / spaces while typing; normalize on submit.
                  limitations: e.target.value.split("\n"),
                },
              }))
            }
            className={inputClass}
          />
        </Field>
        <div>
          <h3 className="mt-0 mb-2 text-sm font-bold">Live prompt preview</h3>
          <pre
            data-testid="admin-prompt-preview"
            className="m-0 max-h-[220px] overflow-auto rounded-[10px] bg-[#101016] p-3 font-mono text-[12px] leading-relaxed whitespace-pre-wrap text-[#bebbc7]"
          >
            {preview || "(Invalid template or defaults — fix to preview.)"}
          </pre>
        </div>
      </Section>

      <Section title="Evidence images">
        <p className="m-0 mb-3 text-[13px] text-[var(--muted)]">
          MVP accepts HTTPS URLs. After the style exists, you can also upload into
          catalog-public (saves the public URL into the form — click Save afterward).
        </p>
        <div className="grid gap-3 sm:grid-cols-2">
          <Field label="Card source URL">
            <input
              required
              value={form.cardSourceUrl}
              onChange={(e) => patch("cardSourceUrl", e.target.value)}
              className={inputClass}
            />
            {styleId ? (
              <FileUpload
                busy={uploading === "card-source"}
                onFile={(f) => void uploadImage(f, { kind: "card", role: "source" })}
              />
            ) : null}
          </Field>
          <Field label="Card result URL">
            <input
              required
              value={form.cardResultUrl}
              onChange={(e) => patch("cardResultUrl", e.target.value)}
              className={inputClass}
            />
            {styleId ? (
              <FileUpload
                busy={uploading === "card-result"}
                onFile={(f) => void uploadImage(f, { kind: "card", role: "result" })}
              />
            ) : null}
          </Field>
        </div>
        {form.examplePairs.map((pair, index) => (
          <div
            key={index}
            className="mt-4 grid gap-3 rounded-[14px] border border-[var(--line)] p-4 sm:grid-cols-2"
          >
            <Field label={`Example ${index + 1} source URL`}>
              <input
                required
                value={pair.sourceUrl}
                onChange={(e) => {
                  const next = [...form.examplePairs];
                  next[index] = { ...pair, sourceUrl: e.target.value };
                  patch("examplePairs", next);
                }}
                className={inputClass}
              />
              {styleId ? (
                <FileUpload
                  busy={uploading === `ex-${index}-source`}
                  onFile={(f) =>
                    void uploadImage(f, {
                      kind: "example",
                      index,
                      role: "source",
                    })
                  }
                />
              ) : null}
            </Field>
            <Field label={`Example ${index + 1} result URL`}>
              <input
                required
                value={pair.resultUrl}
                onChange={(e) => {
                  const next = [...form.examplePairs];
                  next[index] = { ...pair, resultUrl: e.target.value };
                  patch("examplePairs", next);
                }}
                className={inputClass}
              />
              {styleId ? (
                <FileUpload
                  busy={uploading === `ex-${index}-result`}
                  onFile={(f) =>
                    void uploadImage(f, {
                      kind: "example",
                      index,
                      role: "result",
                    })
                  }
                />
              ) : null}
            </Field>
            <Field label="Alt source">
              <input
                required
                value={pair.altSource}
                onChange={(e) => {
                  const next = [...form.examplePairs];
                  next[index] = { ...pair, altSource: e.target.value };
                  patch("examplePairs", next);
                }}
                className={inputClass}
              />
            </Field>
            <Field label="Alt result">
              <input
                required
                value={pair.altResult}
                onChange={(e) => {
                  const next = [...form.examplePairs];
                  next[index] = { ...pair, altResult: e.target.value };
                  patch("examplePairs", next);
                }}
                className={inputClass}
              />
            </Field>
          </div>
        ))}
      </Section>
    </form>
  );
}

const inputClass =
  "w-full rounded-[10px] border border-[var(--line)] bg-[var(--surface-2)] px-3 py-2.5 text-[var(--text)]";

function Section({
  title,
  children,
}: {
  title: string;
  children: ReactNode;
}) {
  return (
    <section className="rounded-[var(--radius)] border border-[var(--line)] bg-[var(--surface)] p-5">
      <h2 className="mt-0 mb-4 text-[20px] tracking-[-0.02em]">{title}</h2>
      <div className="grid gap-3">{children}</div>
    </section>
  );
}

function Field({
  label,
  children,
}: {
  label: string;
  children: ReactNode;
}) {
  return (
    <label className="grid gap-1.5 text-[11px] font-bold text-[#cbc9d2]">
      {label}
      {children}
    </label>
  );
}

function SelectField({
  label,
  value,
  options,
  onChange,
}: {
  label: string;
  value: string;
  options: string[];
  onChange: (value: string) => void;
}) {
  return (
    <Field label={label}>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className={inputClass}
      >
        {options.map((opt) => (
          <option key={opt} value={opt}>
            {opt}
          </option>
        ))}
      </select>
    </Field>
  );
}

function FileUpload({
  onFile,
  busy,
}: {
  onFile: (file: File | undefined) => void;
  busy: boolean;
}) {
  return (
    <input
      type="file"
      accept="image/jpeg,image/png,image/webp"
      disabled={busy}
      className="mt-2 block w-full text-[12px] text-[var(--muted)]"
      onChange={(e) => onFile(e.target.files?.[0])}
    />
  );
}
