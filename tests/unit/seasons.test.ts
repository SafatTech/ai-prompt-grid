import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { describe, it } from "node:test";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import {
  createEmptyFilters,
  filterStyles,
} from "../../src/lib/catalog/filters";
import { getPublishedStyles } from "../../src/lib/catalog/styles";
import {
  activeSeason,
  seasonWindowDays,
  SEASONS,
} from "../../src/lib/home/seasons";

const root = join(dirname(fileURLToPath(import.meta.url)), "../..");

function atKarachiNoon(isoDate: string): Date {
  return new Date(`${isoDate}T12:00:00+05:00`);
}

describe("activeSeason shortest-window preference", () => {
  it("picks Halloween over the wider Diwali window on Oct 24–31 2026", () => {
    const halloween = SEASONS.find((s) => s.id === "halloween-2026");
    const diwali = SEASONS.find((s) => s.id === "diwali-2026");
    assert.ok(halloween && diwali);
    assert.ok(seasonWindowDays(halloween) < seasonWindowDays(diwali));

    assert.equal(activeSeason(atKarachiNoon("2026-10-24"))?.id, "halloween-2026");
    assert.equal(activeSeason(atKarachiNoon("2026-10-31"))?.id, "halloween-2026");
    // Diwali resumes outside the Halloween window.
    assert.equal(activeSeason(atKarachiNoon("2026-10-23"))?.id, "diwali-2026");
    assert.equal(activeSeason(atKarachiNoon("2026-11-01"))?.id, "diwali-2026");
  });

  it("gives Christmas and New Year their own days (Wedding does not cover them)", () => {
    assert.equal(activeSeason(atKarachiNoon("2026-12-14"))?.id, "wedding-2026-a");
    assert.equal(activeSeason(atKarachiNoon("2026-12-15"))?.id, "christmas-2026");
    assert.equal(activeSeason(atKarachiNoon("2026-12-26"))?.id, "christmas-2026");
    assert.equal(activeSeason(atKarachiNoon("2026-12-27"))?.id, "new-year-2027");
    assert.equal(activeSeason(atKarachiNoon("2027-01-03"))?.id, "new-year-2027");
    assert.equal(activeSeason(atKarachiNoon("2027-01-04"))?.id, "wedding-2026-b");
  });

  it("ends Eid before Holi so Holi is never hidden", () => {
    assert.equal(activeSeason(atKarachiNoon("2027-03-09"))?.id, "ramadan-eid-2027");
    assert.equal(activeSeason(atKarachiNoon("2027-03-10"))?.id, "holi-2027");
  });

  it("activates Diwali 2027 around Oct 29 with a ~4-week window", () => {
    const diwali = SEASONS.find((s) => s.id === "diwali-2027");
    assert.ok(diwali);
    assert.equal(diwali.festivalDate, "2027-10-29");
    assert.ok(seasonWindowDays(diwali) >= 28);
    assert.ok(seasonWindowDays(diwali) <= 40);
    assert.equal(activeSeason(atKarachiNoon("2027-10-29"))?.id, "diwali-2027");
  });
});

describe("season featured style slugs", () => {
  it("links only published catalog slugs for Halloween and Christmas", () => {
    const published = new Set(getPublishedStyles().map((style) => style.id));
    for (const id of ["halloween-2026", "christmas-2026"] as const) {
      const season = SEASONS.find((s) => s.id === id);
      assert.ok(season);
      assert.ok(season.styleSlugs.length >= 4);
      for (const slug of season.styleSlugs) {
        assert.ok(published.has(slug), `${id} missing slug ${slug}`);
      }
    }
  });

  it("matches the Diwali banner template for both wedding windows", () => {
    const published = new Set(getPublishedStyles().map((style) => style.id));
    const expectedSlugs = [
      "red-bridal-lehenga",
      "dulha-dulhan-outfits",
      "nikkah-dress",
      "ivory-sherwani",
      "walima-maxi",
    ];
    for (const id of ["wedding-2026-a", "wedding-2026-b"] as const) {
      const season = SEASONS.find((s) => s.id === id);
      assert.ok(season);
      assert.equal(season.title, "Try On Wedding Dresses and Start the Trend");
      assert.equal(
        season.body,
        "Bridal lehengas, sherwanis, nikkah and walima looks. Tested prompts that keep your real face.",
      );
      assert.equal(season.heroChip, "Wedding");
      assert.deepEqual(season.styleSlugs, expectedSlugs);
      assert.deepEqual(season.styleLabels, {
        "red-bridal-lehenga": "Red bridal lehenga",
        "dulha-dulhan-outfits": "Dulha & dulhan",
        "nikkah-dress": "Nikkah dress",
        "ivory-sherwani": "Ivory sherwani",
        "walima-maxi": "Walima maxi",
      });
      assert.deepEqual(season.chips, [
        { label: "Bride", q: "bridal", icon: "sparkle" },
        { label: "Groom", q: "sherwani", icon: "sparkle" },
        { label: "Couple", q: "dulha dulhan", icon: "couple" },
      ]);
      for (const slug of season.styleSlugs) {
        assert.ok(published.has(slug), `${id} missing slug ${slug}`);
      }
    }
  });
});

describe("wedding season banner chips", () => {
  it("returns wedding styles for each chip query", () => {
    const styles = getPublishedStyles();
    const empty = createEmptyFilters();
    const wedding = SEASONS.find((s) => s.id === "wedding-2026-a");
    assert.ok(wedding?.chips?.length);
    for (const chip of wedding.chips) {
      const hits = filterStyles(styles, empty, chip.q, "Trending");
      assert.ok(hits.length >= 1, `${chip.label} q="${chip.q}" returned 0`);
      assert.ok(
        hits.some((style) =>
          /wedding|bridal|lehenga|sherwani|nikkah|walima|dulha|shaadi|groom|bride/i.test(
            `${style.id} ${style.title}`,
          ),
        ),
        `${chip.label} q="${chip.q}" missed wedding styles`,
      );
    }
  });
});

describe("season banner layout", () => {
  it("keeps featured style pills in-flow so tall titles cannot cover CTAs", () => {
    const css = readFileSync(join(root, "src/app/home.css"), "utf8");
    const start = css.indexOf(".home-season-links {");
    assert.ok(start >= 0);
    const block = css.slice(start, css.indexOf("}", start) + 1);
    assert.ok(block.includes("grid-column: 6 / -1"));
    assert.ok(block.includes("align-self: end"));
    assert.ok(!/position:\s*absolute/.test(block));

    const banner = readFileSync(
      join(root, "src/components/home/season-banner.tsx"),
      "utf8",
    );
    assert.ok(banner.includes("home-season-links"));
    assert.ok(banner.includes("never lets CTAs/chips sit under"));
  });
});
