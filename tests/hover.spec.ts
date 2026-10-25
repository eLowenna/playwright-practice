import { expect, test } from '@playwright/test';

const URL = "https://playwright-playground.com/basic/hover"

test.describe('Inputs', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(URL);
  });
  
  test('Hoverbox', async ({ page }) => {
    const hoverbox = page.getByText("Hover over me");
    const heading = page.getByRole("heading", { name: 'Hover', exact: true }); //needed to move the mouse away for the negative check
    const activeIndicator = page.getByText("Hover state: active");
    const inactiveIndicator = page.getByText("Hover state: inactive");

    await hoverbox.hover();
    await expect(activeIndicator).toBeVisible();

    await heading.hover();
    await expect(inactiveIndicator).toBeVisible();
  })

  test('Hover menu', async ({ page }) => {
    const hoverMenu = page.getByRole("button", { name: 'Move mouse here' });
    const option = page.getByRole("button", { name: "Option 2" });
    const choiceIndicator = page.getByText("Menu choice: Option 2");

    await expect(option).not.toBeVisible();
    await hoverMenu.hover();
    await expect(option).toBeVisible();

    await expect(choiceIndicator).not.toBeVisible();
    await option.click();
    await expect(choiceIndicator).toBeVisible();
  })

  test('Tooltip', async ({ page }) => {
    const shippingInfo = page.getByRole("button", { name: 'Shipping info' });
    const toolTip = page.getByRole("tooltip")
    const heading = page.getByRole("heading", { name: 'Hover', exact: true }); //needed to move the mouse away for the negative check

    await shippingInfo.hover();
    await expect(toolTip).toHaveText("Free shipping on orders over 200 PLN");
    await expect(shippingInfo).toHaveAccessibleDescription("Free shipping on orders over 200 PLN");

    await heading.hover();
    await expect(toolTip).not.toBeVisible();
  })
});