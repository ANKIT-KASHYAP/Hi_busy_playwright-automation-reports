const XLSX = require('xlsx');
const path = require('path');

function getTestData() {
  const filePath = path.join(
    __dirname,
    'testdata',
    'testdata.xlsx'
  );

  const workbook = XLSX.readFile(filePath);
  const sheet = workbook.Sheets['LoginData'];
  return XLSX.utils.sheet_to_json(sheet);
}

module.exports = { getTestData };
