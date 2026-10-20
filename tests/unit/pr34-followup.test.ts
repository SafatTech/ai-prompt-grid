import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { describe, it } from "node:test";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "../..");

function readSrc(rel: string) {
  return readFileSync(join(root, rel), "utf8");
}

describe("PR34 follow-up: home feed soft-cap reserves (N-19 / R1)", () => {
  it("reserves skeleton slots under the soft cap and freezes height after the last batch", () => {
    const src = readSrc("src/components/home/explore-load-more.tsx");
    assert.ok(src.includes("softCapFor"));
    assert.ok(src.includes("softCap - shown"));
    assert.ok(src.includes("AUTO_FETCH_PAGES = 2"));
    assert.ok(src.includes("gridMinHeight"));
    assert.ok(src.includes("autoDone ? 0"));
    assert.ok(src.includes("heightLocked"));
    assert.ok(src.includes("reserveMasonryHeight"));
    assert.ok(src.includes("remainingSlots"));
    assert.ok(src.includes("measureMasonryContentHeight"));
    assert.ok(!src.includes("primedRef"));
    assert.ok(!src.includes("contain-intrinsic-size"));


    const css = readSrc("src/app/globals.css");
    assert.ok(css.includes("overflow-anchor: none"));
    assert.ok(css.includes(".home-load-more"));
    assert.ok(css.includes(".home-trust"));
    assert.ok(css.includes(".home-newsletter"));
  });
});

describe("PR34 follow-up: related SSR links (N-17 / R2)", () => {
  it("renders related style titles and hrefs before the heavy grid loads", () => {
    const src = readSrc("src/components/styles/related-styles-lazy.tsx");
    assert.ok(src.includes("Related styles"));
    assert.ok(src.includes("href={`/styles/${item.id}`}"));
    assert.ok(src.includes("{item.title}"));
    assert.ok(src.includes("related-styles-skeleton"));
  });

  it("renders related guide titles and hrefs before images load", () => {
    const src = readSrc("src/components/guides/guide-related-lazy.tsx");
    assert.ok(src.includes("Keep exploring"));
    assert.ok(src.includes("href={`/guides/${guide.slug}`}"));
    assert.ok(src.includes("{guide.heading}"));
    assert.ok(src.includes("guide-related-skeleton"));
  });
});

describe("PR34 follow-up: robots via metadata only (N-16 / N-21)", () => {
  it("does not mutate head robots from the client (avoids removeChild crash)", () => {
    const src = readSrc("src/components/explore/explore-url-sync.tsx");
    assert.ok(!src.includes("MutationObserver"));
    assert.ok(!src.includes("setRobotsMeta"));
    assert.ok(!src.includes('meta[name="robots"]'));
    assert.ok(!src.includes(".remove()"));
    assert.ok(src.includes("onQueryString"));

    const explore = readSrc("src/app/explore/page.tsx");
    assert.ok(explore.includes("robots: { index: true, follow: true }"));
    const faceted = readSrc("src/app/explore/faceted/page.tsx");
    assert.ok(faceted.includes("robots: { index: false, follow: true }"));
    const middleware = readSrc("src/middleware.ts");
    assert.ok(middleware.includes("x-robots-tag"));
    assert.ok(middleware.includes("noindex, follow"));
  });
});

describe("PR34 follow-up: mobile menu focus (N-18)", () => {
  it("moves focus into the drawer, traps Tab, and restores on close", () => {
    const src = readSrc("src/components/site-header.tsx");
    assert.ok(src.includes("menuButtonRef"));
    assert.ok(src.includes("drawerPanelRef"));
    assert.ok(src.includes("first?.focus()"));
    assert.ok(src.includes("trigger?.focus()"));
    assert.ok(src.includes('event.key === "Tab"') || src.includes('event.key !== "Tab"'));
  });
});

describe("PR34 follow-up: tap targets not clipped (N-20 / R4)", () => {
  it("truncates title text on an inner span so the link hit area is unclipped", () => {
    const css = readSrc("src/app/globals.css");
    const card = readSrc("src/components/style-card.tsx");
    assert.ok(card.includes('className="style-card-title-text"'));
    assert.ok(css.includes(".style-card-title-text"));
    const titleBlock = css.slice(
      css.indexOf(".style-card-title-link {"),
      css.indexOf(".style-card-title-text"),
    );
    assert.ok(titleBlock.includes("overflow: visible"));
    assert.ok(!titleBlock.includes("overflow: hidden"));
  });

  it("gives chips scroller vertical room and Pause an unclipped hit wrapper", () => {
    const css = readSrc("src/app/globals.css");
    assert.ok(css.includes("padding-block: 6px"));
    assert.ok(css.includes(".hero-wall-pause-hit"));
    const pause = readSrc("src/components/home/hero-wall-pause.tsx");
    assert.ok(pause.includes("hero-wall-pause-hit"));
  });

  it("gives the heart a ≥44px hit area without enlarging the visible button", () => {
    const css = readSrc("src/app/globals.css");
    const heartAfter = css.slice(
      css.indexOf(".style-card-heart::after"),
      css.indexOf(".site-logo-link::after"),
    );
    assert.ok(heartAfter.includes("width: 44px"));
    assert.ok(heartAfter.includes("height: 44px"));
    const card = readSrc("src/components/style-card.tsx");
    assert.ok(card.includes("style-card-heart"));
    assert.ok(card.includes("h-[38px] w-[38px]"));
    // Article must not clip the ::after hit area.
    assert.ok(
      !card.includes(
        '"style-card-rail group relative overflow-hidden rounded-[var(--radius)]',
      ),
    );
  });
});
