import { test, expect, type Page, type Request } from "@playwright/test";

const MOBILE = { width: 390, height: 844 };
/** Soft ceiling for a single gallery card image transfer at 390 CSS px (2× ≈ 720w). */
const MAX_CARD_BYTES = 120_000;

function trackNextImageRequests(page: Page) {
  const hits: string[] = [];
  const onRequest = (req: Request) => {
    const url = req.url();
    if (url.includes("/_next/image")) hits.push(url);
  };
  page.on("request", onRequest);
  return {
    hits,
    dispose: () => page.off("request", onRequest),
  };
}

async function expectGalleryImagesLoaded(page: Page) {
  const imgs = page.locator(
    '[data-testid="style-results"] img, .home-masonry img, .style-card-rail-media img, .style-card-explore img',
  );
  await expect(imgs.first()).toBeVisible({ timeout: 30_000 });
  const count = await imgs.count();
  expect(count).toBeGreaterThan(0);

  const loaded = await imgs.evaluateAll((nodes) =>
    nodes
      .slice(0, 8)
      .map((node) => {
        const img = node as HTMLImageElement;
        return {
          src: img.currentSrc || img.src,
          naturalWidth: img.naturalWidth,
        };
      }),
  );

  const withSrc = loaded.filter((img) => img.src && !img.src.startsWith("data:"));
  expect(withSrc.length).toBeGreaterThan(0);
  for (const img of withSrc) {
    expect(img.src.includes("/_next/image"), `unexpected optimizer URL: ${img.src}`).toBe(
      false,
    );
    expect(img.naturalWidth, `image failed to decode: ${img.src}`).toBeGreaterThan(0);
  }
  return withSrc;
}

async function expectCardTransfersBounded(page: Page) {
  const imgs = page.locator(
    '[data-testid="style-results"] img, .home-masonry .style-card-rail-media img, .style-card-explore img',
  );
  const srcs = await imgs.evaluateAll((nodes) =>
    nodes.slice(0, 12).map((node) => {
      const img = node as HTMLImageElement;
      return (img.currentSrc || img.src).split("?")[0]!;
    }),
  );

  const checked = srcs.filter((src) => src && !src.startsWith("data:"));
  expect(checked.length).toBeGreaterThan(0);

  // Local catalog cards must use rewritten `.w*.webp` variants (not full PNGs).
  const fullLocal = checked.filter((src) =>
    /\/catalog\/.+\.(png|jpe?g)$/i.test(src),
  );
  expect(fullLocal, `expected local catalog variants, got:\n${fullLocal.join("\n")}`).toEqual(
    [],
  );

  const variantSrcs = checked.filter((src) =>
    /\.w(360|540|720|1080)\.webp$/i.test(src),
  );
  expect(
    variantSrcs.length,
    "expected at least one pre-generated .w*.webp card image",
  ).toBeGreaterThan(0);

  // Fetch byte sizes via the page so memory-cache hits still return body length.
  const measured = await page.evaluate(async (urls) => {
    const out: { src: string; bytes: number }[] = [];
    for (const src of urls) {
      const res = await fetch(src, { cache: "force-cache" });
      const buf = await res.arrayBuffer();
      out.push({ src, bytes: buf.byteLength });
    }
    return out;
  }, variantSrcs);

  for (const { src, bytes } of measured) {
    expect(bytes, `empty body for ${src}`).toBeGreaterThan(0);
    expect(bytes, `card image too large (${bytes} B): ${src}`).toBeLessThanOrEqual(
      MAX_CARD_BYTES,
    );
  }
}

test.describe("catalog image variants (Vercel opt off)", () => {
  test.use({ viewport: MOBILE });

  test("home serves gallery images without /_next/image and under ~120KB", async ({
    page,
  }) => {
    const tracker = trackNextImageRequests(page);
    try {
      await page.goto("/", { waitUntil: "networkidle" });
      await expect(
        page.getByRole("heading", { level: 2, name: /Explore everything/i }),
      ).toBeVisible();
      await expectGalleryImagesLoaded(page);
      expect(
        tracker.hits,
        `unexpected /_next/image requests:\n${tracker.hits.join("\n")}`,
      ).toEqual([]);
      await expectCardTransfersBounded(page);
    } finally {
      tracker.dispose();
    }
  });

  test("explore serves gallery images without /_next/image and under ~120KB", async ({
    page,
  }) => {
    const tracker = trackNextImageRequests(page);
    try {
      await page.goto("/explore", { waitUntil: "networkidle" });
      await expect(page.getByTestId("style-results")).toBeVisible();
      await expectGalleryImagesLoaded(page);
      expect(
        tracker.hits,
        `unexpected /_next/image requests:\n${tracker.hits.join("\n")}`,
      ).toEqual([]);
      await expectCardTransfersBounded(page);
    } finally {
      tracker.dispose();
    }
  });
});
