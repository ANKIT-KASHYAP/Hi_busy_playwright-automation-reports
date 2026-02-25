import { test, expect } from '@playwright/test';
import { getTestData } from './excelReader.js';
import path from 'path';

// Check current directory
console.log('Current directory:', process.cwd());
// Read test data from Excel
const excelFilePath = path.join(process.cwd(), 'testdata', 'testdata.xlsx');
console.log("this is excel");
console.log("my path"+excelFilePath);
const testData = getTestData(excelFilePath, 'Sheet1');

// // Validate that data was loaded
// if (!testData || testData.length === 0) {
//   throw new Error('No test data found in Excel file');
// }

test.describe('Login Tests - Data Driven', () => {
  testData.forEach((data, index) => {
    test(`Login Test ${index + 1} - ${data.email}`, async ({ page }) => {
      
      await page.goto('https://hiqa2.pooraa.net/');

      // Fill email
      await page.getByRole('textbox', { name: 'Email ID' }).click();
      await page.getByRole('textbox', { name: 'Email ID' }).fill(data.email || '', { delay: 200 });
      
      // Fill password
      await page.getByRole('textbox', { name: 'Password' }).click();
      await page.getByRole('textbox', { name: 'Password' }).fill(data.password || '', { delay: 200 });
      
      // Click login
      await page.getByRole('button', { name: 'Login' }).click();

      // Assertions based on expected result
      if (data.expected === 'pass') {
        await expect(page).toHaveURL(/dashboard/, { timeout: 20000 });
        console.log(`✓ Test ${index + 1} passed: ${data.email}`);
      } else if (data.expected === 'fail') {
        await expect(page.locator('.error-msg')).toBeVisible({ timeout: 20000 });
        console.log(`✓ Test ${index + 1} passed: ${data.email} failed as expected`);
      }
    });
  });
});
