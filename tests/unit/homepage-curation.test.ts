import assert from "node:assert/strict";
import { describe, it } from "node:test";
import {
  filterHomepageAdminStyles,
  getHomepageAdminData,
  homepageCurationSaveSchema,
  MAX_NEW_PINS,
  MAX_TRENDING,
  type HomepageAdminStyle,
} from "../../src/lib/admin/homepage";
import type { SupabaseClient } from "@supabase/supabase-js";
import {
  DEFAULT_HOMEPAGE_SETTINGS,
  homepageSettingsSchema,
  resolveHomepageSeason,
  resolveHomepageSeasonImages,
} from "../../src/lib/home/curation";

const ids = Array.from(
  { length: 13 },
  (_, index) => `00000000-0000-4000-8000-${String(index).padStart(12, "0")}`,
);

describe("homepage curation", () => {
  it("keeps the calendar behavior when settings are empty", () => {
    const season = resolveHomepageSeason(
      DEFAULT_HOMEPAGE_SETTINGS,
      new Date("2026-10-25T12:00:00Z"),
    );
    assert.equal(season?.id, "halloween-2026");
  });

  it("supports event copy, style, and image overrides independently", () => {
    const settings = homepageSettingsSchema.parse({
      ...DEFAULT_HOMEPAGE_SETTINGS,
      seasonMode: "override",
      seasonId: "diwali-2026",
      seasonHeadline: "Custom event headline",
      seasonStyleSlugs: ["linked-style"],
      seasonImageSlugs: ["image-style"],
    });
    const season = resolveHomepageSeason(settings);
    assert.equal(season?.title, "Custom event headline");
    assert.deepEqual(season?.styleSlugs, ["linked-style"]);
    assert.deepEqual(settings.seasonImageSlugs, ["image-style"]);
  });

  it("uses curated banner images in calendar mode and preserves their order", () => {
    const settings = homepageSettingsSchema.parse({
      ...DEFAULT_HOMEPAGE_SETTINGS,
      seasonMode: "calendar",
      seasonImageSlugs: ["fourth-style", "first-style", "third-style"],
    });
    const season = resolveHomepageSeason(settings, new Date("2026-10-25T12:00:00Z"));

    assert.deepEqual(resolveHomepageSeasonImages(settings, season), {
      slugs: ["fourth-style", "first-style", "third-style"],
      isCurated: true,
    });
  });

  it("falls back to the active event styles when no banner images are curated", () => {
    const season = resolveHomepageSeason(
      DEFAULT_HOMEPAGE_SETTINGS,
      new Date("2026-10-25T12:00:00Z"),
    );

    assert.deepEqual(resolveHomepageSeasonImages(DEFAULT_HOMEPAGE_SETTINGS, season), {
      slugs: season?.styleSlugs,
      isCurated: false,
    });
  });

  it("enforces twelve Trending slots and five New pins", () => {
    const base = {
      settings: DEFAULT_HOMEPAGE_SETTINGS,
      styleOverrides: [],
    };
    assert.equal(
      homepageCurationSaveSchema.safeParse({
        ...base,
        trendingStyleIds: ids.slice(0, MAX_TRENDING),
        newPinStyleIds: ids.slice(0, MAX_NEW_PINS),
      }).success,
      true,
    );
    assert.equal(
      homepageCurationSaveSchema.safeParse({
        ...base,
        trendingStyleIds: ids,
        newPinStyleIds: [],
      }).success,
      false,
    );
    assert.equal(
      homepageCurationSaveSchema.safeParse({
        ...base,
        trendingStyleIds: [],
        newPinStyleIds: ids.slice(0, MAX_NEW_PINS + 1),
      }).success,
      false,
    );
  });

  it("finds picker styles by title or slug without case sensitivity", () => {
    const baseStyle: HomepageAdminStyle = {
      id: ids[0]!,
      slug: "golden-hour-portrait",
      title: "Golden Hour Portrait",
      resultUrl: "/golden.webp",
      publishedAt: null,
      saveCount: 0,
      trendingRank: null,
      pinNewRank: null,
      showOnHome: true,
      hideFromNew: false,
      exploreWeight: 0,
      excludeFromExplore: false,
      allowInHero: true,
      heroPriority: 0,
    };
    const otherStyle = {
      ...baseStyle,
      id: ids[1]!,
      slug: "editorial",
      title: "Editorial Portrait",
    };

    assert.deepEqual(filterHomepageAdminStyles([baseStyle, otherStyle], " GOLDEN "), [
      baseStyle,
    ]);
    assert.deepEqual(filterHomepageAdminStyles([baseStyle, otherStyle], "editorial"), [
      otherStyle,
    ]);
  });

  it("returns an actionable error instead of silently treating a failed query as empty", async () => {
    function query(result: { data: unknown; error: { message: string } | null }) {
      const chain = {
        select: () => chain,
        eq: () => chain,
        order: async () => result,
        maybeSingle: async () => result,
      };
      return chain;
    }

    const client = {
      from: (table: string) =>
        table === "styles"
          ? query({ data: null, error: { message: "column does not exist" } })
          : query({ data: null, error: null }),
    } as unknown as SupabaseClient;
    const originalWarn = console.warn;
    console.warn = () => undefined;
    try {
      const data = await getHomepageAdminData(client);
      assert.deepEqual(data.styles, []);
      assert.match(data.stylesLoadError ?? "", /latest Supabase migrations/);
      assert.equal(data.loadError, data.stylesLoadError);
    } finally {
      console.warn = originalWarn;
    }
  });
});
