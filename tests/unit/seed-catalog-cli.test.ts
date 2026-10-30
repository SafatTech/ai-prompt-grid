import assert from "node:assert/strict";
import { describe, it } from "node:test";
import {
  filterMissingStyles,
  isAdditiveMode,
  parseSeedCliArgs,
  selectCandidateStyles,
} from "../../scripts/seed-catalog-cli";
import type { CatalogStyle } from "../../src/lib/catalog/types";

function stubStyle(id: string): CatalogStyle {
  return {
    id,
    title: id,
    note: "",
    description: "",
    category: "Cinematic",
    subject: "Person",
    intent: "New outfit or theme",
    tool: "Gemini",
    requirement: "One photo",
    bestSourcePhoto: [],
    stays: [],
    changes: [],
    targetSourcePhoto: "",
    height: 420,
    saved: 0,
    status: "published",
    source: `/catalog/editorial/source-${id}.png`,
    result: `/catalog/editorial/result-${id}.png`,
    examplePairs: [],
    promptVariant: {
      id: `${id}-v1`,
      tool: "Gemini",
      mode: "image_edit",
      inputImageCount: 1,
      inputImageRoles: ["subject"],
      version: "1",
      template: "x",
      defaults: {
        mood: "Elegant warm editorial",
        background: "Clean pale stone editorial backdrop with soft shadow falloff",
        ratio: "4:5 Portrait",
        keepClothing: false,
        keepPose: false,
      },
      lastVerified: "2026-01-01",
      limitations: [],
    },
  };
}

describe("seed-catalog CLI (additive mode)", () => {
  it("parses --only-missing, --dry-run, and --slugs forms", () => {
    assert.deepEqual(parseSeedCliArgs(["--only-missing", "--dry-run"]), {
      only: null,
      onlyMissing: true,
      slugs: null,
      dryRun: true,
    });
    assert.deepEqual(
      parseSeedCliArgs(["--slugs=a,b", "--only-missing"]).slugs,
      ["a", "b"],
    );
    assert.deepEqual(parseSeedCliArgs(["--slugs", "x, y"]).slugs, ["x", "y"]);
    assert.equal(isAdditiveMode(parseSeedCliArgs([])), false);
    assert.equal(isAdditiveMode(parseSeedCliArgs(["--only-missing"])), true);
    assert.equal(isAdditiveMode(parseSeedCliArgs(["--slugs=a"])), true);
  });

  it("selects only missing candidates and rejects unknown slugs", () => {
    const styles = [stubStyle("alpha"), stubStyle("beta"), stubStyle("gamma")];
    const candidates = selectCandidateStyles(styles, {
      only: null,
      onlyMissing: true,
      slugs: ["alpha", "gamma"],
      dryRun: false,
    });
    assert.deepEqual(
      candidates.map((s) => s.id),
      ["alpha", "gamma"],
    );
    assert.deepEqual(
      filterMissingStyles(candidates, ["alpha"]).map((s) => s.id),
      ["gamma"],
    );
    assert.throws(
      () =>
        selectCandidateStyles(styles, {
          only: null,
          onlyMissing: true,
          slugs: ["nope"],
          dryRun: false,
        }),
      /Unknown style slug/,
    );
  });
});
