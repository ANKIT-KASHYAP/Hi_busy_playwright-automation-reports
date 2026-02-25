const XLSX = require('xlsx');
const path = require('path');
// import XLSX from 'xlsx';
// import path from 'node:path';

function getLoginCredentials() {
  const filePath = path.join(
    __dirname,
    'testdata',
    'login_credentials.xlsx'
  );
   // 👇 project root tak pahunch rahe hain
  // const filePath = path.resolve(
  //   process.cwd(),      // 👈 plawright_practice
  //   'testdata',
  //   'login_credentials.xlsx'
  // );

  const workbook = XLSX.readFile(filePath);
  const sheet = workbook.Sheets['login_creden'];
    console.log(XLSX.utils.sheet_to_json(sheet));
  return XLSX.utils.sheet_to_json(sheet);

}

module.exports = { getLoginCredentials };
