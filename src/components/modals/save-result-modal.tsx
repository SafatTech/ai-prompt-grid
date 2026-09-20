"use client";

import { useState, type FormEvent } from "react";
import { ModalShell } from "@/components/modals/modal-shell";
import { Button } from "@/components/ui/button";
import { useLibrary } from "@/components/providers/library-provider";
import { useToast } from "@/components/providers/toast-provider";
import { assemblePrompt, defaultsForStyle } from "@/lib/catalog/prompts";
import { getPublishedStyleById } from "@/lib/catalog/styles";

type Props = {
  styleId: string;
  onClose: () => void;
};

function readImage(
  file: File | undefined,
  onOk: (dataUrl: string) => void,
  onError: (message: string) => void,
) {
  if (!file) return;
  if (!file.type.startsWith("image/")) {
    onError("Please choose an image file.");
    return;
  }
  if (file.size > 10 * 1024 * 1024) {
    onError("Choose an image under 10 MB.");
    return;
  }
  const reader = new FileReader();
  reader.onload = () => onOk(String(reader.result));
  reader.onerror = () => onError("That image could not be read.");
  reader.readAsDataURL(file);
}

export function SaveResultModal({ styleId, onClose }: Props) {
  const style = getPublishedStyleById(styleId);
  const { addCreation } = useLibrary();
  const { toast } = useToast();
  const [result, setResult] = useState("");
  const [source, setSource] = useState("");

  if (!style) return null;
  const currentStyle = style;

  function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!result) {
      toast("Select your transformed result first.", "error");
      return;
    }
    const assembled = assemblePrompt(currentStyle, defaultsForStyle(currentStyle));
    if (!assembled.ok) {
      toast(assembled.errors[0] ?? "Could not snapshot prompt.", "error");
      return;
    }
    const form = new FormData(event.currentTarget);
    addCreation({
      result,
      source,
      styleId: currentStyle.id,
      styleName: currentStyle.title,
      notes: String(form.get("notes") || "").trim(),
      prompt: assembled.prompt,
    });
    toast("Result saved to My creations.");
    onClose();
  }

  return (
    <ModalShell
      wide
      label="Save transformed result"
      title="Save your transformed result"
      description="Upload the image you created in your AI editor. Phase 1 stores this in your browser only."
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
            preview={result}
            strong="Select your AI result"
            onFile={(file) =>
              readImage(file, setResult, (message) => toast(message, "error"))
            }
          />
          <UploadField
            label="Source photo (optional)"
            preview={source}
            strong="Add the source photo"
            onFile={(file) =>
              readImage(file, setSource, (message) => toast(message, "error"))
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
          <Button type="button" variant="ghost" onClick={onClose}>
            Cancel
          </Button>
          <Button type="submit" data-testid="save-creation-submit">
            Save to my creations
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
  onFile,
}: {
  label: string;
  preview: string;
  strong: string;
  onFile: (file: File | undefined) => void;
}) {
  return (
    <label className="grid gap-1.5 text-[11px] font-bold text-[#cbc9d2]">
      {label}
      <div className="relative grid min-h-[150px] place-items-center overflow-hidden rounded-[14px] border border-dashed border-[var(--line-strong)] bg-[#111118] text-center">
        <input
          type="file"
          accept="image/jpeg,image/png,image/webp,image/*"
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
