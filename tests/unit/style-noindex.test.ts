import assert from "node:assert/strict";
import { describe, it } from "node:test";
import sitemap from "../../src/app/sitemap";
import { generateMetadata } from "../../src/app/styles/[slug]/page";
import { relatedStylesFor } from "../../src/lib/catalog/related-styles";
import {
  listIndexablePublishedStyles,
  listPublishedStyles,
} from "../../src/lib/catalog/repository";
import { getPublishedStyles } from "../../src/lib/catalog/styles";
import {
  isTemporaryNoindexStyleSlug,
  temporaryNoindexStyleIds,
  withoutTemporaryNoindexStyles,
} from "../../src/lib/catalog/style-noindex";
import { absoluteUrl } from "../../src/lib/site-url";

describe("temporary style noindex list", () => {
  it("lists exactly 33 catalog-published style ids", () => {
    assert.equal(temporaryNoindexStyleIds.size, 33);
    const published = new Set(getPublishedStyles().map((style) => style.id));
    for (const id of temporaryNoindexStyleIds) {
      assert.ok(published.has(id), `missing from catalog: ${id}`);
      assert.equal(isTemporaryNoindexStyleSlug(id), true);
    }
    assert.equal(isTemporaryNoindexStyleSlug("meadow-reverie"), false);
  });

  it("includes the GSC-indexed thin pages that must stay noindex and unlinked", () => {
    for (const id of [
      "plastic-brick-toy-figure-group-ai-photo-prompt",
      "amber-shadow-triptych",
      "analog-street-fashion",
      "cozy-dream-room",
      "color-pop-pedestal",
      "retro-hand-painted-film-poster-ai-prompt",
      "clay-crew",
      "garden-lawn-makeover",
      "bathroom-spa-upgrade",
      "refined-luxury-living",
      "historic-revival",
    ]) {
      assert.ok(temporaryNoindexStyleIds.has(id), id);
    }
  });

  it("omits every temporary noindex style from the sitemap", async () => {
    const entries = await sitemap();
    const urls = new Set(entries.map((entry) => entry.url));
    for (const id of temporaryNoindexStyleIds) {
      assert.equal(urls.has(absoluteUrl(`/styles/${id}`)), false, id);
    }
    // Still indexable styles remain.
    assert.ok(urls.has(absoluteUrl("/styles/meadow-reverie")));
  });

  it("keeps noindex styles out of public indexable listings and related blocks", async () => {
    const published = await listPublishedStyles();
    const indexable = await listIndexablePublishedStyles();
    assert.equal(indexable.length, published.length - temporaryNoindexStyleIds.size);
    for (const id of temporaryNoindexStyleIds) {
      assert.equal(
        indexable.some((style) => style.id === id),
        false,
        id,
      );
    }

    const related = relatedStylesFor(
      "meadow-reverie",
      "Editorial",
      withoutTemporaryNoindexStyles(published),
      ["clay-crew", "color-pop-pedestal", "meadow-reverie"],
    );
    assert.equal(related.some((style) => temporaryNoindexStyleIds.has(style.id)), false);
    assert.equal(related.some((style) => style.id === "clay-crew"), false);
  });

  it("sets robots noindex,follow for listed styles and leaves others indexable", async () => {
    const noindexId = "clay-crew";
    assert.ok(temporaryNoindexStyleIds.has(noindexId));

    const noindexMeta = await generateMetadata({
      params: Promise.resolve({ slug: noindexId }),
    });
    assert.deepEqual(noindexMeta.robots, { index: false, follow: true });

    const indexableMeta = await generateMetadata({
      params: Promise.resolve({ slug: "meadow-reverie" }),
    });
    const robots = indexableMeta.robots;
    if (robots && typeof robots === "object" && "index" in robots) {
      assert.notEqual(robots.index, false);
    }
  });
});
