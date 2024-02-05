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
    nim: cell[0],
    nama: cell[1],
    divisi: cell[2],
    divisiAlt: cell[3],
    ruangan: cell[4],
    tanggal: cell[5],
    status: cell[6],
    divisiFinal: cell[7],
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
