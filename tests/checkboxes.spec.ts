import { expect, test } from '@playwright/test';

const URL = "https://playwright-playground.com/basic/checkboxes"

test.describe('Inputs', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(URL);
  });

  test('Newsletter subscription checkbox', async ({ page }) => {
    
    const newsletter = page.getByRole('checkbox', { name: 'Subscribe to newsletter' });
    const statusUnchecked = page.getByText('Newsletter: unchecked');
    const statusChecked = page.getByText('Newsletter: checked');

    await newsletter.check();
    await expect(newsletter).toBeChecked();
    await expect(statusChecked).toBeVisible();

    await newsletter.uncheck();
    await expect(newsletter).not.toBeChecked();
    await expect(statusUnchecked).toBeVisible();
  });

  test('Terms and conditions checkbox', async ({ page }) => {
    const TandCs = page.getByRole('checkbox', { name: 'Accept terms and conditions' });
    const TandCsUnchecked = page.getByText('Terms: unchecked');
    const TandCsChecked = page.getByText('Terms: checked');

    await TandCs.setChecked(true);
    await expect(TandCs).toBeChecked();
    await expect(TandCsChecked).toBeVisible();

    await TandCs.setChecked(false);
    await expect(TandCs).not.toBeChecked();
    await expect(TandCsUnchecked).toBeVisible();
  });
});