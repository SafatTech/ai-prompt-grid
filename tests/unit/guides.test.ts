import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { describe, it } from "node:test";
import matter from "gray-matter";
import { loadAllGuides } from "../../src/lib/guides/load";
import {
  publishedSlugFromMatter,
  readPublishedGuideSlugs,
  renderPublishedGuideManifest,
} from "../../src/lib/guides/published-manifest";
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
  it("matches every guide filename to its frontmatter slug", () => {
    const dir = path.join(process.cwd(), "content", "guides");
    const files = fs.readdirSync(dir).filter((file) => file.endsWith(".mdx"));
    const guides = loadAllGuides();
    assert.deepEqual(
      guides.map((guide) => guide.slug).sort(),
      files.map((file) => file.slice(0, -".mdx".length)).sort(),
    );
    for (const file of files) {
      const raw = fs.readFileSync(path.join(dir, file), "utf8");
      const filenameSlug = file.slice(0, -".mdx".length);
      assert.equal(matter(raw).data.slug, filenameSlug);
    }
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

  it("drops the cancelled pet guide from the selfie guide and keeps the other cross-links", () => {
    const guides = new Map(loadAllGuides().map((guide) => [guide.slug, guide.body]));
    const selfies = guides.get("halloween-ai-prompts-for-selfies") ?? "";
    const pets = guides.get("ai-pet-halloween-costume-prompts") ?? "";
    const karwa = guides.get("karwa-chauth-ai-photo-editing-prompts") ?? "";
    assert.doesNotMatch(selfies, /ai-pet-halloween-costume-prompts/);
    assert.match(selfies, /\/guides\/80s-ai-photo-prompt-couple-family/);
    assert.match(pets, /\/guides\/halloween-ai-prompts-for-selfies/);
    assert.match(karwa, /\/guides\/diwali-couple-ai-photo-editing-prompts/);
    assert.match(karwa, /\/guides\/80s-ai-photo-prompt-couple-family/);
  });
});

describe("published guide manifest", () => {
  it("keeps drafts out of the published slug list", () => {
    assert.equal(publishedSlugFromMatter("still-draft.mdx", true), null);
    assert.equal(publishedSlugFromMatter("published-one.mdx", false), "published-one");
    assert.equal(publishedSlugFromMatter("notes.txt", false), null);
    assert.throws(() => publishedSlugFromMatter("missing-draft.mdx", undefined), /draft/);

    const dir = fs.mkdtempSync(path.join(os.tmpdir(), "guides-"));
    fs.writeFileSync(path.join(dir, "published-one.mdx"), "---\ndraft: false\n---\n");
    fs.writeFileSync(path.join(dir, "still-draft.mdx"), "---\ndraft: true\n---\n");
    fs.writeFileSync(path.join(dir, "notes.txt"), "draft: false\n");
    assert.deepEqual(readPublishedGuideSlugs(dir), ["published-one"]);
  });

  it("matches the loader and the file the layout imports", () => {
    const slugs = readPublishedGuideSlugs();
    assert.deepEqual(
      slugs,
      loadAllGuides()
        .filter((guide) => !guide.draft)
        .map((guide) => guide.slug)
        .sort(),
    );
    const manifest = fs.readFileSync(
      path.join(process.cwd(), "src/lib/guides/published-slugs.generated.ts"),
      "utf8",
    );
    assert.equal(manifest, renderPublishedGuideManifest(slugs));
    assert.match(
      renderPublishedGuideManifest(["beta-guide", "alpha-guide"]),
      /beta-guide/,
    );
  });

  it("root layout reads the manifest instead of the guides directory", () => {
    const layout = fs.readFileSync(
      path.join(process.cwd(), "src/app/layout.tsx"),
      "utf8",
    );
    assert.equal(layout.includes("listIndexableGuides"), false);
    assert.match(layout, /published-slugs\.generated/);
    assert.doesNotMatch(layout, /content\/guides|readFileSync|readdirSync/);
  });
});
