import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import { describe, it } from "node:test";

const root = process.cwd();

function read(rel: string) {
  return fs.readFileSync(path.join(root, rel), "utf8");
}

describe("home.css mobile cascade (re-land #47)", () => {
  it("keeps season/rail mobile overrides in home.css after base rules", () => {
    const home = read("src/app/home.css");
    const globals = read("src/app/globals.css");

    const baseSeason = home.indexOf(".home-season {\n");
    const mobileBlock = home.indexOf("/* Home mobile overrides");
    assert.ok(baseSeason >= 0, "base .home-season missing");
    assert.ok(mobileBlock >= 0, "mobile overrides comment missing");
    assert.ok(baseSeason < mobileBlock, "mobile block must follow base season rules");

    const mobileCss = home.slice(mobileBlock);
    assert.ok(mobileCss.includes("@media (max-width: 699px)"));
    assert.ok(/\.home-season\s*\{[\s\S]*?display:\s*flex/.test(mobileCss));
    assert.ok(/\.home-season\s*\{[\s\S]*?flex-direction:\s*column/.test(mobileCss));
    assert.ok(/\.home-rail-arrows\s*\{[\s\S]*?display:\s*none/.test(mobileCss));
    assert.ok(mobileCss.includes("@media (max-width: 767px)"));
    assert.ok(/\.home-rail\s*\{[\s\S]*?grid-auto-columns:\s*62%/.test(mobileCss));

    // Must not remain in globals media queries ahead of page CSS (the original bug).
    assert.equal(globals.includes(".home-season"), false);
    assert.equal(globals.includes(".home-rail-arrows"), false);
    // Desktop rail edge-bleed lived under @media (max-width: 767px); reduced-motion
    // may still mention .home-rail, but the 62% auto-columns rule must not.
    assert.equal(globals.includes("grid-auto-columns: 62%"), false);
  });
});
