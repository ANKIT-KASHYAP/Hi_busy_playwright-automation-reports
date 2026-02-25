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
  await page.getByRole('button', { name: 'create' }).click();
  await page.getByRole('textbox', { name: 'Time Zone' }).click();
  await page.getByRole('button', { name: 'Asia/Kolkata' }).click();
  await page.getByRole('button',{name:'Add'}).click();
  await page.getByRole('textbox', { name: 'Name' }).click();
  await page.getByRole('textbox', { name: 'Name' }).fill(userName);
 
  await page.getByRole('button', { name: 'Next' }).click();

  await page.getByRole('textbox', { name:'Mobile' }).click()
  await page.getByRole('textbox', { name:'Mobile' }).fill(userMobile);
  await page.getByRole('textbox', { name:'Email' }).click();
 await  page.getByRole('textbox', { name:'Email' }).fill(userEmail);

 await page.getByRole('button',{name:'Submit'}).click();

 await page.getByRole('textbox', { name: 'search' }).click();
 await page.getByRole('textbox', { name: 'search' }).fill(userName);
   //check user is created with this username ?
  await expect(page.locator('#root')).toContainText(userName);

});