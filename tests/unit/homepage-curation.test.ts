import assert from "node:assert/strict";
import { describe, it } from "node:test";
import {
  homepageCurationSaveSchema,
  MAX_NEW_PINS,
  MAX_TRENDING,
} from "../../src/lib/admin/homepage";
import {
  DEFAULT_HOMEPAGE_SETTINGS,
  homepageSettingsSchema,
  resolveHomepageSeason,
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
});
