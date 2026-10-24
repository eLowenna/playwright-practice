import { expect, test } from '@playwright/test';

const URL = "https://playwright-playground.com/basic/inputs"

test.describe('Inputs', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(URL);
  });

  test('Username', async ({ page }) => {
    
    const username = page.getByLabel('Username');
    const result = page.getByTestId('username-result'); 

    await username.fill("Testicules")

    await expect(result).toHaveText("You entered: Testicules")
  
  });

  test('Input form captures data', async ({ page }) => {
    
    const email = page.getByLabel('Email');
    const password = page.getByLabel('Password');
    const number = page.getByLabel('Number');
    const date = page.getByLabel('Date');
    const range = page.getByLabel(/Range/);
    const resultemail = page.getByTestId('result-email');
    const resultpass = page.getByTestId('result-password');
    const resultnum = page.getByTestId('result-number');
    const resultdate = page.getByTestId('result-date');
    const resultrange = page.getByLabel(/Range/);

    await email.pressSequentially("a@b.com")
    await password.fill("a")
    await number.fill("500")
    await date.fill("1999-02-13")
    await range.fill("62")

    await expect(resultemail).toHaveText('a@b.com')
    await expect(resultpass).toHaveText('••••••••')
    await expect(resultpass).not.toContainText('a');
    await expect(resultnum).toHaveText('500')
    await expect(resultdate).toHaveText("1999-02-13")
    await expect(resultrange).toHaveValue("62");
  })

  test('Shows N/A when inputs are cleared', async ({ page }) => {
    const email = page.getByLabel('Email');
    const password = page.getByLabel('Password');
    const number = page.getByLabel('Number');
    const date = page.getByLabel('Date');
    const resultemail = page.getByTestId('result-email');
    const resultpass = page.getByTestId('result-password');
    const resultnum = page.getByTestId('result-number');
    const resultdate = page.getByTestId('result-date');

    await email.pressSequentially("a@b.com")
    await password.fill("a")
    await number.fill("500")
    await date.fill("1999-02-13")
    await email.clear()
    await password.clear()
    await number.clear()
    await date.clear()

    await expect(resultemail).toHaveText('N/A');
    await expect(email).toHaveValue('');
    await expect(resultpass).toHaveText('N/A')
    await expect(password).toHaveValue('')
    await expect(resultnum).toHaveText('N/A')
    await expect(number).toHaveValue('')
    await expect(resultdate).toHaveText('N/A')
    await expect(date).toHaveValue('')
  })
});