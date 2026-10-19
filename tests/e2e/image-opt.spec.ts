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
          complete: img.complete,
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
}

test.describe("direct Supabase images (Vercel opt off)", () => {
  test.use({ viewport: MOBILE });

  test("home serves gallery images without /_next/image", async ({ page }) => {
    const tracker = trackNextImageRequests(page);
    try {
      await page.goto("/", { waitUntil: "networkidle" });
      await expect(page.getByRole("heading", { level: 2, name: /Explore everything/i })).toBeVisible();
      await expectGalleryImagesLoaded(page);
      expect(
        tracker.hits,
        `unexpected /_next/image requests:\n${tracker.hits.join("\n")}`,
      ).toEqual([]);
    } finally {
      tracker.dispose();
    }
  });

  test("explore serves gallery images without /_next/image", async ({ page }) => {
    const tracker = trackNextImageRequests(page);
    try {
      await page.goto("/explore", { waitUntil: "networkidle" });
      await expect(page.getByTestId("style-results")).toBeVisible();
      await expectGalleryImagesLoaded(page);
      expect(
        tracker.hits,
        `unexpected /_next/image requests:\n${tracker.hits.join("\n")}`,
      ).toEqual([]);
    } finally {
      tracker.dispose();
    }
  });
});
