import Link from "next/link";
import { StoryShiftMark } from "@/components/story-shift-mark";
import { CONTACT_EMAIL, CONTACT_MAILTO } from "@/lib/site-contact";

export function SiteFooter({ showGuidesLink }: { showGuidesLink: boolean }) {
  const year = new Date().getFullYear();

  return (
    <footer className="site-footer">
      <div className="site-footer-inner">
        <div className="site-footer-top">
          <div className="site-footer-brand-block">
            <Link href="/" className="site-footer-brand" aria-label="AI Prompt Grid home">
              <StoryShiftMark className="site-footer-mark h-6 w-[35px]" />
              AI Prompt Grid
            </Link>
            <p>
              Tested AI photo prompts for festivals, portraits and everyday looks. See the result
              first, then copy the prompt.
            </p>
            <Link href="/explore" className="site-footer-cta">
              Browse styles →
            </Link>
          </div>

          <nav aria-labelledby="footer-nav">
            <h2 id="footer-nav" className="sr-only">
              Site links
            </h2>

            <div className="site-footer-grp">
              <h3 id="footer-cat">Categories</h3>
              <ul aria-labelledby="footer-cat">
                <li>
                  <Link href={`/explore?category=${encodeURIComponent("Professional portraits")}`}>
                    Professional
                  </Link>
                </li>
                <li>
                  <Link href="/explore?q=couple">Couples &amp; Shaadi</Link>
                </li>
                <li>
                  <Link href="/explore?q=family">Family &amp; Eid</Link>
                </li>
                <li>
                  <Link href="/explore?q=anime">Trends</Link>
                </li>
                <li>
                  <Link href="/explore">All styles</Link>
                </li>
              </ul>
            </div>

            <div className="site-footer-grp">
              <h3 id="footer-fest">Festivals</h3>
              <ul aria-labelledby="footer-fest">
                <li>
                  <Link href="/guides/diwali-couple-ai-photo-editing-prompts">Diwali prompts</Link>
                </li>
                <li>
                  <Link href="/explore?q=Eid">Eid prompts</Link>
                </li>
                <li>
                  <Link href="/guides/halloween-ai-prompts-for-selfies">Halloween</Link>
                </li>
                <li>
                  <Link href="/guides/winter-ai-photo-prompts">Winter</Link>
                </li>
              </ul>
            </div>

            <div className="site-footer-grp">
              <h3 id="footer-guides">Guides</h3>
              <ul aria-labelledby="footer-guides">
                {showGuidesLink ? (
                  <>
                    <li>
                      <Link href="/guides/how-to-merge-two-photos-in-gemini">Merge two photos</Link>
                    </li>
                    <li>
                      <Link href="/guides/gemini-headshot-cv-photo-prompts">LinkedIn headshot</Link>
                    </li>
                    <li>
                      <Link href="/guides/how-to-keep-face-same-in-gemini-ai">
                        Keep your face the same
                      </Link>
                    </li>
                    <li>
                      <Link href="/guides">All guides</Link>
                    </li>
                  </>
                ) : (
                  <li>
                    <Link href="/how-it-works">How it works</Link>
                  </li>
                )}
              </ul>
            </div>

            <div className="site-footer-grp">
              <h3 id="footer-company">Company</h3>
              <ul aria-labelledby="footer-company">
                <li>
                  <Link href="/about">About</Link>
                </li>
                <li>
                  <Link href="/contact">Contact</Link>
                </li>
                <li>
                  <Link href="/how-it-works">How it works</Link>
                </li>
                <li>
                  <a href={CONTACT_MAILTO} className="site-footer-mail">
                    {CONTACT_EMAIL}
                  </a>
                </li>
              </ul>
            </div>
          </nav>
        </div>

        <div className="site-footer-bar">
          <p>
            © {year} AI Prompt Grid. All rights reserved.
          </p>
          <nav aria-label="Legal">
            <ul className="site-footer-legal">
              <li>
                <Link href="/privacy-policy">Privacy policy</Link>
              </li>
              <li>
                <Link href="/cookie-policy">Cookie policy</Link>
              </li>
              <li>
                <Link href="/disclaimer">Disclaimer</Link>
              </li>
              <li>
                <Link href="/terms-of-service">Terms of service</Link>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </footer>
  );
}
