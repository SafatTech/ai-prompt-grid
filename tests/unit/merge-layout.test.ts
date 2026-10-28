import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import { describe, it } from "node:test";
import {
  mergeInputPhotos,
  mergeResultBlurSrc,
  mergeResultImage,
  mergeResultSize,
  usesMergeHero,
  usesMergeStack,
} from "../../src/lib/catalog/merge-inputs";
import {
  pickAmbientBlurDataUrl,
  withStyleAmbientBlur,
} from "../../src/lib/catalog/repository";
import { getStyleById } from "../../src/lib/catalog/styles";
import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import {
  MergeBeforeAfter,
  resultPresentation,
} from "../../src/components/merge-before-after";
import { classifyPairImages, headingForImageSrc } from "../../src/lib/guides/image-pairs";

describe("merge input photos", () => {
  it("reads Photo 2 from the example pair that shares the result", () => {
    const style = getStyleById("riverside-merge-two-photos-prompt-gemini-couple");
    assert.ok(style);
    const photos = mergeInputPhotos(style);
    assert.equal(photos.length, 2);
    assert.match(photos[0]?.src ?? "", /source-75\./);
    assert.match(photos[1]?.src ?? "", /source-75b\./);
    assert.match(photos[1]?.alt ?? "", /black tee/);
    assert.equal(usesMergeHero(style), true);
    assert.equal(usesMergeStack(style), true);
    assert.equal(style.examplePairs[0]?.result, style.examplePairs[1]?.result);
    assert.match(photos[0]?.src ?? "", /supabase\.co/);
    assert.deepEqual(mergeResultSize(style), { width: 1122, height: 1402 });
  });

  it("keeps the keepsake result square", () => {
    const style = getStyleById("side-by-side-keepsake-frame-merge-two-photos-prompt-gemini-couple");
    assert.ok(style);
    assert.deepEqual(mergeResultSize(style), { width: 1200, height: 1200 });
    assert.match(style.result, /result-77\.webp$/);
  });

  it("keeps a two-photo style on one before when the second file is not stored", () => {
    const style = getStyleById("combine-two-photos-80s-couple");
    assert.ok(style);
    assert.equal(style.promptVariant.inputImageCount, 2);
    const photos = mergeInputPhotos(style);
    assert.equal(photos.length, 1);
    assert.match(photos[0]?.src ?? "", /source-58\./);
    assert.doesNotMatch(photos[0]?.src ?? "", /source-58b/);
    assert.equal(usesMergeHero(style), true);
    assert.equal(usesMergeStack(style), false);
  });

  it("leaves the matching-team examples as two one-photo results", () => {
    const style = getStyleById("matching-team-headshot-ai-prompt-gemini-company-page");
    assert.ok(style);
    assert.equal(style.promptVariant.inputImageCount, 1);
    assert.match(style.examplePairs[1]?.source ?? "", /source-70b\./);
    assert.notEqual(style.examplePairs[0]?.result, style.examplePairs[1]?.result);
    assert.equal(mergeInputPhotos(style).length, 0);
    assert.equal(usesMergeHero(style), false);
    assert.equal(usesMergeStack(style), false);
  });
});

describe("classify guide image groups", () => {
  it("docks two inputs and one result", () => {
    const classified = classifyPairImages([
      { src: "https://example.com/source-75.webp" },
      { src: "https://example.com/source-75b.webp" },
      { src: "https://example.com/result-75.webp" },
    ]);
    assert.equal(classified.inputs.length, 2);
    assert.match(classified.result?.src ?? "", /result-75\.webp$/);
  });

  it("keeps a single before and after on the old grid", () => {
    const classified = classifyPairImages([
      { src: "/guides/example/portrait-before.webp" },
      { src: "/guides/example/portrait-after.webp" },
    ]);
    assert.deepEqual(classified, { inputs: [], result: null });
  });

  it("keeps a square result's 1200x1200 size", () => {
    const classified = classifyPairImages([
      {
        src: "https://example.com/storage/source-77.webp",
        width: 1122,
        height: 1402,
      },
      {
        src: "https://example.com/storage/source-77b.webp",
        width: 1122,
        height: 1402,
      },
      {
        src: "https://example.com/storage/result-77.webp",
        width: 1200,
        height: 1200,
      },
    ]);
    assert.equal(classified.inputs.length, 2);
    assert.equal(classified.result?.width, 1200);
    assert.equal(classified.result?.height, 1200);
    assert.deepEqual(resultPresentation(1200, 1200), {
      aspectRatio: "1200 / 1200",
      contain: true,
    });
    assert.equal(resultPresentation(1122, 1402).contain, false);
  });

  it("docks wedding and mountain everyday inputs with remote results", () => {
    const classified = classifyPairImages([
      { src: "https://example.com/storage/source-84.webp" },
      { src: "https://example.com/storage/source-84b.webp" },
      { src: "https://example.com/storage/result-84.webp" },
    ]);
    assert.equal(classified.inputs.length, 2);
    assert.match(classified.result?.src ?? "", /result-84\.webp$/);
    const guide = fs.readFileSync(
      path.join(process.cwd(), "content/guides/how-to-merge-two-photos-in-gemini.mdx"),
      "utf8",
    );
    assert.doesNotMatch(guide, /Two photos in one frame|You and your pet/);
    assert.equal(
      headingForImageSrc(
        guide,
        "https://rbmirzmppbytorbhncxj.supabase.co/storage/v1/object/public/catalog-public/seed/catalog/editorial/source-84.webp",
      ),
      "8. Wedding stage",
    );
    assert.match(guide, /ordinary everyday photo taken at home/);
    assert.match(guide, /ordinary photo taken at home/);
    assert.match(guide, /source-84\.webp/);
    assert.match(guide, /source-86\.webp/);
    assert.match(guide, /cream patterned sherwani/);
    assert.match(guide, /red bridal lehenga/);
    assert.match(guide, /warm winter puffer jackets/);
    assert.match(guide, /cream scarf/);
    assert.doesNotMatch(guide, /black puffer|wedding-stage-input/);
    assert.doesNotMatch(
      guide,
      /!\[(?:[^\]]*sherwani|[^\]]*lehenga|[^\]]*black puffer)[^\]]*\]/,
    );
  });

  it("keeps two separate results on the old grid", () => {
    const classified = classifyPairImages([
      { src: "https://example.com/source-70.webp" },
      { src: "https://example.com/result-70.webp" },
      { src: "https://example.com/source-70b.webp" },
      { src: "https://example.com/result-70b.webp" },
    ]);
    assert.deepEqual(classified, { inputs: [], result: null });
  });
});

