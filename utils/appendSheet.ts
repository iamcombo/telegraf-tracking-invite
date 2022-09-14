import { google } from 'googleapis';
require("dotenv").config({ path: ".env" });

interface Props {
  user: string
}

export const appendSheet = async({user}: Props) => {
  const SPREADSHEET_ID = process.env.REACT_APP_SPREADSHEET_ID;
  const SHEET_ID = process.env.REACT_APP_SHEET_ID;
  const CLIENT_EMAIL = process.env.REACT_APP_CLIENT_EMAIL;
  const PRIVATE_KEY = process.env.REACT_APP_PRIVATE_KEY && process.env.REACT_APP_PRIVATE_KEY.replace(/\\n/g, '\n');
  
  const client = new google.auth.JWT(
    CLIENT_EMAIL,
    '',
    PRIVATE_KEY,
    ['https://www.googleapis.com/auth/spreadsheets']
  )
  
  const googleSheet = google.sheets({version: 'v4', auth: client});

  const writeRow = await googleSheet.spreadsheets.values.append({
    auth: client,
    spreadsheetId: SPREADSHEET_ID,
    range: "Sheet1",
    valueInputOption: "USER_ENTERED",
    insertDataOption: "INSERT_ROWS",
    requestBody: {
      values: [
        [user]
      ]
    }
  })
}
