import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { describe, it } from "node:test";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { listStylesBySlugs } from "../../src/lib/catalog/repository";
import {
  HOME_RAILS,
  PROFESSIONAL_RAIL_FALLBACK_MIN,
  isProfessionalHeadshotFallback,
  mergeProfessionalRailStyles,
} from "../../src/lib/home/rails";

const root = join(dirname(fileURLToPath(import.meta.url)), "../..");

function readSrc(rel: string) {
  return readFileSync(join(root, rel), "utf8");
}

const professional = HOME_RAILS.find((rail) => rail.id === "professional");

describe("Professional homepage rail", () => {
  it("curates LinkedIn/CV headshot slugs with guide See-all link", () => {
    assert.ok(professional);
    assert.equal(professional!.title, "Professional");
    assert.equal(
      professional!.href,
      "/guides/gemini-headshot-cv-photo-prompts",
    );
    assert.equal(professional!.limit, 12);
    assert.equal(professional!.category, undefined);
    assert.deepEqual(professional!.slugs, [
      "executive-corporate-linkedin-profile-picture-prompt-gemini",
      "black-blazer-linkedin-profile-picture-prompt-gemini-women",
      "charcoal-suit-corporate-linkedin-profile-picture-prompt-gemini-men",
      "hijab-office-linkedin-profile-picture-prompt-gemini-women",
      "navy-blazer-linkedin-profile-picture-prompt-gemini",
      "dupatta-office-linkedin-profile-picture-prompt-gemini-women",
      "cv-photo-ai-prompt-plain-background-resume-headshot",
      "passport-size-photo-ai-prompt-gemini-white-background",
      "modern-office-linkedin-profile-picture-prompt-gemini",
      "shalwar-kameez-linkedin-profile-picture-prompt-gemini-men",
      "outdoor-natural-light-linkedin-profile-picture-prompt-gemini",
      "home-office-linkedin-profile-picture-prompt-gemini",
    ]);

    const page = readSrc("src/app/page.tsx");
    assert.ok(page.includes("listStylesBySlugs(HOME_RAILS[2]!.slugs"));
    assert.ok(page.includes("fillProfessionalRailStyles"));
    assert.ok(!page.includes("listStylesByCategory(HOME_RAILS[2]"));
  });

  it("resolves curated slugs in order from the published catalog", async () => {
    const resolved = await listStylesBySlugs(professional!.slugs ?? []);
    assert.ok(resolved.length >= PROFESSIONAL_RAIL_FALLBACK_MIN);
    assert.deepEqual(
      resolved.map((style) => style.id),
      (professional!.slugs ?? []).slice(0, resolved.length),
    );
  });

  it("excludes saree/bridal/triptych glam from fallback matches", () => {
    assert.equal(
      isProfessionalHeadshotFallback(
        "saree-ai-photo-prompt",
        "Saree AI Photo Prompt",
      ),
      false,
    );
    assert.equal(
      isProfessionalHeadshotFallback(
        "floral-triptych-editorial",
        "Floral Triptych",
      ),
      false,
    );
    assert.equal(
      isProfessionalHeadshotFallback(
        "navy-blazer-linkedin-profile-picture-prompt-gemini",
        "Navy Blazer LinkedIn",
      ),
      true,
    );
    assert.equal(
      isProfessionalHeadshotFallback(
        "cv-photo-ai-prompt-plain-background-resume-headshot",
        "CV Photo AI Prompt",
      ),
      true,
    );
  });

  it("keeps curated order and only fills when under the fallback minimum", () => {
    const curated = [
      { id: "a" },
      { id: "b" },
      { id: "c" },
      { id: "d" },
      { id: "e" },
      { id: "f" },
      { id: "g" },
    ];
    const fallback = [{ id: "g" }, { id: "h" }, { id: "i" }];
    assert.deepEqual(
      mergeProfessionalRailStyles(curated, fallback, 12).map((s) => s.id),
      ["a", "b", "c", "d", "e", "f", "g", "h", "i"],
    );

    const enough = Array.from({ length: 8 }, (_, i) => ({ id: `c${i}` }));
    assert.deepEqual(
      mergeProfessionalRailStyles(enough, [{ id: "extra" }], 12).map(
        (s) => s.id,
      ),
      enough.map((s) => s.id),
    );
  });
});
