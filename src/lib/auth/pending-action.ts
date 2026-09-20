export type PendingAction =
  | { type: "save-style"; styleId: string }
  | { type: "save-result"; styleId: string }
  | { type: "open-library" }
  | null;

const PENDING_KEY = "aiPromptGridPending";

/** Survives OAuth full-page redirects (unlike in-memory pending state alone). */
export function persistPendingAction(action: PendingAction) {
  if (typeof window === "undefined") return;
  try {
    if (action) sessionStorage.setItem(PENDING_KEY, JSON.stringify(action));
    else sessionStorage.removeItem(PENDING_KEY);
  } catch {
    // ignore quota / private mode
  }
}

export function readPersistedPendingAction(): PendingAction {
  if (typeof window === "undefined") return null;
  try {
    const raw = sessionStorage.getItem(PENDING_KEY);
    if (!raw) return null;
    return JSON.parse(raw) as PendingAction;
  } catch {
    return null;
  }
}

export function clearPersistedPendingAction() {
  persistPendingAction(null);
}

export function authCallbackUrl(next = "/"): string {
  const origin =
    typeof window !== "undefined"
      ? window.location.origin
      : (process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000");
  const path = next.startsWith("/") ? next : "/";
  return `${origin}/auth/callback?next=${encodeURIComponent(path)}`;
}
