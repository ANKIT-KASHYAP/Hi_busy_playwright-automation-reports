// import { test, expect } from '@playwright/test';
// import * as XLSX from 'xlsx';
// import path from 'path';

// const userdata = path.join(__dirname,'../testdata/testdata.xlsx');

// test("login to app", async({page})=>{
//     const workbook = XLSX.readFile(userdata);
//     const worksheet = workbook.Sheets['LoginData'];
//     const xlstojason = XLSX.utils.sheet_to_json(worksheet);
//     console.log(xlstojason);
// })