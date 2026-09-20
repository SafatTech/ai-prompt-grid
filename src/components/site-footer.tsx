import { GridMark } from "@/components/grid-mark";

export function SiteFooter() {
  return (
    <footer className="border-t border-[var(--line)] py-8 text-xs text-[var(--muted)]">
      <div className="container flex flex-col items-start justify-between gap-5 sm:flex-row sm:items-center">
        <div className="flex items-center gap-2 font-bold text-[var(--text)]">
          <GridMark />
          AI Prompt Grid
        </div>
        <span>Discover tested styles. Transform your photo in an external AI editor.</span>
      </div>
    </footer>
  );
}
