import { test, expect } from "@playwright/test";

const DESKTOP = { width: 1440, height: 900 };

test.describe("homepage masonry desktop (5-col)", () => {
  test.use({ viewport: DESKTOP });

  test("visible Explore everything cards load images without scrolling to the bottom", async ({
    page,
  }) => {
    await page.goto("/", { waitUntil: "domcontentloaded" });

    const heading = page.getByRole("heading", { level: 2, name: /Explore everything/i });
    await expect(heading).toBeVisible({ timeout: 30_000 });
    // Bring the section into view once — the bug required scrolling to the
    // document bottom and back up before columns 4–5 decoded.
    await heading.scrollIntoViewIfNeeded();

    const section = page.locator("section").filter({ has: heading });

    // Skeletons in the viewport must clear without a bottom round-trip.
    await expect
      .poll(
        async () =>
          section.locator('[data-testid="style-card-skeleton"]').evaluateAll((nodes) =>
            nodes.filter((node) => {
              const el = node as HTMLElement;
              const rect = el.getBoundingClientRect();
              const vh = window.innerHeight || 0;
              return rect.bottom > 0 && rect.top < vh && rect.right > 0;
            }).length,
          ),
        { timeout: 15_000 },
      )
      .toBe(0);

    const cards = section.locator(
      ".home-masonry:not(.home-masonry-extra) article, .home-masonry-extra article",
    );
    await expect(cards.first()).toBeVisible();

    await expect
      .poll(
        async () => {
          return cards.evaluateAll((nodes) => {
            const vh = window.innerHeight || 0;
            const vw = window.innerWidth || 0;
            const visible = nodes.filter((node) => {
              const el = node as HTMLElement;
              const rect = el.getBoundingClientRect();
              return rect.bottom > 0 && rect.top < vh && rect.right > 0 && rect.left < vw;
            });
            if (visible.length < 4) return 0;
            const loaded = visible.filter((node) => {
              const img = (node as HTMLElement).querySelector(
                ".style-card-rail-media img",
              ) as HTMLImageElement | null;
              if (!img) return false;
              const src = img.currentSrc || img.src;
              return Boolean(src && !src.startsWith("data:") && img.complete && img.naturalWidth > 0);
            });
            return loaded.length === visible.length ? loaded.length : 0;
          });
        },
        { timeout: 15_000 },
      )
      .toBeGreaterThan(3);

    // Guard the original failure mode: do not scroll to the document end.
    const scrollY = await page.evaluate(() => window.scrollY);
    const scrollMax = await page.evaluate(
      () => document.documentElement.scrollHeight - window.innerHeight,
    );
    expect(scrollY).toBeLessThan(scrollMax * 0.85);
  });
});
