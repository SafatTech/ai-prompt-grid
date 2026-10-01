"use client";

import { useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useLibrary } from "@/components/providers/library-provider";
import { useUiModals } from "@/components/providers/ui-modal-provider";

/**
 * Isolated `useSearchParams` island so the style detail page can SSR.
 * Only handles `?saveResult=1` after sign-in.
 */
export function StyleSaveResultQuery({ styleId }: { styleId: string }) {
  const searchParams = useSearchParams();
  const router = useRouter();
  const { signedIn } = useLibrary();
  const { openSaveResult } = useUiModals();

  useEffect(() => {
    if (searchParams.get("saveResult") === "1" && signedIn) {
      openSaveResult(styleId);
      router.replace(`/styles/${styleId}`);
    }
  }, [searchParams, signedIn, styleId, openSaveResult, router]);

  return null;
}
