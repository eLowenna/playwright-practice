import { expect, test } from '@playwright/test';

const URL = "https://playwright-playground.com/basic/dropdown"

test.describe('Inputs', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(URL);
  });
  
  test('Country selector', async ({page}) => {
    const countrySelect = page.getByLabel("Select a country");
    const germanyResult = page.getByText("Selected country: Germany")
    const usResult = page.getByText("Selected country: United States")

    await countrySelect.selectOption({ label: "Germany"});
    await expect(countrySelect).toHaveValue("Germany");
    await expect(germanyResult).toBeVisible();

    await countrySelect.selectOption("United States");
    await expect(countrySelect).toHaveValue("United States");
    await expect(usResult).toBeVisible();
  })

  test('Language selector', async ({page}) => {
    const languages = page.getByLabel("Languages you speak");

    await languages.selectOption(["English", "Spanish"]);

    await expect(languages).toHaveValues(["English","Spanish"]);
  })

  test('Shirt size', async ({page}) => {
    const shirtSize = page.getByRole("button",{name: "Shirt size"});
    const large = page.getByRole("option",{name: "Large"});

    await shirtSize.click();
    await large.click();

    await expect(shirtSize).toContainText("Large"); 
  })

});