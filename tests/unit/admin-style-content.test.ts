import assert from "node:assert/strict";
import { describe, it } from "node:test";
import {
  adminStyleContentSchema,
  findUnknownPlaceholders,
  styleSlugSchema,
} from "../../src/lib/admin/schemas";

describe("admin style content schema", () => {
  it("accepts a valid lowercase slug", () => {
    assert.equal(styleSlugSchema.safeParse("cinematic-window").success, true);
    assert.equal(styleSlugSchema.safeParse("Bad Slug").success, false);
    assert.equal(styleSlugSchema.safeParse("-leading").success, false);
  });

  it("flags unknown template placeholders", () => {
    assert.deepEqual(findUnknownPlaceholders("Hello {{mood}} and {{foo}}"), [
      "foo",
    ]);
    assert.deepEqual(
      findUnknownPlaceholders("{{mood}} {{background}} {{ratio}} {{preserve}} {{subject}}"),
      [],
    );
  });

  it("rejects templates with unknown placeholders", () => {
    const base = {
      title: "Test Style",
      slug: "test-style",
      category: "Cinematic" as const,
      subject: "Person" as const,
      intent: "Artistic restyle" as const,
      requirement: "One photo" as const,
      tool: "ChatGPT Image" as const,
      note: "A short note",
      description: "A longer description for the style detail page.",
      bestSourcePhoto: ["Clear selfie"],
      changes: ["Lighting"],
      stays: ["Face"],
      targetSourcePhoto: "One clear frontal photo",
      cardHeight: 330,
      cardSourceUrl: "https://example.com/source.jpg",
      cardResultUrl: "https://example.com/result.jpg",
      examplePairs: [
        {
          sourceUrl: "https://example.com/s1.jpg",
          resultUrl: "https://example.com/r1.jpg",
          altSource: "s1",
          altResult: "r1",
        },
        {
          sourceUrl: "https://example.com/s2.jpg",
          resultUrl: "https://example.com/r2.jpg",
          altSource: "s2",
          altResult: "r2",
        },
      ],
      variant: {
        tool: "ChatGPT Image" as const,
        mode: "Image edit",
        version: "v1",
        template:
          "Edit with {{mood}} and {{background}} for {{ratio}}. Preserve {{preserve}}. Extra {{unknown}}.",
        defaults: {
          mood: "Warm neutral" as const,
          background: "Softly blurred interior" as const,
          ratio: "4:5 Portrait" as const,
          keepClothing: true,
          keepPose: true,
        },
        limitations: ["Needs a clear photo"],
        lastVerified: "2026-09-20",
        inputImageCount: 1,
        inputImageRoles: ["source photo"],
      },
    };

    const bad = adminStyleContentSchema.safeParse(base);
    assert.equal(bad.success, false);

    const good = adminStyleContentSchema.safeParse({
      ...base,
      variant: {
        ...base.variant,
        template:
          "Edit {{subject}} with {{mood}}, {{background}}, {{ratio}}. Preserve {{preserve}}.",
      },
    });
    assert.equal(good.success, true);
  });
});
