import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { loadAllGuides } from "../../src/lib/guides/load";
import {
  documentTitle,
  guideLinkMode,
  guideMetadataTitle,
  isGuideVisible,
  linkStyleMentions,
  prepareGuideMarkdown,
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
});

describe("guide files", () => {
  it("loads five drafts with the expected slugs and SEO fields", () => {
    const guides = loadAllGuides();
    assert.deepEqual(guides.map((guide) => guide.slug).sort(), [...SLUGS].sort());
    for (const guide of guides) {
      assert.equal(guide.draft, true);
      assert.equal(guide.body.startsWith("#"), false);
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
