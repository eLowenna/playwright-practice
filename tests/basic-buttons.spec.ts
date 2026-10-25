import { expect, test } from '@playwright/test';

test.describe('Buttons', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('https://playwright-playground.com/basic/buttons');
  });

  test('button behaviours', async ({ page }) => {
    const result = page.getByTestId('button-result');
    const doubleClick = page.getByRole('button', { name: 'Double click me' });

    await page.getByRole('button', { name: 'Click me', exact: true }).click();
    await expect(result).toHaveText('Button clicked');

    await doubleClick.click();
    await expect(result).toHaveText('Button clicked');

    await doubleClick.dblclick();
    await expect(result).toHaveText('Double click detected');

    await page
      .getByRole('button', { name: 'Right click me' })
      .click({ button: 'right' });
    await expect(result).toHaveText('Right click detected');

    await expect(
      page.getByRole('button', { name: 'Disabled button' })
    ).toBeDisabled();
  });
});