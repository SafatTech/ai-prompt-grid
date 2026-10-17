/** Client-only recent style views for the homepage "Pick up where you left off" shelf. */

export const RECENT_VIEWS_KEY = "apg:recent";
export const MAX_RECENT_VIEWS = 12;

export type RecentView = {
  slug: string;
  title: string;
  result: string;
  viewedAt: number;
};

export function readRecentViews(): RecentView[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(RECENT_VIEWS_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw) as unknown;
    if (!Array.isArray(parsed)) return [];
    return parsed
      .filter(
        (item): item is RecentView =>
          !!item &&
          typeof item === "object" &&
          typeof (item as RecentView).slug === "string" &&
          typeof (item as RecentView).title === "string" &&
          typeof (item as RecentView).result === "string" &&
          typeof (item as RecentView).viewedAt === "number",
      )
      .slice(0, MAX_RECENT_VIEWS);
  } catch {
    return [];
  }
}

export function recordRecentView(entry: Omit<RecentView, "viewedAt">): void {
  if (typeof window === "undefined") return;
  try {
    const next: RecentView[] = [
      { ...entry, viewedAt: Date.now() },
      ...readRecentViews().filter((item) => item.slug !== entry.slug),
    ].slice(0, MAX_RECENT_VIEWS);
    localStorage.setItem(RECENT_VIEWS_KEY, JSON.stringify(next));
    window.dispatchEvent(new StorageEvent("storage", { key: RECENT_VIEWS_KEY }));
  } catch {
    // Quota or private mode — ignore.
  }
}

export function formatRelativeViewed(viewedAt: number, now = Date.now()): string {
  const delta = Math.max(0, now - viewedAt);
  const minutes = Math.floor(delta / 60_000);
  if (minutes < 1) return "Viewed just now";
  if (minutes < 60) return `Viewed ${minutes}m ago`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `Viewed ${hours}h ago`;
  const days = Math.floor(hours / 24);
  if (days === 1) return "Viewed yesterday";
  if (days < 14) return `Viewed ${days}d ago`;
  return "Viewed earlier";
}
