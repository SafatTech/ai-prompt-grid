import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { getPublishedStyles } from "../../src/lib/catalog/styles";
import { listPublishedStyleSitemapEntries } from "../../src/lib/catalog/repository";

const SITEMAP_STYLE_QUERY_MS = 4_000;

function abortError(): Error {
  const error = new Error("The operation was aborted");
  error.name = "AbortError";
  return error;
}

async function flush(): Promise<void> {
  await new Promise((resolve) => {
    setImmediate(resolve);
  });
}

describe("sitemap style query", () => {
  it("aborts a stalled query and falls back to the seed catalog", async (t) => {
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
        if (!signal) return;
        if (signal.aborted) {
          reject(abortError());
          return;
        }
        signal.addEventListener("abort", () => reject(abortError()), { once: true });
      });
    }) as typeof fetch;

    const warnings: unknown[][] = [];
    t.mock.method(console, "warn", (...args: unknown[]) => {
      warnings.push(args);
    });

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
            String(args[0]).includes("Sitemap style query failed") &&
            typeof detail === "string" &&
            detail.includes("AbortError")
          );
        }),
        "abort error is logged before the seed fallback",
      );
    } finally {
      globalThis.fetch = originalFetch;
      if (previousUrl === undefined) delete process.env.NEXT_PUBLIC_SUPABASE_URL;
      else process.env.NEXT_PUBLIC_SUPABASE_URL = previousUrl;
      if (previousKey === undefined) delete process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
      else process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY = previousKey;
    }
  });
});
