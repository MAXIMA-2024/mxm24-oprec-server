import { GoogleSpreadsheet } from "google-spreadsheet";
import { JWT } from "google-auth-library";
import ENV from "@/utils/env";

const SCOPES = [
  "https://www.googleapis.com/auth/spreadsheets",
  "https://www.googleapis.com/auth/drive.readonly",
];

const auth = new JWT({
  email: ENV.APP_G_CLIENT_EMAIL,
  key: ENV.APP_G_PRIVATE_KEY,
  scopes: SCOPES,
});

const doc = new GoogleSpreadsheet(ENV.APP_G_SHEET_ID, auth);

const convertData = (cells: string[][]) =>
  cells.map((cell) => ({
    token: cell[0],
    nim: cell[1],
    nama: cell[2],
    divisi: cell[3],
    divisiAlt: cell[4],
    ruangan: cell[5],
    tanggal: cell[6],
    status: cell[7],
    divisiFinal: cell[8],
  }));

export const getAllData = async () => {
  await doc.loadInfo();

  const sheet = doc.sheetsByTitle["Control"];

  // !TODO: Ganti range sesuai sheet final
  const range = "A5:I";
  const cells: string[][] = await sheet.getCellsInRange(range, {
    majorDimension: "ROWS",
    valueRenderOption: "FORMATTED_VALUE",
  });

  return convertData(cells);
};

export const getDataByNim = async (nim: string) => {
  const data = await getAllData();

  return data.find((item) => item.nim === nim);
};
