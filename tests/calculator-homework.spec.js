const { test, expect } = require('@playwright/test');
const {calculatorStartPage} = require('../pages/calculatorStartPage')

test.describe('', () => {
  let page;
  test.beforeAll(async ({ browser }) => {
    page = await browser.newPage();
    startPage = new calculatorStartPage(page);
  });
  test.beforeEach(async () => {
    await startPage.goto();
  });

  const builds = ['0','1','2','3','4','5','6','7','8','9'];



builds.forEach(build => {
test.only(`add function is correct for ${build}`, async () => {
  await startPage.goto();
  await page.selectOption('#selectBuild', build);
  await page.fill('#number1Field', '1');
  await page.fill('#number2Field', '1');
  await page.selectOption('#selectOperationDropdown', '0');
  await page.click('#calculateButton');
  const result1 = await page.inputValue('#numberAnswerField');
  console.log(result1);
  expect(result1).toContain('2');
});
 
});


builds.forEach(build => {
test.only(`integers only button is working as expected for ${build}`, async () => {
  await startPage.goto();
  await page.waitForSelector('.masthead');
  await page.selectOption('#selectBuild', build);
  await page.fill('#number1Field', 'a');
  await page.fill('#number2Field', '1');
  await page.selectOption('#selectOperationDropdown', '1');
  await page.click ('#integerSelect');
  await page.click('#calculateButton');
  const result2 = await page.textContent('#errorMsgField');
  console.log(result2);
  expect(result2).toContain('Number 1 is not a number');
});
 
});


builds.forEach(build => {
test.only(`divide function is working as expected for ${build}`, async () => {
  await startPage.goto();
  await page.selectOption('#selectBuild', build );
  await page.fill('#number1Field', '10');
  await page.fill('#number2Field', '2');
  await page.selectOption('#selectOperationDropdown', '3');
  await page.click('#calculateButton');
  const result3 = await page.inputValue('#numberAnswerField');
  console.log(result3);
  expect(result3).toContain('5');
});
});



  builds.forEach(build => {
  test.only(`clear button is working as expected in ${build}`, async () => {
    await startPage.goto();
    await page.waitForSelector('.masthead');
    await page.selectOption('#selectBuild', build);
    await page.fill('#number1Field', '3');
    await page.fill('#number2Field', '1');
    await page.selectOption('#selectOperationDropdown', '1');
    await page.click('#calculateButton');
    await page.click('#clearButton');
    const result4 = await page.textContent('#numberAnswerField');
    console.log(result4);
    expect(result4).toContain('');
  });
   
  });

  builds.forEach(build => {
test.only(`divide by 0 error in ${build}`, async () => {
  await startPage.goto();
  await page.waitForSelector('.masthead');
  await page.selectOption('#selectBuild', build);
  await page.fill('#number1Field', '3');
  await page.fill('#number2Field', '0');
  await page.selectOption('#selectOperationDropdown', '3');
  await page.click('#calculateButton');
  const result5 = await page.textContent('#errorMsgField');
  console.log(result5);
  expect(result5).toContain('Divide by zero error!');
});
 
});
});
