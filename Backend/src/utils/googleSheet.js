const { GoogleSpreadsheet } = require('google-spreadsheet');

const doc = new GoogleSpreadsheet(process.env.GOOGLE_SHEET_ID);

const addRows = async (rows, headers) => {
  await doc.useServiceAccountAuth({
    private_key: process.env.PRIVATE_KEY_GOOGLE_SERVICES.split(String.raw`\n`).join('\n'),
    client_email: process.env.CLIENT_EMAIL,
  });

  await doc.loadInfo();
  let sheet = doc.sheetsByIndex[0];
  sheet.headerValues = headers;
  sheet.setHeaderRow(headers, 1);

  for (let index = 0; index < rows.length; index++) {
    const element = rows[index];
    await sheet.addRow(element);
  }
};


module.exports = { addRows };
