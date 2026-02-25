import {test, expect} from '@playwright/test'

test('multiple locators', async({page})=>{
  await page.goto('https://hiqa1.pooraa.net/');

 //await page.locator().click();--- target single element
 //target multiiple element
 // step1: fill email

     await page.locator('id=usr').fill('ankit.kashyap@mail.busy.in');
    // // step2 : fill pwd
    await page.locator('id=pwd').fill('123456');

    //click on login btn --index x path
    await page.click("(//button[normalize-space()='Login'])[1]");

    //verify the logout btn is present or not --relative x path
    //now make a variale that take targeted element and the apply assestion/validation/verification on it 

    // const loginLink = await page.locator("//h2[normalize-space()='Welcome to Busy']");
    //   await expect(loginLink).toBeVisible();
     
     //click on menu
      await page.locator("//span[@class='material-icons MuiIcon-root jss12']").click();
      
      //click on partner btn
      await page.locator("//a[@href='/partner/teams/id']//span[@class='head-nav']").click();
      
      //click on lock icon to go inside the cp
    //   await page.click("(//span[@class='material-icons MuiIcon-root'][normalize-space()='lock_open'])[3]");
   await page.locator("//body/div[@id='mainContainer']/div[@id='root']/div[@class='MuiBox-root jss113 gradientBody']/div[@class='MuiContainer-root desktopDevice']/div[@class='MuiGrid-root MuiGrid-container']/div[@class='MuiGrid-root MuiGrid-item MuiGrid-grid-xs-12 MuiGrid-grid-sm-12 MuiGrid-grid-md-12']/div[@class='MuiGrid-root MuiGrid-container']/div[@class='MuiGrid-root MuiGrid-item MuiGrid-grid-xs-12']/div[@class='jss241']/div/div[2]/div[3]/div[1]/div[1]/div[1]/div[1]/button[1]/span[1]/span[1]").click();
   
  console.log("entery has been done");

      const links =await page.$$('a');

      for( const link of links){
         const linktext = await link.textContent();
         console.log(linktext);
      }

      

})