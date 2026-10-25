import { expect, test } from '@playwright/test';

const URL = "https://playwright-playground.com/dynamic/appear-disappear"

test.describe('Appear & Disappear', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(URL);
  });
  
  test('Delayed Elements', async ({ page }) => {
    const showElementButton = page.getByRole("button", {name: "Show element"});
    const loadSlowly = page.getByRole("button", {name: "Load slowly"});
    const delayedElement = page.getByTestId("delayed-element");
    const slowElement = page.getByTestId("slow-element")

    await showElementButton.click();
    await loadSlowly.click();

    await expect(delayedElement).toBeVisible();
    await expect(slowElement).toBeVisible({timeout: 10000});
  })

  test('Loading spinner', async ({ page }) => {
    const loadingButton = page.getByRole("button", {name: "Start loading"});
    const loadingSpinner  = page.getByTestId("loading-spinner");
    const loadedResult = page.getByTestId("loading-result");

    await loadingButton.click();

    await expect(loadingSpinner).toBeVisible();
    await expect(loadingSpinner).toBeHidden();
    await expect(loadedResult).toBeVisible();
  })

  test('Draft toast', async ({ page }) => {
    const showElementButton = page.getByRole("button", {name: "Save draft"});
    const toast = page.getByTestId("toast");

    await showElementButton.click();

    await expect(toast).toBeVisible();
    await expect(toast).toBeHidden();
  })

  test('Remove elements', async ({ page }) => {
    const removeButton = page.getByRole("button", {name: "Remove element"});
    const hideButton = page.getByRole("button", {name: "Hide element"});
    const disappearingElement = page.getByTestId("disappearing-element");
    const hidingElement = page.getByTestId("hidden-element");

    await expect(disappearingElement).toBeVisible();
    await expect(hidingElement).toBeVisible();

    await removeButton.click();
    await hideButton.click();

    await expect(disappearingElement).toBeHidden();
    await expect(disappearingElement).toHaveCount(0);
    await expect(hidingElement).toBeHidden();
    await expect(hidingElement).toBeAttached();
  })
});