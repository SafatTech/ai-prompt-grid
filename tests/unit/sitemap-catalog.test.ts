import assert from "node:assert/strict";
import { describe, it, type TestContext } from "node:test";
import {
  listPublishedStyleSitemapEntries,
  mergeSitemapStyleEntries,
  SITEMAP_STYLE_QUERY_MS,
  type SitemapStyleEntry,
} from "../../src/lib/catalog/repository";
import { characterStyleIds } from "../../src/lib/catalog/seed-character-styles";
import { getPublishedStyles } from "../../src/lib/catalog/styles";

/** Minimal stand-in so supabase-js can construct a client on Node 20. */
class NoopWebSocket {
  close() {}
}

function stalledQueryError(name: "TimeoutError" | "AbortError"): DOMException {
  const message =
    name === "TimeoutError"
      ? "The operation was aborted due to timeout"
      : "The operation was aborted.";
  return new DOMException(message, name);
}

async function flush(): Promise<void> {
  await new Promise((resolve) => {
    setImmediate(resolve);
  });
}

async function assertStalledQueryFallsBack(
  t: TestContext,
  errorName: "TimeoutError" | "AbortError",
): Promise<void> {
  // Node's AbortSignal.timeout uses internal timers that mock.timers does not
  // advance, so drive it from setTimeout and let the fake clock fire both.
  t.mock.timers.enable({ apis: ["setTimeout"] });
  let querySignal: AbortSignal | undefined;
  t.mock.method(AbortSignal, "timeout", (ms: number) => {
    assert.equal(ms, SITEMAP_STYLE_QUERY_MS);
    const controller = new AbortController();
    querySignal = controller.signal;
    setTimeout(() => {
      controller.abort(
        new DOMException("The operation was aborted due to timeout", "TimeoutError"),
      );
    }, ms);
    return controller.signal;
  });

  const fetches: Array<{ url: string; signal: AbortSignal | undefined }> = [];
  const originalFetch = globalThis.fetch;
  globalThis.fetch = (async (input: RequestInfo | URL, init?: RequestInit) => {
    const url =
      typeof input === "string" ? input : input instanceof URL ? input.href : input.url;
    const signal = init?.signal ?? undefined;
    fetches.push({ url, signal });
    return new Promise<Response>((_resolve, reject) => {
      const fail = () => reject(stalledQueryError(errorName));
      if (!signal) return;
      if (signal.aborted) {
        fail();
        return;
      }
      signal.addEventListener("abort", fail, { once: true });
    });
  }) as typeof fetch;

  const warnings: unknown[][] = [];
  t.mock.method(console, "warn", (...args: unknown[]) => {
    warnings.push(args);
  });

  const previousWebSocket = globalThis.WebSocket;
  globalThis.WebSocket = NoopWebSocket as unknown as typeof WebSocket;

  const previousUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const previousKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  process.env.NEXT_PUBLIC_SUPABASE_URL = "https://example.supabase.co";
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY = "test-anon-key";

  try {
    let status: "pending" | "fulfilled" | "rejected" = "pending";
    const pending = listPublishedStyleSitemapEntries().then(
      (entries) => {
        status = "fulfilled";
        return entries;
      },
      (err: unknown) => {
        status = "rejected";
        throw err;
      },
    );

    await flush();
    assert.equal(status, "pending");
    t.mock.timers.tick(SITEMAP_STYLE_QUERY_MS - 1);
    await flush();
    assert.equal(status, "pending");
    assert.equal(querySignal?.aborted, false);

    t.mock.timers.tick(1);
    const entries = await pending;

    assert.equal(status, "fulfilled");
    assert.equal(querySignal?.aborted, true);
    assert.ok(
      fetches.some((call) => call.url.includes("/styles") && call.signal?.aborted),
      "stalled styles request was aborted",
    );
    assert.deepEqual(
      entries.map((entry) => entry.slug).sort(),
      getPublishedStyles()
        .map((style) => style.id)
        .sort(),
    );
    assert.ok(
      warnings.some((args) => {
        const detail = args[1];
        return (
          (String(args[0]).includes("Sitemap style query failed") ||
            String(args[0]).includes("Unexpected sitemap catalog error")) &&
          (typeof detail === "string"
            ? detail.includes(errorName) || detail.includes("Timed out")
            : String(detail).includes(errorName) || String(detail).includes("Timed out"))
        );
      }),
      `${errorName} / timeout is logged before the seed fallback`,
    );
  } finally {
    globalThis.fetch = originalFetch;
    globalThis.WebSocket = previousWebSocket;
    if (previousUrl === undefined) delete process.env.NEXT_PUBLIC_SUPABASE_URL;
    else process.env.NEXT_PUBLIC_SUPABASE_URL = previousUrl;
    if (previousKey === undefined) delete process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
    else process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY = previousKey;
  }
}

describe("sitemap style query", () => {
  it("aborts a stalled query on TimeoutError and falls back to the seed catalog", async (t) => {
    await assertStalledQueryFallsBack(t, "TimeoutError");
  });

  it("aborts a stalled query on AbortError and falls back to the seed catalog", async (t) => {
    await assertStalledQueryFallsBack(t, "AbortError");
  });
});

describe("sitemap seed completeness (N-31)", () => {
  it("includes every character style in the published seed fallback", () => {
    const published = new Set(getPublishedStyles().map((style) => style.id));
    assert.ok(
      published.size >= 250,
      `expected ≥250 published seed styles, got ${published.size}`,
    );
    assert.equal(characterStyleIds.size, 74);
    for (const id of characterStyleIds) {
      assert.ok(published.has(id), `missing character style in seed: ${id}`);
    }
    assert.ok(published.has("desert-warrior-prince-ai-photo-prompt"));
    assert.ok(published.has("dark-fantasy-armored-knight-ai-photo-prompt"));
  });

  it("unions seed slugs when Supabase undercounts before the latest batches", () => {
    const seed = getPublishedStyles().map((style) => ({
      slug: style.id,
      lastModified: new Date("2026-01-01T00:00:00.000Z"),
    }));
    const partial: SitemapStyleEntry[] = seed
      .filter((entry) => !characterStyleIds.has(entry.slug))
      .map((entry) => ({
        slug: entry.slug,
        lastModified: new Date("2026-10-01T00:00:00.000Z"),
      }));
    assert.equal(partial.length, 210);
    const merged = mergeSitemapStyleEntries(partial, seed);
    assert.equal(merged.length, seed.length);
    const slugs = new Set(merged.map((entry) => entry.slug));
    assert.ok(slugs.has("desert-warrior-prince-ai-photo-prompt"));
    assert.ok(slugs.has("dark-fantasy-armored-knight-ai-photo-prompt"));
    // DB lastModified wins for overlapping slugs.
    const editorial = merged.find((entry) => entry.slug === partial[0]!.slug);
    assert.equal(editorial?.lastModified.toISOString(), "2026-10-01T00:00:00.000Z");
  });
});
