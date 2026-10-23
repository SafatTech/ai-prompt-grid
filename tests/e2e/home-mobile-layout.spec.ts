import { test, expect } from "@playwright/test";

/**
 * Guards the #47 home.css cascade bug: unscoped desktop rules must not win over
 * mobile @media overrides (season 12-col grid, visible rail arrows).
 */
const MOBILE = [
  { width: 390, height: 844 },
  { width: 360, height: 800 },
] as const;

async function assertNoChipOverlap(
  chips: ReturnType<import("@playwright/test").Page["locator"]>,
) {
  const count = await chips.count();
  if (count < 2) return;
  const boxes = [];
  for (let i = 0; i < count; i++) {
    const box = await chips.nth(i).boundingBox();
    expect(box, `chip ${i} box`).toBeTruthy();
    boxes.push(box!);
  }
  for (let i = 0; i < boxes.length; i++) {
    for (let j = i + 1; j < boxes.length; j++) {
      const a = boxes[i]!;
      const b = boxes[j]!;
      const overlapX = Math.min(a.x + a.width, b.x + b.width) - Math.max(a.x, b.x);
      const overlapY = Math.min(a.y + a.height, b.y + b.height) - Math.max(a.y, b.y);
      const overlapping = overlapX > 2 && overlapY > 2;
      expect(overlapping, `chips ${i} and ${j} overlap`).toBe(false);
    }
  }
}

for (const viewport of MOBILE) {
  test.describe(`homepage mobile layout @ ${viewport.width}`, () => {
    test.use({ viewport });

    test("season banner stacks; rail headers stay one line; arrows hidden", async ({
      page,
    }) => {
      await page.goto("/");
      const season = page.locator("section.home-season").first();
      await expect(season).toBeVisible({ timeout: 15_000 });

      const seasonStyles = await season.evaluate((el) => {
        const cs = getComputedStyle(el);
        const text = el.querySelector<HTMLElement>(".home-season-text");
        const textCs = text ? getComputedStyle(text) : null;
        return {
          display: cs.display,
          flexDirection: cs.flexDirection,
          gridTemplateColumns: cs.gridTemplateColumns,
          textWidth: text?.getBoundingClientRect().width ?? 0,
          textGridColumn: textCs?.gridColumn ?? "",
        };
      });
      expect(seasonStyles.display).toBe("flex");
      expect(seasonStyles.flexDirection).toBe("column");
      // Desktop 12-col track list must not apply on mobile.
      expect(seasonStyles.gridTemplateColumns.split(" ").length).toBeLessThan(4);
      expect(seasonStyles.textWidth).toBeGreaterThan(viewport.width * 0.7);

      const chips = season.locator(".home-season-chip");
      if ((await chips.count()) > 0) {
        await assertNoChipOverlap(chips);
      }

      for (const title of ["Trending this week", "New styles"]) {
        const heading = page.getByRole("heading", { name: title, exact: true });
        await expect(heading).toBeVisible();
        const section = page.locator("section.home-section").filter({ has: heading });
        const header = section.locator(".home-section-header");
        const metrics = await heading.evaluate((el) => {
          const cs = getComputedStyle(el);
          const lineHeight = Number.parseFloat(cs.lineHeight);
          return {
            scrollHeight: el.scrollHeight,
            clientWidth: el.clientWidth,
            lineHeight: Number.isFinite(lineHeight) ? lineHeight : el.clientHeight,
          };
        });
        // One wrapped line of "Trending" alone is ~28–36px; full title on one
        // line stays near 1× line-height. Allow a little subpixel slack.
        expect(
          metrics.scrollHeight,
          `${title} wrapped (scrollHeight=${metrics.scrollHeight})`,
        ).toBeLessThanOrEqual(metrics.lineHeight * 1.55 + 4);
        expect(metrics.clientWidth).toBeGreaterThan(160);

        const arrows = header.locator(".home-rail-arrows");
        await expect(arrows).toBeHidden();
        await expect(arrows).toHaveCSS("display", "none");
      }
    });
  });
}
