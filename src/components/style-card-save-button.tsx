"use client";

import type { MouseEvent } from "react";
import { useLibrary } from "@/components/providers/library-provider";
import { useToast } from "@/components/providers/toast-provider";
import { useUiModals } from "@/components/providers/ui-modal-provider";
import { cn } from "@/lib/utils";

type Props = {
  /** Style slug / id only — keeps the StyleCard shell a Server Component. */
  styleId: string;
  className?: string;
};

/**
 * Hydrated save heart — receives only the style id/slug.
 */
export function StyleCardSaveButton({ styleId, className }: Props) {
  const { signedIn, isSaved, toggleSave, setPendingAction } = useLibrary();
  const { toast } = useToast();
  const { openSignIn } = useUiModals();
  const saved = isSaved(styleId);

  function handleSave(event: MouseEvent) {
    event.preventDefault();
    event.stopPropagation();
    if (!signedIn) {
      setPendingAction({ type: "save-style", styleId });
      openSignIn();
      return;
    }
    const nowSaved = !saved;
    toggleSave(styleId);
    toast(
      nowSaved ? "Style saved to your library." : "Style removed from your library.",
    );
  }

  return (
    <button
      type="button"
      className={cn(
        "style-card-heart absolute top-2.5 right-2.5 z-4 flex h-[38px] w-[38px] cursor-pointer items-center justify-center rounded-[11px] border border-[rgba(255,255,255,0.22)] bg-[rgba(11,11,16,0.72)] text-base text-[var(--text)] backdrop-blur-sm",
        saved && "bg-[rgba(255,155,130,0.12)] text-[var(--peach)]",
        className,
      )}
      aria-label={saved ? "Unsave style" : "Save style"}
      data-testid={`save-style-${styleId}`}
      onClick={handleSave}
    >
      {saved ? "♥" : "♡"}
    </button>
  );
}
