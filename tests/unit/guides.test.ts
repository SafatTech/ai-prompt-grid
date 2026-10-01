import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { loadAllGuides } from "../../src/lib/guides/load";
import {
  defaultOgImage,
  documentTitle,
  guideArticleImage,
  guideLinkMode,
  guideMetadataTitle,
  guideRobots,
  guideSocialImage,
  isGuideVisible,
  linkStyleMentions,
  prepareGuideMarkdown,
  showsDraftGuides,
  stripLeadingH1,
} from "../../src/lib/guides/prepare";

const SLUGS = [
  "80s-ai-photo-prompt-couple-family",
  "halloween-ai-prompts-for-selfies",
  "ai-pet-halloween-costume-prompts",
  "diwali-couple-ai-photo-editing-prompts",
  "karwa-chauth-ai-photo-editing-prompts",
];

describe("guide publishing rules", () => {
  it("hides drafts in production and shows them in development", () => {
    assert.equal(isGuideVisible(true, false), false);
    assert.equal(isGuideVisible(false, false), true);
    assert.equal(isGuideVisible(true, true), true);
  });

  it("shows drafts on Vercel preview and hides them on Vercel production", () => {
    assert.equal(
      showsDraftGuides({ NODE_ENV: "production", VERCEL_ENV: "preview" }),
      true,
    );
    assert.equal(
      showsDraftGuides({ NODE_ENV: "production", VERCEL_ENV: "development" }),
      true,
    );
    assert.equal(
      showsDraftGuides({ NODE_ENV: "development", VERCEL_ENV: "production" }),
      false,
    );
    assert.equal(
      showsDraftGuides({ NODE_ENV: "production", VERCEL_ENV: "production" }),
      false,
    );
    assert.equal(showsDraftGuides({ NODE_ENV: "production" }), false);
    assert.equal(showsDraftGuides({ NODE_ENV: "development" }), true);
    assert.equal(showsDraftGuides({ NODE_ENV: "test" }), true);
  });

  it("keeps drafts noindex even when a preview can show them", () => {
    assert.equal(
      showsDraftGuides({ NODE_ENV: "production", VERCEL_ENV: "preview" }),
      true,
    );
    assert.deepEqual(guideRobots(true), { index: false, follow: false });
    assert.deepEqual(guideRobots(false), { index: true, follow: true });
  });

  it("keeps document titles within 60 characters", () => {
    assert.equal(
      documentTitle("80s AI Photo Prompts for Couples"),
      "80s AI Photo Prompts for Couples · AI Prompt Grid",
    );
    assert.ok(documentTitle("Guides").length <= 60);
    const long = "A".repeat(80);
    assert.equal(documentTitle(long).length, 60);
    assert.deepEqual(guideMetadataTitle(long), { absolute: documentTitle(long) });
    assert.equal(guideMetadataTitle("Guides"), "Guides");
  });

  it("strips only a leading H1", () => {
    assert.equal(stripLeadingH1("# Title\n\nHello"), "Hello");
    assert.equal(stripLeadingH1("\n# Title\n\nHello"), "Hello");
    assert.equal(stripLeadingH1("Hello\n# Later"), "Hello\n# Later");
    assert.equal(stripLeadingH1("## Kept\n"), "## Kept\n");
  });

  it("turns image placeholders into figures and links known styles once", () => {
    const markdown = prepareGuideMarkdown(
      "# Duplicate\n\nSee Retro Sitcom Cast.\n\n[IMAGE: Mall portrait]\n\n```prompt\nRetro Sitcom Cast\n```\n",
      [{ id: "retro-sitcom-cast", title: "Retro Sitcom Cast" }],
    );
    assert.equal(markdown.startsWith("#"), false);
    assert.match(markdown, /See \[Retro Sitcom Cast\]\(\/styles\/retro-sitcom-cast\)/);
    assert.match(markdown, /!\[Mall portrait\]\(guide-image-placeholder\)/);
    assert.match(markdown, /```prompt\nRetro Sitcom Cast\n```/);
  });

  it("does not link a guide that is not visible", () => {
    const visible = new Set(["diwali-couple-ai-photo-editing-prompts"]);
    assert.equal(
      guideLinkMode("/guides/karwa-chauth-ai-photo-editing-prompts", visible),
      "text",
    );
    assert.equal(
      guideLinkMode(
        "https://aipromptgrid.com/guides/diwali-couple-ai-photo-editing-prompts",
        visible,
      ),
      "link",
    );
    assert.equal(guideLinkMode("/styles/retro-sitcom-cast", visible), "link");
    assert.equal(guideLinkMode("/explore", visible), "link");
  });

  it("does not double-link a style that is already linked", () => {
    const source = "Try [Retro Sitcom Cast](/styles/retro-sitcom-cast) again.";
    assert.equal(
      linkStyleMentions(source, [
        { id: "retro-sitcom-cast", title: "Retro Sitcom Cast" },
      ]),
      source,
    );
  });

  it("does not link a title inside existing link text or a longer word", () => {
    const styles = [{ id: "retro-sitcom-cast", title: "Retro Sitcom Cast" }];
    const insideLink = "Read [the Retro Sitcom Cast notes](/how-it-works) today.";
    assert.equal(linkStyleMentions(insideLink, styles), insideLink);
    assert.equal(
      linkStyleMentions("Retro Sitcom Casting is not Retro Sitcom Cast.", styles),
      "Retro Sitcom Casting is not [Retro Sitcom Cast](/styles/retro-sitcom-cast).",
    );
    const image = "![Retro Sitcom Cast](/guides/x/hero.webp)";
    assert.equal(linkStyleMentions(image, styles), image);
  });

  it("does not nest a shorter title inside a longer style link", () => {
    assert.equal(
      linkStyleMentions("Velvet Rose Noir, then Rose Noir.", [
        { id: "velvet-rose-noir", title: "Velvet Rose Noir" },
        { id: "rose-noir", title: "Rose Noir" },
      ]),
      "[Velvet Rose Noir](/styles/velvet-rose-noir), then [Rose Noir](/styles/rose-noir).",
    );
  });

  it("uses the hero image for social cards and falls back to the site image", () => {
    const placeholder = "![Soon](guide-image-placeholder)";
    assert.equal(guideArticleImage(placeholder), undefined);
    assert.deepEqual(guideSocialImage(placeholder), { ...defaultOgImage });
    assert.deepEqual(guideSocialImage("```\n![Hidden](/secret.webp)\n```"), {
      ...defaultOgImage,
    });
    assert.equal(
      guideArticleImage(
        "![Soon](guide-image-placeholder)\n\n![Hero](/guides/halloween/hero.webp)",
      ),
      "https://aipromptgrid.com/guides/halloween/hero.webp",
    );
    assert.deepEqual(guideSocialImage("![Hero shot](/guides/halloween/hero.webp)"), {
      url: "/guides/halloween/hero.webp",
      alt: "Hero shot",
    });
  });
});

