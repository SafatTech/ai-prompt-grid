import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { describe, it } from "node:test";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import {
  DEFAULT_HOMEPAGE_SETTINGS,
  applyHomepageSeasonSettings,
  homepageSettingsSchema,
  mapHomepageSettings,
  resolveHomepageSeason,
  resolveHomepageSeasonImages,
} from "../../src/lib/home/curation";
import {
  SEASONS,
  shortStyleLabel,
  styleLabelForSeason,
} from "../../src/lib/home/seasons";

const root = join(dirname(fileURLToPath(import.meta.url)), "../..");

describe("shortStyleLabel", () => {
  it("strips SEO fluff and keeps a compact sentence-case label", () => {
    assert.equal(
      shortStyleLabel("Black Sherwani AI Prompt (Velvet Reception Look)"),
      "Black sherwani",
    );
    assert.equal(
      shortStyleLabel("Couple Wedding Dress AI Prompt (Maroon & Ivory)"),
      "Couple wedding dress",
    );
    assert.equal(
      shortStyleLabel("Bridal Sharara AI Prompt (Maroon Gota Work)"),
      "Bridal sharara",
    );
    assert.equal(
      shortStyleLabel("Ivory Sherwani AI Prompt for Grooms (Dulha Look)"),
      "Ivory sherwani",
    );
    assert.equal(shortStyleLabel("Diya-lit balcony"), "Diya-lit balcony");
  });

  it("never returns a full SEO title when styleLabels are missing", () => {
    const season = {
      ...SEASONS.find((item) => item.id === "wedding-2026-a")!,
      styleLabels: undefined,
    };
    const label = styleLabelForSeason(
      season,
      "black-sherwani",
      "Black Sherwani AI Prompt (Velvet Reception Look)",
    );
    assert.equal(label, "Black sherwani");
    assert.ok(label.length <= 22);
    assert.ok(!/AI Prompt|\(/.test(label));
  });
});

describe("homepage season field mapping", () => {
  it("maps season_image_slugs and season_style_slugs independently", () => {
    const settings = homepageSettingsSchema.parse({
      ...DEFAULT_HOMEPAGE_SETTINGS,
      seasonMode: "override",
      seasonId: "wedding-2026-a",
      seasonStyleSlugs: [
        "red-bridal-lehenga",
        "dulha-dulhan-outfits",
        "nikkah-dress",
      ],
      seasonImageSlugs: [
        "black-sherwani",
        "red-bridal-lehenga",
        "couple-wedding-outfits",
      ],
      seasonStyleLabels: {
        "black-sherwani": "Black sherwani",
      },
    });

    const season = resolveHomepageSeason(settings);
    assert.deepEqual(season?.styleSlugs, settings.seasonStyleSlugs);
    assert.equal(season?.styleLabels?.["black-sherwani"], "Black sherwani");
    assert.deepEqual(resolveHomepageSeasonImages(settings, season), {
      slugs: settings.seasonImageSlugs,
      isCurated: true,
    });
  });

  it("applies curated style slugs and labels in calendar mode too", () => {
    const settings = homepageSettingsSchema.parse({
      ...DEFAULT_HOMEPAGE_SETTINGS,
      seasonMode: "calendar",
      seasonStyleSlugs: ["black-sherwani", "couple-wedding-outfits"],
      seasonStyleLabels: { "couple-wedding-outfits": "Couple look" },
      seasonImageSlugs: ["red-bridal-lehenga"],
    });
    const season = resolveHomepageSeason(
      settings,
      new Date("2026-11-12T12:00:00+05:00"),
    );
    assert.equal(season?.id, "wedding-2026-a");
    assert.deepEqual(season?.styleSlugs, [
      "black-sherwani",
      "couple-wedding-outfits",
    ]);
    assert.equal(season?.styleLabels?.["couple-wedding-outfits"], "Couple look");
    assert.deepEqual(resolveHomepageSeasonImages(settings, season).slugs, [
      "red-bridal-lehenga",
    ]);
  });

  it("reads season_style_labels from DB rows and defaults when absent", () => {
    const mapped = mapHomepageSettings({
      hero_slugs: [],
      hero_auto_fill: true,
      season_mode: "calendar",
      season_id: null,
      season_eyebrow: null,
      season_headline: null,
      season_body: null,
      season_chips: null,
      season_style_slugs: ["a"],
      season_image_slugs: ["b"],
      season_style_labels: { a: "Short A" },
    });
    assert.deepEqual(mapped.seasonStyleSlugs, ["a"]);
    assert.deepEqual(mapped.seasonImageSlugs, ["b"]);
    assert.deepEqual(mapped.seasonStyleLabels, { a: "Short A" });

    const withoutLabels = mapHomepageSettings({
      hero_slugs: [],
      hero_auto_fill: true,
      season_mode: "calendar",
      season_id: null,
      season_eyebrow: null,
      season_headline: null,
      season_body: null,
      season_chips: null,
      season_style_slugs: [],
      season_image_slugs: [],
    });
    assert.deepEqual(withoutLabels.seasonStyleLabels, {});
  });

  it("merges admin labels over season template labels", () => {
    const base = SEASONS.find((item) => item.id === "wedding-2026-a")!;
    const merged = applyHomepageSeasonSettings(base, {
      ...DEFAULT_HOMEPAGE_SETTINGS,
      seasonStyleLabels: { "red-bridal-lehenga": "Custom red" },
    });
    assert.equal(merged.styleLabels?.["red-bridal-lehenga"], "Custom red");
    assert.equal(merged.styleLabels?.["walima-maxi"], "Walima maxi");
  });
});

describe("admin season banner pickers", () => {
  it("keeps banner photos and style buttons on separate ListKeys", () => {
    const source = readFileSync(
      join(root, "src/components/admin/homepage-curation-client.tsx"),
      "utf8",
    );
    assert.ok(source.includes('key: "bannerImages"'));
    assert.ok(source.includes('key: "bannerLinks"'));
    assert.ok(source.includes('key: "exploreAdjust"'));
    assert.ok(source.includes("Style buttons on banner"));
    assert.ok(source.includes("Banner photos"));
    assert.ok(source.includes("seasonStyleSlugs: slugs"));
    assert.ok(source.includes("seasonImageSlugs: slugs"));
    // Explore adjustments must not reuse the banner photo key.
    assert.match(source, /key:\s*"exploreAdjust"/);
    assert.doesNotMatch(
      source,
      /key:\s*"bannerImages"[\s\S]{0,80}Choose styles to adjust/,
    );
  });

  it("saves and revalidates both slug fields plus style labels", () => {
    const admin = readFileSync(join(root, "src/lib/admin/homepage.ts"), "utf8");
    assert.ok(admin.includes("season_image_slugs: value.settings.seasonImageSlugs"));
    assert.ok(admin.includes("season_style_slugs: value.settings.seasonStyleSlugs"));
    assert.ok(admin.includes("season_style_labels: value.settings.seasonStyleLabels"));

    const route = readFileSync(
      join(root, "src/app/api/admin/homepage/route.ts"),
      "utf8",
    );
    assert.ok(route.includes("expireHomepageSettingsCache"));
    assert.ok(route.includes('revalidatePath("/")'));
  });
});
