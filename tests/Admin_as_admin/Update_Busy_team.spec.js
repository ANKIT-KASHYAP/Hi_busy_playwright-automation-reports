import { test, expect } from '@playwright/test';
import { generateUserData } from '../utils/prepare_user_info_random_data';
import  {login_process} from '../utils/Common_login_process.js'


test.use({
  launchOptions: {
    slowMo: 200,
  },
});

const { userName, userEmail, userMobile } = generateUserData();
const role= 'admin';
test('create_new_busy_team: By admin login', async ({ page }) => {
  //==========login process===============
 await login_process(page,role);
 //=========login process end============
  
  await page.getByRole('button', { name: 'menu' }).click();
  await page.getByRole('link', { name: 'person Busy Teams' }).click();
//   await page.getByRole('button', { name: 'more info' }).first().click();
  //always click on first busy team to edit
  await page.locator("//body/div[@id='mainContainer']/div[@id='root']/div[@class='MuiBox-root jss113 gradientBody']/div[@class='MuiContainer-root desktopDevice']/div[@class='MuiGrid-root MuiGrid-container']/div[@class='MuiGrid-root MuiGrid-item MuiGrid-grid-xs-12 MuiGrid-grid-sm-12 MuiGrid-grid-md-12']/div[@class='MuiGrid-root MuiGrid-container']/div[@class='MuiGrid-root MuiGrid-item MuiGrid-grid-xs-12']/div[@class='jss146']/div/div[2]/div[1]/div[1]").click();
  //await page.getByText('10c81r0n').click();
  //await page.locator('.MuiPaper-root.jss162').first().click();
  await page.getByRole('button', { name: 'Edit' }).click();
  await page.getByRole('textbox', { name: 'Name' }).fill(userName);
  await page.getByRole('button', { name: 'Apply' }).click();
  await page.getByRole('button', { name: 'Close' }).click();
  await page.getByRole('button', { name: 'more info' }).first().click();

});