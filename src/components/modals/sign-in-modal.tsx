"use client";

import { useRouter } from "next/navigation";
import { useState, type FormEvent } from "react";
import { ModalShell } from "@/components/modals/modal-shell";
import { Button } from "@/components/ui/button";
import { useLibrary } from "@/components/providers/library-provider";
import { useToast } from "@/components/providers/toast-provider";

export function SignInModal({ onClose }: { onClose: () => void }) {
  const { signIn, pendingAction, setPendingAction } = useLibrary();
  const { toast } = useToast();
  const router = useRouter();
  const [magicSent, setMagicSent] = useState(false);

  function completeSignIn() {
    const pending = pendingAction;
    setPendingAction(null);
    signIn(
      pending?.type === "save-style" ? { saveStyleId: pending.styleId } : undefined,
    );
    onClose();
    toast("You are signed in.");

    if (pending?.type === "save-style") {
      toast("Style saved to your library.");
    } else if (pending?.type === "open-library") {
      router.push("/library");
    } else if (pending?.type === "save-result") {
      router.push(`/styles/${pending.styleId}?saveResult=1`);
    }
  }

  function onMagic(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setMagicSent(true);
  }

  return (
    <ModalShell
      label="Sign in"
      title="Save styles and build your photo library"
      description="Simulated sign-in for Phase 1. Google OAuth and magic links come in Phase 4."
      onClose={onClose}
    >
      <Button
        className="mb-[15px] w-full bg-[var(--text)] text-[#16131d] hover:bg-white"
        data-testid="google-sign-in"
        onClick={completeSignIn}
      >
        Continue with Google
      </Button>
      <div className="my-3 flex items-center gap-3 text-xs text-[var(--muted)]">
        <span className="h-px flex-1 bg-[var(--line)]" />
        or
        <span className="h-px flex-1 bg-[var(--line)]" />
      </div>
      <form onSubmit={onMagic} className="grid gap-3">
        <label className="grid gap-1.5 text-[11px] font-bold text-[#cbc9d2]">
          Email address
          <input
            type="email"
            required
            placeholder="you@example.com"
            className="rounded-[10px] border border-[var(--line)] bg-[var(--surface-2)] px-3 py-2.5 text-[var(--text)]"
          />
        </label>
        <Button type="submit" className="w-full">
          Email me a sign-in link
        </Button>
      </form>
      {magicSent ? (
        <div className="mt-3 rounded-xl border border-[rgba(103,216,178,0.25)] bg-[rgba(103,216,178,0.1)] p-4 text-[13px] text-[#a2e8d0]">
          Check your inbox for a sign-in link. (Simulated — use Google to continue now.)
        </div>
      ) : null}
      <button
        type="button"
        className="mt-3 cursor-pointer border-0 bg-transparent p-0 font-bold text-[#bbaeff]"
        onClick={() => {
          onClose();
          toast("Continuing as a guest. Sign in when you want to save.");
        }}
      >
        Continue as guest
      </button>
    </ModalShell>
  );
}