describe("merge result blur resolution", () => {
  it("prefers blur from the pair that shares the card result, then style.resultBlur", () => {
    const style = getStyleById("ai-birthday-photo-collage-prompt-friends-or-partner");
    assert.ok(style);
    // Seed has no blur; inject like the mapper does after backfill.
    const withBlur = {
      ...style,
      examplePairs: style.examplePairs.map((pair, index) =>
        index === 0
          ? { ...pair, resultBlur: "data:image/webp;base64,PAIR" }
          : pair,
      ),
      resultBlur: "data:image/webp;base64,CARD",
    };
    assert.equal(mergeResultBlurSrc(withBlur), "data:image/webp;base64,PAIR");
    assert.equal(mergeResultImage(withBlur).blurSrc, "data:image/webp;base64,PAIR");

    const cardOnly = {
      ...style,
      examplePairs: style.examplePairs.map((pair) => ({
        source: pair.source,
        result: pair.result,
        altSource: pair.altSource,
        altResult: pair.altResult,
        resultWidth: pair.resultWidth,
        resultHeight: pair.resultHeight,
      })),
      resultBlur: "data:image/webp;base64,CARD",
    };
    assert.equal(mergeResultBlurSrc(cardOnly), "data:image/webp;base64,CARD");
  });

  it("detail-only ambient blur attaches to mergeResultImage for the print stack", () => {
    const style = getStyleById("riverside-merge-two-photos-prompt-gemini-couple");
    assert.ok(style);
    assert.equal(usesMergeHero(style), true);
    assert.equal(mergeResultImage(style).blurSrc, undefined);

    const enriched = withStyleAmbientBlur(style, "data:image/webp;base64,DETAIL");
    assert.equal(enriched.resultBlur, "data:image/webp;base64,DETAIL");
    assert.equal(mergeResultImage(enriched).blurSrc, "data:image/webp;base64,DETAIL");

    // Local paths avoid next/image remote-host checks in unit tests.
    const html = renderToStaticMarkup(
      createElement(MergeBeforeAfter, {
        variant: "hero",
        title: style.title,
        inputs: [
          { src: "/catalog/editorial/source-75.png", alt: "Photo 1" },
          { src: "/catalog/editorial/source-75b.png", alt: "Photo 2" },
        ],
        result: {
          ...mergeResultImage(enriched),
          src: "/catalog/editorial/result-75.png",
        },
      }),
    );
    assert.match(html, /mba-ambient/);
    assert.match(html, /data:image\/webp;base64,DETAIL/);
    assert.match(html, /mba-stack/);
    assert.doesNotMatch(html, /mba-dock/);
  });

  it("picks card_pair blur before example_pair for the detail ambient fetch", () => {
    assert.equal(
      pickAmbientBlurDataUrl([
        {
          kind: "example_pair",
          sort_order: 1,
          result_blur_data_url: "data:image/webp;base64,EXAMPLE",
        },
        {
          kind: "card_pair",
          sort_order: 0,
          result_blur_data_url: "data:image/webp;base64,CARD",
        },
      ]),
      "data:image/webp;base64,CARD",
    );
    assert.equal(
      pickAmbientBlurDataUrl([
        {
          kind: "example_pair",
          sort_order: 1,
          result_blur_data_url: "not-a-data-uri",
        },
      ]),
      undefined,
    );
  });
});

describe("MergeBeforeAfter variants", () => {
  const inputs = [
    { src: "/catalog/editorial/source-01.png", alt: "Photo 1" },
    { src: "/catalog/editorial/source-02.png", alt: "Photo 2" },
  ];
  const result = {
    src: "/catalog/editorial/result-01.png",
    alt: "Result",
    blurSrc: "data:image/webp;base64,AA==",
  };

  it("renders the split card variant instead of docked chips", () => {
    const html = renderToStaticMarkup(
      createElement(MergeBeforeAfter, {
        variant: "card",
        title: "Riverside",
        inputs,
        result,
      }),
    );
    assert.match(html, /mba-split/);
    assert.match(html, /mba-split__seam/);
    assert.doesNotMatch(html, /mba-card-chip/);
  });

  it("renders ambient blur when blurSrc is present and omits it when null", () => {
    const withBlur = renderToStaticMarkup(
      createElement(MergeBeforeAfter, {
        variant: "hero",
        title: "Riverside",
        inputs,
        result,
      }),
    );
    assert.match(withBlur, /mba-ambient/);
    assert.match(withBlur, /data:image\/webp;base64,AA==/);

    const withoutBlur = renderToStaticMarkup(
      createElement(MergeBeforeAfter, {
        variant: "hero",
        title: "Riverside",
        inputs,
        result: { src: result.src, alt: result.alt },
      }),
    );
    assert.doesNotMatch(withoutBlur, /mba-ambient/);
  });
});
