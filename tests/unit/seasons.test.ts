import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { getPublishedStyles } from "../../src/lib/catalog/styles";
import {
  activeSeason,
  seasonWindowDays,
  SEASONS,
} from "../../src/lib/home/seasons";

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
});
