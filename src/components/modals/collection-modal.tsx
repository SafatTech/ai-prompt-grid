"use client";

import { type FormEvent } from "react";
import { ModalShell } from "@/components/modals/modal-shell";
import { Button } from "@/components/ui/button";
import { useLibrary } from "@/components/providers/library-provider";
import { useToast } from "@/components/providers/toast-provider";

export function CollectionModal({ onClose }: { onClose: () => void }) {
  const { createCollection } = useLibrary();
  const { toast } = useToast();

  function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const name = String(form.get("name") || "").trim();
    if (!name) return;
    createCollection(name);
    toast("Collection created.");
    onClose();
  }

  return (
    <ModalShell
      label="Create collection"
      title="Create a collection"
      description="Group saved styles around a project, subject, or mood."
      onClose={onClose}
    >
      <form onSubmit={onSubmit} className="grid gap-3">
        <label className="grid gap-1.5 text-[11px] font-bold text-[#cbc9d2]">
          Collection name
          <input
            name="name"
            required
            maxLength={40}
            placeholder="Portrait ideas"
            className="rounded-[10px] border border-[var(--line)] bg-[var(--surface-2)] px-3 py-2.5 text-[var(--text)]"
          />
        </label>
        <div className="mt-2 flex flex-wrap justify-end gap-2">
          <Button type="button" variant="ghost" onClick={onClose}>
            Cancel
          </Button>
          <Button type="submit">Create collection</Button>
        </div>
      </form>
    </ModalShell>
  );
}
