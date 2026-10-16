import Link from "next/link";
import { StoryShiftMark } from "@/components/story-shift-mark";
import { CONTACT_EMAIL, CONTACT_MAILTO } from "@/lib/site-contact";

export function SiteFooter({ showGuidesLink }: { showGuidesLink: boolean }) {
  return (
    <footer className="border-t border-[var(--line)] text-xs text-[var(--muted)]">
      <div className="site-footer-grid">
        <div>
          <div className="site-footer-brand">
            <StoryShiftMark className="h-6 w-[35px]" />
            AI Prompt Grid
          </div>
          <p>Tested AI photo prompts for festivals, portraits, and everyday looks.</p>
        </div>
        <div>
          <h4>Categories</h4>
          <Link href={`/explore?category=${encodeURIComponent("Professional portraits")}`}>
            Professional
          </Link>
          <Link href="/explore?q=couple">Couples &amp; Shaadi</Link>
          <Link href="/explore?q=family">Family &amp; Eid</Link>
          <Link href="/explore?q=anime">Trends</Link>
        </div>
        <div>
          <h4>Festivals</h4>
          <Link href="/guides/diwali-couple-ai-photo-editing-prompts">Diwali prompts</Link>
          <Link href="/explore?q=Eid">Eid prompts</Link>
          <Link href="/guides/halloween-ai-prompts-for-selfies">Halloween</Link>
          <Link href="/guides/winter-ai-photo-prompts">Winter</Link>
        </div>
        <div>
          <h4>Guides</h4>
          {showGuidesLink ? (
            <>
              <Link href="/guides/how-to-merge-two-photos-in-gemini">Merge two photos</Link>
              <Link href="/guides/gemini-headshot-cv-photo-prompts">LinkedIn headshot</Link>
              <Link href="/guides/how-to-keep-face-same-in-gemini-ai">Keep your face the same</Link>
              <Link href="/guides">All guides</Link>
            </>
          ) : (
            <Link href="/how-it-works">How it works</Link>
          )}
        </div>
      </div>
      <div className="site-footer-legal">
        © {new Date().getFullYear()} AI Prompt Grid ·{" "}
        <Link href="/about">About</Link>
        {" · "}
        <Link href="/contact">Contact</Link>
        {" · "}
        <a href={CONTACT_MAILTO}>{CONTACT_EMAIL}</a>
        {" · "}
        <Link href="/privacy-policy">Privacy</Link>
        {" · "}
        <Link href="/cookie-policy">Cookie policy</Link>
        {" · "}
        <Link href="/disclaimer">Disclaimer</Link>
        {" · "}
        <Link href="/terms-of-service">Terms</Link>
      </div>
    </footer>
  );
}
