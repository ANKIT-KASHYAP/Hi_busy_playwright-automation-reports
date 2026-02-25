import {test, expect} from "@playwright/test"

test('locators',async({page})=>{

    await page.goto('https://hiqa1.pooraa.net/');

    

    //await page.locator('id=usr').click();
    //2 ways
    //await page.click('id=usr');--yha p locator function likhna ni pdta h

    //fill email
     //provide email using --css
 //  1 way:  await page.locator("//input[@id='usr']").fill('ankit.kashyap@mail.busy.in');
 //2 way : await page.fill("//input[@id='usr']", 'ankit.kashyap@mail.busy.in');
 //3 way : await page.type("//input[@id='usr']", 'ankit.kashyap@mail.busy.in');
                   //or type/fill/locator('id=usr');
                   //or type/fill/locator('#usr);


    // step1: fill email

     await page.locator('id=usr').fill('ankit.kashyap@mail.busy.in');
    // // step2 : fill pwd
    await page.locator('id=pwd').fill('123456');

    //click on login btn --index x path
    await page.click("(//button[normalize-space()='Login'])[1]");

    //verify the logout btn is present or not --relative x path
    //now make a variale that take targeted element and the apply assestion/validation/verification on it 

    const loginLink = await page.locator("//h2[normalize-space()='Welcome to Busy']");
      await expect(loginLink).toBeVisible();

      await page.close();

})