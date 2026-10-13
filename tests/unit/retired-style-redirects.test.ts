import assert from "node:assert/strict";
import { describe, it } from "node:test";
import {
  isRetiredStyleSlug,
  retiredStyleRedirectPath,
  retiredStyleSlugs,
} from "../../src/lib/http/retired-style-redirects";

describe("retired style redirects", () => {
  it("sends retired style pages to their parent guides", () => {
    assert.equal(
      retiredStyleRedirectPath(
        "/styles/saree-office-linkedin-profile-picture-prompt-gemini-women",
      ),
      "/guides/gemini-headshot-cv-photo-prompts",
    );
    assert.equal(
      retiredStyleRedirectPath(
        "/styles/saree-office-linkedin-profile-picture-prompt-gemini-women/",
      ),
      "/guides/gemini-headshot-cv-photo-prompts",
    );
    assert.equal(
      retiredStyleRedirectPath("/styles/80s-aerobics-studio"),
      "/guides/80s-ai-photo-prompts-solo-couple",
    );
    assert.equal(
      retiredStyleRedirectPath("/styles/80s-aerobics-studio/"),
      "/guides/80s-ai-photo-prompts-solo-couple",
    );
  });

  it("exposes every retired slug for sitemap exclusion", () => {
    assert.equal(
      isRetiredStyleSlug("saree-office-linkedin-profile-picture-prompt-gemini-women"),
      true,
    );
    assert.equal(isRetiredStyleSlug("80s-aerobics-studio"), true);
    assert.equal(isRetiredStyleSlug("meadow-reverie"), false);
    assert.ok(retiredStyleSlugs.size >= 2);
  });

  it("leaves live style pages alone", () => {
    for (const path of [
      "/styles/navy-blazer-linkedin-profile-picture-prompt-gemini",
      "/styles/1985-studio-portrait",
      "/styles/80s-bedroom-cassette",
      "/guides/gemini-headshot-cv-photo-prompts",
      "/",
    ]) {
      assert.equal(retiredStyleRedirectPath(path), null, path);
    }
  });
});
