import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { describe, it } from "node:test";
import matter from "gray-matter";
import { renderToStaticMarkup } from "react-dom/server";
import { GuideMarkdown } from "../../src/components/guides/guide-markdown";
import {
  firstDimensionedPairSrcs,
  isFirstDimensionedPair,
  parseDimensionTitle,
} from "../../src/lib/guides/image-pairs";
import { loadAllGuides, parseGuideOgImage } from "../../src/lib/guides/load";
import {
  publishedGuideFromMatter,
  publishedSlugFromMatter,
  readPublishedGuides,
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
  resolveGuideArticleImage,
  resolveGuideSocialImage,
  showsDraftGuides,
  stripLeadingH1,
} from "../../src/lib/guides/prepare";
import { absoluteUrl } from "../../src/lib/site-url";

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
    assert.deepEqual(guideRobots(false), {
      index: true,
      follow: true,
      "max-image-preview": "large",
    });
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

  it("reads WIDTHxHEIGHT image titles and ignores anything else", () => {
    assert.deepEqual(parseDimensionTitle("960x1200"), { width: 960, height: 1200 });
    assert.deepEqual(parseDimensionTitle(" 1122x1402 "), { width: 1122, height: 1402 });
    assert.equal(parseDimensionTitle("1122X1402"), null);
    assert.equal(parseDimensionTitle("hero"), null);
    assert.equal(parseDimensionTitle("960x"), null);
    assert.equal(parseDimensionTitle("0x1200"), null);
    assert.equal(parseDimensionTitle("960.5x1200"), null);
    assert.equal(parseDimensionTitle(""), null);
    assert.equal(parseDimensionTitle(undefined), null);
  });

  it("treats only the first dimensioned image paragraph as the eager pair", () => {
    const markdown = [
      "Intro",
      "",
      '![One](/guides/hero-before.webp "960x1200")',
      '![Two](/guides/hero-after.webp "960x1200")',
      "",
      "```",
      '![Hidden before](/guides/hidden-before.webp "100x100")',
      '![Hidden after](/guides/hidden-after.webp "100x100")',
      "```",
      "",
      '![Later before](/guides/later-before.webp "1122x1402")',
      '![Later after](/guides/later-after.webp "1122x1402")',
      "",
      '![Alone](/guides/single.webp "800x600")',
    ].join("\n");

    const first = firstDimensionedPairSrcs(markdown);
    assert.deepEqual(first, ["/guides/hero-before.webp", "/guides/hero-after.webp"]);
    assert.equal(isFirstDimensionedPair(first, first), true);
    assert.equal(
      isFirstDimensionedPair(
        ["/guides/later-before.webp", "/guides/later-after.webp"],
        first,
      ),
      false,
    );
    assert.equal(
      isFirstDimensionedPair(
        ["/guides/hero-after.webp", "/guides/hero-before.webp"],
        first,
      ),
      false,
    );
    assert.deepEqual(
      firstDimensionedPairSrcs("![Plain](/guides/a.webp)\n![Plain](/guides/b.webp)\n"),
      [],
    );
  });

  it("renders the first pair eager and later pairs lazy, with real dimensions", () => {
    const html = renderToStaticMarkup(
      GuideMarkdown({
        visibleSlugs: new Set(),
        markdown: [
          '![Hero before](/guides/halloween-ai-prompts-for-selfies/pumpkin-patch-before.webp "1122x1402")',
          '![Hero after](/guides/halloween-ai-prompts-for-selfies/pumpkin-patch-after.webp "1122x1402")',
          "",
          '![Next before](/guides/halloween-ai-prompts-for-selfies/zombie-before.webp "1122x1402")',
          '![Next after](/guides/halloween-ai-prompts-for-selfies/zombie-after.webp "1122x1402")',
          "",
          '![Single card](/guides/halloween-ai-prompts-for-selfies/pumpkin-patch-og.webp "1200x630")',
        ].join("\n"),
      }),
    );
    const imgs = [...html.matchAll(/<img\b[^>]*>/g)].map((match) => match[0]);
    assert.equal(imgs.length, 5);
    for (const img of imgs.slice(0, 2)) {
      assert.match(img, /loading="eager"/);
      assert.match(img, /fetchPriority="high"/);
      assert.match(img, /width="1122"/);
      assert.match(img, /height="1402"/);
      assert.match(img, /sizes="\(max-width: 640px\) calc\(100vw - 24px\), 360px"/);
    }
    for (const img of imgs.slice(2, 4)) {
      assert.match(img, /loading="lazy"/);
      assert.match(img, /fetchPriority="auto"/);
      assert.match(img, /width="1122"/);
      assert.match(img, /height="1402"/);
    }
    assert.match(imgs[4] ?? "", /width="1200"/);
    assert.match(imgs[4] ?? "", /height="630"/);
    assert.match(imgs[4] ?? "", /sizes="\(max-width: 760px\) 100vw, 760px"/);
    assert.equal(html.match(/<figcaption[^>]*>Before<\/figcaption>/g)?.length, 2);
    assert.equal(html.match(/<figcaption[^>]*>After<\/figcaption>/g)?.length, 2);
  });

  it("uses frontmatter ogImage and falls back to the body hero", () => {
    const ogImage = {
      url: "/guides/example/card.webp",
      width: 1200,
      height: 630,
      alt: "Festival card",
    };
    const body = "![Hero shot](/guides/example/hero.webp)";
    assert.deepEqual(resolveGuideSocialImage({ ogImage, body }), ogImage);
    assert.equal(resolveGuideArticleImage({ ogImage, body }), absoluteUrl(ogImage.url));
    assert.equal(
      resolveGuideArticleImage({
        ogImage: { ...ogImage, url: "https://cdn.example/card.webp" },
        body,
      }),
      "https://cdn.example/card.webp",
    );
    assert.deepEqual(resolveGuideSocialImage({ body }), guideSocialImage(body));
    assert.equal(resolveGuideArticleImage({ body }), guideArticleImage(body));

    assert.equal(parseGuideOgImage(undefined, "guide.mdx"), undefined);
    assert.equal(parseGuideOgImage(null, "guide.mdx"), undefined);
    assert.deepEqual(parseGuideOgImage(ogImage, "guide.mdx"), ogImage);
    assert.throws(
      () => parseGuideOgImage({ url: "card.webp" }, "guide.mdx"),
      /ogImage.url/,
    );
    assert.throws(
      () => parseGuideOgImage({ ...ogImage, width: 0 }, "guide.mdx"),
      /ogImage.width/,
    );
    assert.throws(() => parseGuideOgImage(["/card.webp"], "guide.mdx"), /ogImage/);
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
    const karwa = guides.get("karwa-chauth-ai-photo-editing-prompts") ?? "";
    assert.doesNotMatch(selfies, /ai-pet-halloween-costume-prompts/);
    assert.match(selfies, /\/guides\/80s-ai-photo-prompt-couple-family/);
    assert.match(karwa, /\/guides\/diwali-couple-ai-photo-editing-prompts/);
    assert.match(karwa, /\/guides\/80s-ai-photo-prompt-couple-family/);
  });

  it("keeps Halloween's social image and makes its first pair the eager one", () => {
    const guide = loadAllGuides().find(
      (item) => item.slug === "halloween-ai-prompts-for-selfies",
    );
    assert.ok(guide);
    assert.deepEqual(guide.ogImage, {
      url: "/guides/halloween-ai-prompts-for-selfies/pumpkin-patch-og.webp",
      width: 1200,
      height: 630,
      alt: "Smiling woman with long wavy hair in a cream knit sweater at a pumpkin patch at golden hour.",
    });
    assert.deepEqual(resolveGuideSocialImage(guide), guide.ogImage);
    assert.equal(
      resolveGuideArticleImage(guide),
      absoluteUrl("/guides/halloween-ai-prompts-for-selfies/pumpkin-patch-og.webp"),
    );
    const first = firstDimensionedPairSrcs(guide.body);
    assert.deepEqual(first, [
      "/guides/halloween-ai-prompts-for-selfies/pumpkin-patch-before.webp",
      "/guides/halloween-ai-prompts-for-selfies/pumpkin-patch-after.webp",
    ]);
    assert.equal(guide.body.match(/"1122x1402"/g)?.length, 14);
  });

  it("publishes the Diwali guide with ten sized pairs and no withheld prompts", () => {
    const guide = loadAllGuides().find(
      (item) => item.slug === "diwali-couple-ai-photo-editing-prompts",
    );
    assert.ok(guide);
    assert.equal(guide.draft, false);
    assert.equal(guide.updated, "2026-10-05");
    assert.deepEqual(guide.ogImage, {
      url: "/guides/diwali-couple-ai-photo-editing-prompts/diya-lit-balcony-og.webp",
      width: 1200,
      height: 630,
      alt: "Smiling couple on a diya-lit balcony at night, she in a maroon silk saree and he in an ivory kurta, with marigold garlands and fireworks over the city.",
    });
    assert.deepEqual(firstDimensionedPairSrcs(guide.body), [
      "/guides/diwali-couple-ai-photo-editing-prompts/diya-lit-balcony-before.webp",
      "/guides/diwali-couple-ai-photo-editing-prompts/diya-lit-balcony-after.webp",
    ]);
    assert.equal(guide.body.match(/"960x1200"/g)?.length, 20);
    assert.match(guide.body, /Prompts 3 and 6/);
    assert.match(guide.body, /Prompt 4/);
    assert.match(guide.body, /Prompt 12/);
    assert.doesNotMatch(guide.body, /Lakshmi|Bhai Dooj|\[IMAGE:/i);
    assert.match(
      guide.body,
      /The people in the "before" photos are AI-generated, not real people\. Every "after" image on this page is an AI edit made with the prompts below, tested in October 2026\./,
    );
    for (const slug of [
      "diya-lit-balcony",
      "finishing-the-rangoli-together",
      "first-diwali-as-a-married-couple",
      "separate-photos-couple",
      "fairy-light-portrait",
      "golden-hour-sparkler-shot",
      "kurta-and-nehru-jacket-with-lanterns",
      "candid-phuljhadi-moment",
      "babys-first-diwali",
      "family-diwali-in-karachi-or-sindh",
      "diaspora-diwali-in-a-cold-city",
    ]) {
      assert.equal(guide.body.includes(`](/styles/${slug})`), true, slug);
    }
    assert.equal(guide.body.includes("family-lakshmi-puja-photo"), false);
    assert.match(guide.body, /he in a cream kurta and dark coat with a light scarf/);
    const merge = loadAllGuides().find(
      (item) => item.slug === "how-to-merge-two-photos-in-gemini",
    );
    assert.match(merge?.body ?? "", /Only have separate photos\? Combine them/);
    assert.doesNotMatch(
      merge?.body ?? "",
      /diwali-couple-ai-photo-editing-prompts\)\*\* \(Prompt/,
    );
  });
});

