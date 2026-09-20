"use client";

import { ModalShell } from "@/components/modals/modal-shell";
import { Button } from "@/components/ui/button";

export function ExternalInfoModal({ onClose }: { onClose: () => void }) {
  return (
    <ModalShell
      label="Information"
      title="Why does this use an external tool?"
      description="AI Prompt Grid is currently a prompt and style library. It helps you choose a tested transformation and customize the instructions. Built-in image transformation will come later."
      onClose={onClose}
    >
      <div className="rounded-xl border border-[rgba(103,216,178,0.25)] bg-[rgba(103,216,178,0.1)] p-4 text-[13px] text-[#a2e8d0]">
        For now, copy the prompt, open a compatible AI image editor, and upload your photo
        there.
      </div>
      <div className="mt-5 flex justify-end">
        <Button onClick={onClose}>Got it</Button>
      </div>
    </ModalShell>
  );
}
