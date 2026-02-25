import {test, expect } from '@playwright/test';


test("get users", async({request})=>{

 const resp = await request.get('https://reqres.in/api/users?page=2');

 console.log(resp.body);
 console.log(await resp.json());
 expect(resp.status()).toBe(200);

});

test("create_users", async({request})=>{
const resp1 =  await request.post('https://reqres.in/api/users',
    {
        data:{
        "name": "ankit kashyap",
        "job": "leader"
       },
       headers:{
         "Accept":"application/json"
       }
    });
    console.log(resp1.json());
    expect(resp1.status()).toBe(201);
})