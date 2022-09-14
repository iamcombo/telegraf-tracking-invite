import { google } from 'googleapis';
require("dotenv").config({ path: ".env" });

interface Props {
  id: number
}

const SPREADSHEET_ID = process.env.REACT_APP_SPREADSHEET_ID;
const SHEET_ID = process.env.REACT_APP_SHEET_ID;
const CLIENT_EMAIL = process.env.REACT_APP_CLIENT_EMAIL;
const PRIVATE_KEY = process.env.REACT_APP_PRIVATE_KEY && process.env.REACT_APP_PRIVATE_KEY.replace(/\\n/g, '\n');

export const checkSpreadsheet = async ({ id }: Props) => {
  const client = new google.auth.JWT(
    CLIENT_EMAIL,
    '',
    PRIVATE_KEY,
    ['https://www.googleapis.com/auth/spreadsheets']
  )
  const sheet = google.sheets({ version: 'v4', auth: client })
  const { data: { values } } = await sheet.spreadsheets.values.get({ 
    auth: client, 
    spreadsheetId: SPREADSHEET_ID,  
    range: `Sheet1!A1:B` 
  })
  if(!values) return true;

  for(let i=values.length-1; i>0; i--) {
    if(values[i][0] == id) {
      return false;
    }
  }
  return true;
}