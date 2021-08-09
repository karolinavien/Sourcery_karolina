const { test, expect } = require('@playwright/test');
const { DuckStartPage } = require('../pages/duckStartPage')

test.describe('', () => {
  let page;
  test.beforeAll(async ({ browser }) => {
    page = await browser.newPage();
    startPage = new DuckStartPage(page);
  });
  test.beforeEach(async () => {
    await startPage.goto();
  });

  
  test('duckduckgo is loading', async () => {
  //await page.goto('https://duckduckgo.com/');
  const duckLogo = await page.isVisible('#logo_homepage_link');
  expect(duckLogo).toBe(true);
});
test('Test that search is working', async () => {
  //await page.goto('https://start.duckduckgo.com/');
  await page.waitForSelector('#logo_homepage_link');
  await page.fill('#search_form_input_homepage', 'Test');
  await page.click('#search_button_homepage');
  const result1TextContent = await page.textContent('#r1-0');
  expect(result1TextContent).toContain('Test')
});
test('Test that search is working recorded by inspector', async () => {
  //await page.goto('https://start.duckduckgo.com/');
  await page.fill('input[name="q"]', 'Test');
  // Click input[name="q"]
  await page.click('input[name="q"]');
  // Click input:has-text("S")
  await Promise.all([
    page.waitForNavigation(/*{ url: 'https://duckduckgo.com/?q=Test&ia=web' }*/),
    page.click('input:has-text("S")')
  ]);
  // Click #links div div:has-text("Test | Definition of Test by Merriam-WebsterYour browser indicates if you've vis")
  await page.click('#links div div:has-text("Test | Definition of Test by Merriam-WebsterYour browser indicates if you\'ve vis")');
  expect(page.url()).toBe('https://www.merriam-webster.com/dictionary/test');
});
test('Check that cheat sheets are working', async () => {
  //await page.goto('https://start.duckduckgo.com/');
  await page.waitForSelector('#logo_homepage_link');
  await page.fill('#search_form_input_homepage', 'microsoft word cheat sheet');
  await page.click('#search_button_homepage');
  const isCheatSheetVisible = await page.isVisible('a[data-zci-link="cheat_sheets"]');
  const cheatSheetsTitle = await page.textContent('h3.c-base__title');
  expect(isCheatSheetVisible).toBe(true);
  expect(cheatSheetsTitle).toContain('Microsoft Word 2010');
});
test('Check that url shortener works', async () => {
  //await page.goto('https://start.duckduckgo.com/');
  await page.waitForSelector('#logo_homepage_link');
  await page.fill('#search_form_input_homepage', 'shorten www.wikipedia.com');
  await page.click('#search_button_homepage');
  const shortenedUrl = await page.getAttribute('#shorten-url', 'value');
  await page.goto(shortenedUrl);
  const url = page.url();
  expect(url).toBe('https://www.wikipedia.org/');
});
test('panda', async () => {
    //await page.goto('https://start.duckduckgo.com/');
    await page.waitForSelector("#search_form_input_homepage");
    await page.fill('#search_form_input_homepage', "intitle:panda");
    await page.click("#search_button_homepage");
    await page.waitForNavigation();
  const results = await page.evaluate(() => Array.from(document.querySelectorAll('.result__title'), element => element.textContent));
    results.forEach(result => {
      expect(result).toContain("Panda");
    });
});
  const passwordsLengths = ['8', '16', '64'];
  passwordsLengths.forEach(passwordLength => {
    test(`Generate ${passwordLength} chracters long password`, async () => {
      //await page.goto('https://start.duckduckgo.com/');
      await page.waitForSelector("#search_form_input_homepage");
      await page.fill('#search_form_input_homepage', ("password " + passwordLength));
      await page.click("#search_button_homepage");
      const generatedPassword = await page.textContent(".c-base__title");
      expect(generatedPassword.length).toEqual(+passwordLength)
    });
  });
  
  const invalidPasswordLengths = ['7', '65'];
  invalidPasswordLengths.forEach(passwordLength => {
    test(`Fails to Generate ${passwordLength} chracters long password`, async () => {
      //await page.goto('https://start.duckduckgo.com/');
      await page.waitForSelector("#search_form_input_homepage");
      await page.fill('#search_form_input_homepage', ("password " + passwordLength));
      await page.click("#search_button_homepage");
      const isPasswordElementVisible = await page.isVisible(".c-base__sub");
      expect(isPasswordElementVisible).toEqual(false)
    });
  });
  });

 