describe("published guide manifest", () => {
  it("keeps drafts out of the published slug list", () => {
    assert.equal(publishedSlugFromMatter("still-draft.mdx", true), null);
    assert.equal(publishedSlugFromMatter("published-one.mdx", false), "published-one");
    assert.equal(publishedSlugFromMatter("notes.txt", false), null);
    assert.throws(() => publishedSlugFromMatter("missing-draft.mdx", undefined), /draft/);

    const dir = fs.mkdtempSync(path.join(os.tmpdir(), "guides-"));
    fs.writeFileSync(
      path.join(dir, "published-one.mdx"),
      '---\ndraft: false\nupdated: "2026-10-01"\n---\n# not parsed\n',
    );
    fs.writeFileSync(
      path.join(dir, "still-draft.mdx"),
      "---\ndraft: true\nupdated: not-a-date\n---\n[IMAGE: broken draft body\n",
    );
    fs.writeFileSync(path.join(dir, "notes.txt"), "draft: false\n");
    assert.deepEqual(readPublishedGuideSlugs(dir), ["published-one"]);
    assert.deepEqual(readPublishedGuides(dir), [
      { slug: "published-one", updated: "2026-10-01" },
    ]);
    assert.equal(
      publishedGuideFromMatter("still-draft.mdx", { draft: true, updated: "nope" }),
      null,
    );
  });

  it("matches the loader and the file the layout imports", () => {
    const guides = readPublishedGuides();
    const slugs = guides.map((guide) => guide.slug);
    assert.deepEqual(slugs, readPublishedGuideSlugs());
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
    assert.equal(manifest, renderPublishedGuideManifest(guides));
    assert.match(
      renderPublishedGuideManifest([{ slug: "beta-guide", updated: "2026-10-01" }]),
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
