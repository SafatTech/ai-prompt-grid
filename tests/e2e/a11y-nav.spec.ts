import { test, expect } from "@playwright/test";

test.describe("PR34 follow-up a11y", () => {
  test.use({ viewport: { width: 390, height: 844 } });

  test("explore soft nav keeps exactly one robots meta (N-16)", async ({ page }) => {
    await page.goto("/explore");
    await expect
      .poll(async () => page.locator('meta[name="robots"]').count())
      .toBe(1);

    await page.getByTestId("explore-search").fill("christmas");
    await expect(page.getByTestId("results-count")).toContainText(/\d+ styles?/);

    await expect
      .poll(async () => {
        const metas = page.locator('meta[name="robots"]');
        const count = await metas.count();
        if (count !== 1) return count;
        const content = await metas.first().getAttribute("content");
        return content?.includes("noindex") ? 1 : -1;
      })
      .toBe(1);

    const clear = page.getByTestId("clear-filters");
    if (await clear.isVisible().catch(() => false)) {
      await clear.click();
    } else {
      await page.getByRole("button", { name: "Open menu" }).click();
      await page
        .getByRole("dialog", { name: "Site menu" })
        .getByRole("link", { name: "Explore styles" })
        .first()
        .click();
    }
    await expect(page).toHaveURL(/\/explore\/?(\?.*)?$/);

    await expect
      .poll(async () => page.locator('meta[name="robots"]').count())
      .toBe(1);
  });

  test("mobile menu moves focus in, traps Tab, restores on Esc (N-18)", async ({
    page,
  }) => {
    await page.goto("/");
    const menuButton = page.getByRole("button", { name: "Open menu" });
    await menuButton.focus();
    await menuButton.press("Enter");

    const dialog = page.getByRole("dialog", { name: "Site menu" });
    await expect(dialog).toBeVisible();

    // Focus should move into the dialog (close button or first control).
    await expect
      .poll(async () =>
        dialog.locator(":focus").count().then((n) => n > 0),
      )
      .toBe(true);

    // Tab through controls; focus must remain inside the dialog.
    for (let i = 0; i < 16; i++) {
      await page.keyboard.press("Tab");
      const inside = await dialog.evaluate((node) => node.contains(document.activeElement));
      expect(inside).toBe(true);
    }

    await page.keyboard.press("Escape");
    await expect(dialog).toHaveCount(0);
    await expect(menuButton).toBeFocused();
  });
});
