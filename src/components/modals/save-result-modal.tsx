"use client";

import { useState, type FormEvent } from "react";
import { ModalShell } from "@/components/modals/modal-shell";
import { Button } from "@/components/ui/button";
import { useLibrary } from "@/components/providers/library-provider";
import { useToast } from "@/components/providers/toast-provider";
import { assemblePrompt, defaultsForStyle } from "@/lib/catalog/prompts";
import { getPublishedStyleById } from "@/lib/catalog/styles";
import { isSupabaseConfigured } from "@/lib/env";
import { MAX_UPLOAD_BYTES } from "@/lib/creations/constants";
import { track } from "@/lib/analytics";

type Props = {
  styleId: string;
  onClose: () => void;
};

function previewFile(
  file: File | undefined,
  onOk: (dataUrl: string, file: File) => void,
  onError: (message: string) => void,
) {
  if (!file) return;
  const allowed = ["image/jpeg", "image/png", "image/webp"];
  if (!allowed.includes(file.type) && !file.type.startsWith("image/")) {
    onError("Please choose a JPEG, PNG, or WebP image.");
    return;
  }
  if (file.size > MAX_UPLOAD_BYTES) {
    onError("Choose an image under 10 MB.");
    return;
  }
  const reader = new FileReader();
  reader.onload = () => onOk(String(reader.result), file);
  reader.onerror = () => onError("That image could not be read.");
  reader.readAsDataURL(file);
}

export function SaveResultModal({ styleId, onClose }: Props) {
  const style = getPublishedStyleById(styleId);
  const { addCreation } = useLibrary();
  const { toast } = useToast();
  const remote = isSupabaseConfigured();
  const [resultPreview, setResultPreview] = useState("");
  const [sourcePreview, setSourcePreview] = useState("");
  const [resultFile, setResultFile] = useState<File | null>(null);
  const [sourceFile, setSourceFile] = useState<File | null>(null);
  const [busy, setBusy] = useState(false);

  if (!style) return null;
  const currentStyle = style;

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!resultPreview || (remote && !resultFile)) {
      toast("Select your transformed result first.", "error");
      return;
    }
    const assembled = assemblePrompt(currentStyle, defaultsForStyle(currentStyle));
    if (!assembled.ok) {
      toast(assembled.errors[0] ?? "Could not snapshot prompt.", "error");
      return;
    }
    const form = new FormData(event.currentTarget);
    const notes = String(form.get("notes") || "").trim();

    setBusy(true);
    if (!remote) {
      track("creation_upload_started", {
        style_id: currentStyle.id,
        has_source: Boolean(sourcePreview),
      });
    }
    const result = await addCreation({
      styleId: currentStyle.id,
      styleName: currentStyle.title,
      notes,
      prompt: assembled.prompt,
      resultFile: resultFile ?? undefined,
      sourceFile: sourceFile,
      result: resultPreview,
      source: sourcePreview,
    });
    setBusy(false);

    if (!result.ok) {
      toast(result.error, "error");
      return;
    }
    toast(
      remote
        ? "Result saved privately to My creations."
        : "Result saved to My creations (this browser).",
    );
    onClose();
  }

  return (
    <ModalShell
      wide
      label="Save transformed result"
      title="Save your transformed result"
      description={
        remote
          ? "Upload the image you created in your AI editor. Stored privately in your account (JPEG, PNG, or WebP · max 10 MB)."
          : "Upload the image you created in your AI editor. Stored privately in this browser until Supabase is configured."
      }
      onClose={onClose}
    >
      <form onSubmit={onSubmit} className="grid gap-3">
        <label className="grid gap-1.5 text-[11px] font-bold text-[#cbc9d2]">
          Selected style
          <input
            readOnly
            value={style.title}
            className="rounded-[10px] border border-[var(--line)] bg-[var(--surface-2)] px-3 py-2.5 text-[var(--text)]"
          />
        </label>
        <div className="grid gap-3 sm:grid-cols-2">
          <UploadField
            label="AI result"
            preview={resultPreview}
            strong="Select your AI result"
            testId="creation-result-input"
            onFile={(file) =>
              previewFile(
                file,
                (url, f) => {
                  setResultPreview(url);
                  setResultFile(f);
                },
                (message) => toast(message, "error"),
              )
            }
          />
          <UploadField
            label="Source photo (optional)"
            preview={sourcePreview}
            strong="Add the source photo"
            testId="creation-source-input"
            onFile={(file) =>
              previewFile(
                file,
                (url, f) => {
                  setSourcePreview(url);
                  setSourceFile(f);
                },
                (message) => toast(message, "error"),
              )
            }
          />
        </div>
        <label className="grid gap-1.5 text-[11px] font-bold text-[#cbc9d2]">
          Note (optional)
          <textarea
            name="notes"
            maxLength={240}
            placeholder="What worked well with this transformation?"
            className="min-h-[88px] resize-y rounded-[10px] border border-[var(--line)] bg-[var(--surface-2)] px-3 py-2.5 text-[var(--text)]"
          />
        </label>
        <div className="mt-2 flex flex-wrap justify-end gap-2">
          <Button type="button" variant="ghost" onClick={onClose} disabled={busy}>
            Cancel
          </Button>
          <Button type="submit" data-testid="save-creation-submit" disabled={busy}>
            {busy ? "Saving…" : "Save to my creations"}
          </Button>
        </div>
      </form>
    </ModalShell>
  );
}

function UploadField({
  label,
  preview,
  strong,
  testId,
  onFile,
}: {
  label: string;
  preview: string;
  strong: string;
  testId: string;
  onFile: (file: File | undefined) => void;
}) {
  return (
    <label className="grid gap-1.5 text-[11px] font-bold text-[#cbc9d2]">
      {label}
      <div className="relative grid min-h-[150px] place-items-center overflow-hidden rounded-[14px] border border-dashed border-[var(--line-strong)] bg-[#111118] text-center">
        <input
          type="file"
          accept="image/jpeg,image/png,image/webp"
          data-testid={testId}
          className="absolute inset-0 z-10 h-full w-full cursor-pointer opacity-0"
          onChange={(event) => onFile(event.target.files?.[0])}
        />
        {preview ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={preview} alt="" className="absolute inset-0 h-full w-full object-cover" />
        ) : (
          <div className="p-6 text-[13px] text-[var(--muted)]">
            <strong className="mb-1 block text-[var(--text)]">{strong}</strong>
            Choose an image from your device
          </div>
        )}
      </div>
    </label>
  );
}
