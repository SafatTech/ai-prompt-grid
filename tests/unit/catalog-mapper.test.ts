import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { mapDbStyleToCatalog, type DbStyleRow } from "../../src/lib/catalog/mapper";

describe("mapDbStyleToCatalog", () => {
  it("maps a joined style row onto CatalogStyle using slug as id", () => {
    const row: DbStyleRow = {
      id: "11111111-1111-5111-8111-111111111111",
      slug: "cinematic-window",
      title: "Cinematic Window Portrait",
      summary: "Works with one clear photo",
      description: "Turn a portrait cinematic.",
      supported_subjects: ["Person"],
      edit_intent: "Change lighting",
      input_requirement: "One photo",
      photo_requirements: { best: ["One visible face"] },
      preservation_targets: ["Face"],
      change_targets: ["Lighting"],
      target_source_photo: "Clear selfie",
      card_height: 360,
      save_count: 486,
      status: "published",
      categories: { name: "Cinematic", slug: "cinematic" },
      prompt_variants: [
        {
          id: "22222222-2222-5222-8222-222222222222",
          tool: "ChatGPT Image",
          mode: "Image edit",
          input_image_count: 1,
          input_image_roles: ["source photo"],
          version: "1.0.0",
          template: "Edit with {{mood}} and {{background}} for {{ratio}}.",
          variables: {
            defaults: {
              mood: "Warm neutral",
              background: "Softly blurred interior",
              ratio: "4:5 Portrait",
              keepClothing: true,
              keepPose: true,
            },
          },
          test_record: {
            lastVerified: "2026-09-15",
            limitations: ["May soften freckles"],
          },
          is_primary: true,
          status: "published",
        },
      ],
      style_assets: [
        {
          id: "a1",
          kind: "card_pair",
          source_storage_key: "https://example.com/source.jpg",
          result_storage_key: "https://example.com/result.jpg",
          alt_text: "Card",
          sort_order: 0,
        },
        {
          id: "a2",
          kind: "example_pair",
          source_storage_key: "https://example.com/ex-source.jpg",
          result_storage_key: "https://example.com/ex-result.jpg",
          alt_text: "Example source",
          sort_order: 1,
        },
      ],
    };

    const mapped = mapDbStyleToCatalog(row);
    assert.ok(mapped);
    assert.equal(mapped.id, "cinematic-window");
    assert.equal(mapped.category, "Cinematic");
    assert.equal(mapped.tool, "ChatGPT Image");
    assert.equal(mapped.source, "https://example.com/source.jpg");
    assert.equal(mapped.examplePairs.length, 1);
    assert.equal(mapped.promptVariant.defaults.mood, "Warm neutral");
    assert.equal(mapped.promptVariant.limitations[0], "May soften freckles");
  });

  it("returns null when no prompt variant exists", () => {
    const mapped = mapDbStyleToCatalog({
      id: "x",
      slug: "x",
      title: "X",
      summary: "",
      description: "",
      supported_subjects: ["Person"],
      edit_intent: "Artistic restyle",
      input_requirement: "One photo",
      photo_requirements: {},
      preservation_targets: [],
      change_targets: [],
      target_source_photo: "",
      card_height: 300,
      save_count: 0,
      status: "published",
      categories: { name: "Anime", slug: "anime" },
      prompt_variants: [],
      style_assets: [],
    });
    assert.equal(mapped, null);
  });
});
