import { test, expect } from "@playwright/test";

const VIEWPORTS = [
  { width: 1024, height: 900 },
  { width: 1440, height: 900 },
  { width: 1920, height: 900 },
] as const;

/** Top card in every laid-out column must sit on the first row (no empty lead column). */
async function assertFirstRowFillsEveryColumn(
  section: ReturnType<import("@playwright/test").Page["locator"]>,
) {
  const masonry = section.locator(".home-masonry:not(.home-masonry-extra)");
  await expect(masonry).toBeVisible();

  await expect
    .poll(
      async () =>
        masonry.evaluate((grid) => {
          const articles = [...grid.querySelectorAll<HTMLElement>("article")];
          if (articles.length < 2) return { ok: false, reason: "too-few-cards" };

          const rects = articles.map((el) => el.getBoundingClientRect());
          const minTop = Math.min(...rects.map((r) => r.top));
          // Group into columns by left edge (20px bucket absorbs subpixel drift).
          const cols = new Map<number, DOMRect>();
          for (const rect of rects) {
            const key = Math.round(rect.left / 20) * 20;
            const prev = cols.get(key);
            if (!prev || rect.top < prev.top) cols.set(key, rect);
          }
          if (cols.size < 2) return { ok: false, reason: "too-few-columns", cols: cols.size };

          const threshold = 48; // first-row cards share roughly the same top
          for (const [key, rect] of cols) {
            if (rect.top > minTop + threshold) {
              return {
                ok: false,
                reason: "empty-lead-column",
                col: key,
                top: rect.top,
                minTop,
                cols: cols.size,
              };
            }
          }
          return { ok: true, cols: cols.size, cards: articles.length };
        }),
      { timeout: 15_000 },
    )
    .toMatchObject({ ok: true });
}

for (const viewport of VIEWPORTS) {
  test.describe(`homepage masonry desktop @ ${viewport.width}`, () => {
    test.use({ viewport });

    test("every column has a first-row card without scrolling", async ({ page }) => {
      await page.goto("/", { waitUntil: "domcontentloaded" });

      const heading = page.getByRole("heading", { level: 2, name: /Explore everything/i });
      await expect(heading).toBeVisible({ timeout: 30_000 });
      // No scroll — assert the SSR grid alone fills every column from the top.
      const section = page.locator("section").filter({ has: heading });
      await assertFirstRowFillsEveryColumn(section);
    });

    test("visible Explore everything cards load images without scrolling to the bottom", async ({
      page,
    }) => {
      await page.goto("/", { waitUntil: "domcontentloaded" });

      const heading = page.getByRole("heading", { level: 2, name: /Explore everything/i });
      await expect(heading).toBeVisible({ timeout: 30_000 });
      await heading.scrollIntoViewIfNeeded();

      const section = page.locator("section").filter({ has: heading });

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

      // First row is eager; deeper SSR cards stay lazy — require several decoded
      // images in view, not every visible card (tall 50-card SSR grids).
      await expect
        .poll(
          async () => {
            return cards.evaluateAll((nodes) => {
              const vh = window.innerHeight || 0;
              const vw = window.innerWidth || 0;
              return nodes.filter((node) => {
                const el = node as HTMLElement;
                const rect = el.getBoundingClientRect();
                if (!(rect.bottom > 0 && rect.top < vh && rect.right > 0 && rect.left < vw)) {
                  return false;
                }
                const img = el.querySelector(
                  ".style-card-rail-media img",
                ) as HTMLImageElement | null;
                if (!img) return false;
                const src = img.currentSrc || img.src;
                return Boolean(src && !src.startsWith("data:") && img.complete && img.naturalWidth > 0);
              }).length;
            });
          },
          { timeout: 15_000 },
        )
        .toBeGreaterThanOrEqual(2);

      const scrollY = await page.evaluate(() => window.scrollY);
      const scrollMax = await page.evaluate(
        () => document.documentElement.scrollHeight - window.innerHeight,
      );
      expect(scrollY).toBeLessThan(scrollMax * 0.85);
    });

    test("N-25: mid-feed scroll does not leave grey skeletons in view", async ({ page }) => {
      await page.goto("/", { waitUntil: "domcontentloaded" });

      const heading = page.getByRole("heading", { level: 2, name: /Explore everything/i });
      await expect(heading).toBeVisible({ timeout: 30_000 });

      const section = page.locator("section").filter({ has: heading });
      const masonry = section.locator(".home-masonry").first();
      await expect(masonry).toBeVisible();

      const masonryTop = await masonry.evaluate(
        (el) => el.getBoundingClientRect().top + window.scrollY,
      );
      const targetY = masonryTop + 2100;

      let y = await page.evaluate(() => window.scrollY);
      while (y + 500 < targetY) {
        y += 500;
        await page.evaluate((next) => window.scrollTo(0, next), y);
        await page.waitForTimeout(150);
      }
      await page.evaluate((next) => window.scrollTo(0, next), targetY);
      await page.waitForTimeout(3000);

      const inView = await section
        .locator('[data-testid="style-card-skeleton"]')
        .evaluateAll((nodes) =>
          nodes.filter((node) => {
            const el = node as HTMLElement;
            const rect = el.getBoundingClientRect();
            const vh = window.innerHeight || 0;
            const vw = window.innerWidth || 0;
            return (
              rect.bottom > 0 &&
              rect.top < vh &&
              rect.right > 0 &&
              rect.left < vw &&
              rect.width > 0 &&
              rect.height > 0
            );
          }).length,
        );
      expect(inView).toBe(0);
    });
  });
}
