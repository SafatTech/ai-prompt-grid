import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { createEmptyFilters, filterStyles } from "../../src/lib/catalog/filters";
import { resolveCatalogMediaUrl } from "../../src/lib/catalog/seed-asset-url";
import { getPublishedStyles } from "../../src/lib/catalog/styles";
import { toStyleCardDataList } from "../../src/lib/catalog/style-card-data";

const SAMPLE = 150;

describe("explore wall image URLs", () => {
  it("rewrites legacy /catalog paths to catalog-public WebPs", () => {
    assert.match(
      resolveCatalogMediaUrl("/catalog/editorial/result-54.png"),
      /\/seed\/catalog\/editorial\/result-54\.webp$/,
    );
    assert.match(
      resolveCatalogMediaUrl("/catalog/product/result-01.png"),
      /\/seed\/catalog\/product\/result-01\.webp$/,
    );
    const remote =
      "https://rbmirzmppbytorbhncxj.supabase.co/storage/v1/object/public/catalog-public/seed/catalog/editorial/result-01.webp";
    assert.equal(resolveCatalogMediaUrl(remote), remote);
  });

  it("exposes http(s) result URLs for the first 150 A-Z wall cards", () => {
    const matches = filterStyles(
      getPublishedStyles(),
      createEmptyFilters(),
      "",
      "A-Z",
    );
    const cards = toStyleCardDataList(matches.slice(0, SAMPLE), {
      sharedBlur: true,
      includePromptPreview: true,
    });
    assert.equal(cards.length, SAMPLE);
    for (const card of cards) {
      assert.match(
        card.result,
        /^https:\/\//,
        `${card.id} still has a non-http result: ${card.result}`,
      );
      assert.doesNotMatch(
        card.result,
        /^\/catalog\//,
        `${card.id} still uses a site-relative /catalog path`,
      );
    }
  });

  it(
    "returns HTTP 200 for every result image in the first 150 wall cards",
    { timeout: 120_000 },
    async () => {
      const matches = filterStyles(
        getPublishedStyles(),
        createEmptyFilters(),
        "",
        "A-Z",
      );
      const cards = toStyleCardDataList(matches.slice(0, SAMPLE), {
        sharedBlur: true,
      });
      const failures: string[] = [];
      // Bound concurrency so we do not stampede storage.
      const queue = [...cards];
      const workers = Array.from({ length: 12 }, async () => {
        while (queue.length) {
          const card = queue.shift();
          if (!card) return;
          try {
            const res = await fetch(card.result, { method: "HEAD" });
            // Some CDNs disallow HEAD; fall back to a ranged GET.
            if (res.status === 405 || res.status === 403) {
              const get = await fetch(card.result, {
                headers: { Range: "bytes=0-0" },
              });
              if (!(get.status === 200 || get.status === 206)) {
                failures.push(`${card.id} → ${get.status} ${card.result}`);
              }
            } else if (res.status !== 200) {
              failures.push(`${card.id} → ${res.status} ${card.result}`);
            }
          } catch (error) {
            failures.push(
              `${card.id} → ${error instanceof Error ? error.message : String(error)} ${card.result}`,
            );
          }
        }
      });
      await Promise.all(workers);
      assert.equal(
        failures.length,
        0,
        `Broken wall images:\n${failures.slice(0, 20).join("\n")}`,
      );
    },
  );
});