describe("guide files", () => {
  it("loads the five guides with the expected slugs and SEO fields", () => {
    const guides = loadAllGuides();
    assert.deepEqual(guides.map((guide) => guide.slug).sort(), [...SLUGS].sort());
    for (const guide of guides) {
      if (!guide.draft) {
        assert.doesNotMatch(guide.body, /\[IMAGE:|guide-image-placeholder/);
      }
      assert.equal(guide.body.startsWith("#"), false);
      assert.doesNotMatch(guide.body, /\[[^\]]*\[/);
      assert.ok(guide.description.length > 40);
      assert.ok(guide.description.length <= 160);
      assert.ok(documentTitle(guide.title).length <= 60);
      assert.match(guide.date, /^\d{4}-\d{2}-\d{2}$/);
    }
  });

  it("interlinks the Halloween pair and Karwa Chauth to Diwali and the 80s guide", () => {
    const guides = new Map(loadAllGuides().map((guide) => [guide.slug, guide.body]));
    const selfies = guides.get("halloween-ai-prompts-for-selfies") ?? "";
    const pets = guides.get("ai-pet-halloween-costume-prompts") ?? "";
    const karwa = guides.get("karwa-chauth-ai-photo-editing-prompts") ?? "";
    assert.match(selfies, /\/guides\/ai-pet-halloween-costume-prompts/);
    assert.match(pets, /\/guides\/halloween-ai-prompts-for-selfies/);
    assert.match(karwa, /\/guides\/diwali-couple-ai-photo-editing-prompts/);
    assert.match(karwa, /\/guides\/80s-ai-photo-prompt-couple-family/);
  });
});
