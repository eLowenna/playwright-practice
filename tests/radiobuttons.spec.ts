import { expect, test } from '@playwright/test';

const URL = "https://playwright-playground.com/basic/radio-buttons"

test.describe('Radio Buttons', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(URL);
  });
  
  test('Browser selector', async ({page}) => {
    const radiogroup = page.getByRole("radiogroup")
    const firefox = page.getByRole("radio", {name: "Firefox"});
    const chrome = page.getByRole("radio", {name: "Chrome"});
    const safari = page.getByRole("radio", {name: "Safari"});
    const explorer = page.getByRole("radio", {name: "Internet Explorer"});

    await firefox.check();

    await expect(firefox).toBeChecked();
    await expect(chrome).not.toBeChecked();
    await expect(safari).not.toBeChecked();

    await chrome.check();

    await expect(firefox).not.toBeChecked();
    await expect(chrome).toBeChecked();
    await expect(safari).not.toBeChecked();

    await safari.check();
    
    await expect(firefox).not.toBeChecked();
    await expect(chrome).not.toBeChecked();
    await expect(safari).toBeChecked();

    await expect(explorer).toBeDisabled();
  })
});