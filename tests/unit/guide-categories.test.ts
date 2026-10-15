import assert from "node:assert/strict";
import { describe, it } from "node:test";
import {
  GUIDE_CATEGORIES,
  getGuideCategory,
  isGuideCategorySlug,
} from "../../src/lib/guides/categories";
import {
  countPromptHeadings,
  estimateGuideListReadMinutes,
  listVisibleGuides,
  searchGuides,
} from "../../src/lib/guides/load";

describe("guide categories", () => {
  it("exposes the seven approved category slugs", () => {
    assert.deepEqual(
      GUIDE_CATEGORIES.map((category) => category.slug),
      [
        "festivals",
        "couples-family",
        "trends",
        "seasonal",
        "occasions",
        "professional",
        "styles",
      ],
    );
    assert.equal(isGuideCategorySlug("trends"), true);
    assert.equal(isGuideCategorySlug("nope"), false);
    assert.equal(getGuideCategory("occasions")?.label, "Occasions");
  });

  it("assigns published guides to categories, with boys and birthday in the approved buckets", () => {
    const guides = listVisibleGuides().filter((guide) => !guide.draft);
    const bySlug = new Map(guides.map((guide) => [guide.slug, guide]));
    assert.equal(bySlug.get("trending-ai-photo-prompts-for-boys")?.category, "trends");
    assert.equal(bySlug.get("birthday-ai-photo-prompts")?.category, "occasions");
    assert.equal(bySlug.get("anime-ai-photo-prompts")?.category, "styles");
    assert.equal(bySlug.get("winter-ai-photo-prompts")?.category, "seasonal");
    for (const guide of guides) {
      assert.ok(isGuideCategorySlug(guide.category), guide.slug);
      assert.ok(guide.promptCount >= 1, guide.slug);
      assert.ok(guide.readMinutes >= 3, guide.slug);
      assert.equal(guide.author, "Safat Tech");
    }
  });

  it("counts ### headings and floors list read time at 3 minutes", () => {
    const body = ["### One", "word ".repeat(50), "### Two", "### Three"].join("\n");
    assert.equal(countPromptHeadings(body), 3);
    assert.equal(estimateGuideListReadMinutes("short"), 3);
  });

  it("searches title, description, tags, and keywords without JS", () => {
    const birthday = searchGuides("birthday");
    assert.ok(birthday.some((guide) => guide.slug === "birthday-ai-photo-prompts"));
    const empty = searchGuides("zzzz-no-such-guide");
    assert.equal(empty.length, 0);
  });
});
