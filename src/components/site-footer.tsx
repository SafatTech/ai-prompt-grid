import Link from "next/link";
import { StoryShiftMark } from "@/components/story-shift-mark";
import { CONTACT_EMAIL, CONTACT_MAILTO } from "@/lib/site-contact";

export function SiteFooter({ showGuidesLink }: { showGuidesLink: boolean }) {
  return (
    <footer className="border-t border-[var(--line)] py-8 text-xs text-[var(--muted)]">
      <div className="container flex flex-col items-start justify-between gap-5 sm:flex-row sm:items-center">
        <div className="flex items-center gap-2 font-bold text-[var(--text)]">
          <StoryShiftMark className="h-6 w-[35px]" />
          AI Prompt Grid
        </div>
        <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
          <span className="sm:mr-2">
            Discover tested styles. Transform your photo in an external AI editor.
          </span>
          {showGuidesLink ? (
            <Link
              href="/guides"
              className="font-bold text-[var(--text)] underline-offset-2 hover:underline"
            >
              Guides
            </Link>
          ) : null}
          <Link
            href="/about"
            className="font-bold text-[var(--text)] underline-offset-2 hover:underline"
          >
            About
          </Link>
          <Link
            href="/contact"
            className="font-bold text-[var(--text)] underline-offset-2 hover:underline"
          >
            Contact
          </Link>
          <a
            href={CONTACT_MAILTO}
            className="font-bold text-[var(--text)] underline-offset-2 hover:underline"
          >
            {CONTACT_EMAIL}
          </a>
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
