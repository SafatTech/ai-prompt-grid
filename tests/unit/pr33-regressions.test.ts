import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { describe, it } from "node:test";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "../..");

function readSrc(rel: string) {
  return readFileSync(join(root, rel), "utf8");
}

describe("PR33 regressions: card title truncation (N-14)", () => {
  it("truncates on an inner span so the link hit area stays unclipped", () => {
    const css = readSrc("src/app/globals.css");
    assert.ok(css.includes(".style-card-title-link"));
    assert.ok(css.includes(".style-card-title-text"));
    assert.ok(css.includes("text-overflow: ellipsis"));
    const textBlock = css.slice(
      css.indexOf(".style-card-title-text"),
      css.indexOf(".style-card-title-link::after"),
    );
    assert.ok(textBlock.includes("overflow: hidden"));
    assert.ok(!css.includes("display: inline-block;\n  max-width: 100%;\n}\n\n.style-card-rail-body h3 a::after"));
  });
});

describe("PR33 regressions: explore drawer staging (N-15)", () => {
  it("applies draft filters only on Show N styles", () => {
    const src = readSrc("src/components/explore/explore-client.tsx");
    assert.ok(src.includes("draftFilters"));
    assert.ok(src.includes("applyDraftFilters"));
    assert.ok(src.includes("stageOnly"));
    assert.ok(src.includes("onClick={applyDraftFilters}"));
  });
});

describe("PR33 regressions: robots meta dedupe (N-16)", () => {
  it("removes duplicate robots meta tags when syncing", () => {
    const src = readSrc("src/components/explore/explore-url-sync.tsx");
    assert.ok(src.includes('meta[name="robots"]'));
    assert.ok(src.includes("querySelectorAll"));
    assert.ok(src.includes(".remove()"));
    assert.ok(src.includes("MutationObserver"));
  });
});

describe("PR33 regressions: modal / section deferred load (N2)", () => {
  it("loads modals via interaction import, not startup dynamic()", () => {
    const modals = readSrc("src/components/providers/ui-modal-provider.tsx");
    assert.ok(!modals.includes("next/dynamic"));
    assert.ok(modals.includes('import("@/components/modals/sign-in-modal")'));

    const stylePage = readSrc("src/app/styles/[slug]/page.tsx");
    assert.ok(stylePage.includes("RelatedStylesLazy"));
    assert.ok(!stylePage.includes("next/dynamic"));

    const guidePage = readSrc("src/app/guides/[slug]/page.tsx");
    assert.ok(guidePage.includes("GuideRelatedLazy"));
  });
});

describe("PR33 regressions: explore LCP / toolbar", () => {
  it("prioritises the first row of explore cards and fixes toolbar geometry", () => {
    const src = readSrc("src/components/explore/explore-client.tsx");
    assert.ok(src.includes("priority={listing.page === 1 && index < 3}"));
    assert.ok(src.includes("explore-results-count"));
    assert.ok(src.includes("w-[12ch]"));
  });
});
