import { test, expect, type Page, type Request } from "@playwright/test";

const MOBILE = { width: 390, height: 844 };

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
  // Prefer media roots so we don't pick up chrome/icons. Home masonry + explore
  // cards only — first viewport is priority/eager; later cards stay lazy.
  const imgs = page.locator(
    ".home-masonry .style-card-rail-media img, [data-testid='style-results'] .style-card-explore img, .style-card-rail-media img",
  );
  await expect(imgs.first()).toBeVisible({ timeout: 30_000 });
  const count = await imgs.count();
  expect(count).toBeGreaterThan(0);

  // Wait until the first two cards (priority + eager) have decoded bitmaps.
  // Do not assert on lazy cards further down — they may still have src set
  // while naturalWidth is 0 until they enter the viewport.
  await expect
    .poll(
      async () =>
        imgs.evaluateAll((nodes) => {
          const sample = nodes.slice(0, 2);
          if (sample.length === 0) return 0;
          return sample.every((node) => {
            const img = node as HTMLImageElement;
            const src = img.currentSrc || img.src;
            return Boolean(src && !src.startsWith("data:") && img.complete && img.naturalWidth > 0);
          })
            ? 1
            : 0;
        }),
      { timeout: 30_000 },
    )
    .toBe(1);

  const loaded = await imgs.evaluateAll((nodes) =>
    nodes.slice(0, 8).map((node) => {
      const img = node as HTMLImageElement;
      return {
        src: img.currentSrc || img.src,
        naturalWidth: img.naturalWidth,
        complete: img.complete,
      };
    }),
  );

  const withSrc = loaded.filter((img) => img.src && !img.src.startsWith("data:"));
  expect(withSrc.length).toBeGreaterThan(0);
  for (const img of withSrc) {
    expect(
      /\.w(360|540|720|1080)\.webp/i.test(img.src),
      `stale variant URL still referenced: ${img.src}`,
    ).toBe(false);
  }
  const decoded = withSrc.filter((img) => img.complete && img.naturalWidth > 0);
  expect(decoded.length, "expected at least one decoded gallery image").toBeGreaterThan(0);
  return decoded;
}

test.describe("Vercel image optimization (default on)", () => {
  test.use({ viewport: MOBILE });

  test("home gallery uses /_next/image and loads without variant URLs", async ({
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
        tracker.hits.length,
        "expected /_next/image requests on the homepage gallery",
      ).toBeGreaterThan(0);
    } finally {
      tracker.dispose();
    }
  });

  test("explore gallery uses /_next/image and loads without variant URLs", async ({
    page,
  }) => {
    const tracker = trackNextImageRequests(page);
    try {
      await page.goto("/explore", { waitUntil: "networkidle" });
      await expect(page.getByTestId("style-results")).toBeVisible();
      await expectGalleryImagesLoaded(page);
      expect(
        tracker.hits.length,
        "expected /_next/image requests on /explore",
      ).toBeGreaterThan(0);
    } finally {
      tracker.dispose();
    }
  });
});
