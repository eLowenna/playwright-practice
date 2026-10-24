import { expect, test } from '@playwright/test';

const ACCENT = 'rgb(47, 95, 208)';

test.describe('Buttons', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('https://playwright-playground.com/basic/buttons');
  });

  test('three kinds of click', async ({ page }) => {
    const result = page.getByTestId('button-result');
    const doubleClick = page.getByRole('button', { name: 'Double click me' });

    await page.getByRole('button', { name: 'Click me', exact: true }).click();
    await expect(result).toHaveText('Button clicked');

    // A single click is ignored by the double-click button.
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

test('buttons expose their variant as a class and a style', async ({
  page,
}) => {
  await page.goto('https://playwright-playground.com/basic/buttons');

  const clickMe = page.getByRole('button', {
    name: 'Click me',
    exact: true, // otherwise it also matches "Double click me"
  });
  const primary = page.getByRole('button', { name: 'Primary action' });

  await expect(clickMe).toHaveClass(/secondary/);
  await expect(primary).not.toHaveClass(/secondary/);
  await expect(primary).toHaveCSS('background-color', ACCENT);
});