// @ts-check
import { defineConfig, devices } from '@playwright/test';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';



// export default defineConfig({
//   use: {
//     storageState: 'auth.json',
//     headless: false,
//   },
// });

// 👇 Fix for ESM to define __dirname manually
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// ✅ Load environment variables
dotenv.config({ path: path.resolve(__dirname, '.env') });

/**
 * @see https://playwright.dev/docs/test-configuration
 */
export default defineConfig({
  testDir: './tests',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  //retry on the CLI only
  // retries: process.env.CI ? 2 : 0,
  //2 means ye ek bar fail hone ke bad 2 bar try krega if tab bhi fail to mark as fail
  //but if ye 2 m se kisi bhi attempt m pass ho gya then it will mark as falky test case

  //retries:2,
  workers: process.env.CI ? 1 : undefined,
  reporter: [["line"], ["allure-playwright"],["html",{open:'never'}],["list"]],
  use: {
    trace: 'on-first-retry',
    headless: false, // 👈 optional, for visible browser during debugging
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
    // storageState: './auth.json',
   
  },

  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'],
         viewport:{width:1280,height:631},
        //  screenshot:"on",
        //  video:"on",
        //  trace:"on"


       },
     
    },  
    {
      name: 'firefox',
      use: { ...devices['Desktop Firefox'] },
    },
    {
      name: 'webkit',
      use: { ...devices['Desktop Safari'] },
    },
    // 👇👇 SUITE-WISE PROJECTS (IMPORTANT)
  
    // -------------------------
    // SUITE 1: Sanity Testing
    // -------------------------
    {
      name: 'sanity',
      testDir: './tests/sanity',
      use: { ...devices['Desktop Chrome'] },
    },

    // -------------------------
    // SUITE 2: Regression Testing
    // -------------------------
    {
      name: 'Login_as_BTPU',
      testDir: './tests/Login_as_BTPU',
      use: { ...devices['Desktop Chrome'] },
    },

    // -------------------------
    // SUITE 3: Full Project (all tests)
    // -------------------------
    {
      name: 'All_Purchase_module',
      testDir: './tests',
      use: { ...devices['Desktop Chrome'] },
    },
    {
      name: 'Admin_as_admin',
      testDir: './tests',
      use: { ...devices['Desktop Chrome'] },
    },
    {
      name: 'Login_as_CP_prim_user',
      testDir: './tests/Login_as_CP_prim_user',
      use: { ...devices['Desktop Chrome'] },
    },

    // OPTIONAL BROWSERS (if you still want)
    {
      name: 'firefox-full',
      testDir: './tests',
      use: { ...devices['Desktop Firefox'] },
    },
  ],
});
