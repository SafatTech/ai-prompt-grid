import Link from "next/link";
import { GridMark } from "@/components/grid-mark";

export function SiteFooter() {
  return (
    <footer className="border-t border-[var(--line)] py-8 text-xs text-[var(--muted)]">
      <div className="container flex flex-col items-start justify-between gap-5 sm:flex-row sm:items-center">
        <div className="flex items-center gap-2 font-bold text-[var(--text)]">
          <GridMark />
          AI Prompt Grid
        </div>
        <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
          <span className="sm:mr-2">
            Discover tested styles. Transform your photo in an external AI editor.
          </span>
          <Link
            href="/privacy"
            className="font-bold text-[var(--text)] underline-offset-2 hover:underline"
          >
            Privacy
          </Link>
          <Link
            href="/terms"
            className="font-bold text-[var(--text)] underline-offset-2 hover:underline"
          >
            Terms
          </Link>
        </div>
      </div>
    </footer>
  );
}
