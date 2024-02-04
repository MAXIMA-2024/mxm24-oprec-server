import dotenv from "dotenv";
dotenv.config();

const ENV = {
  APP_VERSION: process.env.APP_VERSION ?? "1.0.0",
  APP_PORT: Number(process.env.APP_PORT) ?? 3000,
  APP_G_PRIVATE_KEY: process.env.APP_G_PRIVATE_KEY ?? "",
  APP_G_CLIENT_EMAIL: process.env.APP_G_CLIENT_EMAIL ?? "",
  APP_G_SHEET_ID: process.env.APP_G_SHEET_ID ?? "",
};

export default ENV;
