import Express, { type Request, type Response } from "express";
import {
  success,
  notFound,
  internalServerError,
  validationError,
} from "@/utils/responses";
import ViteExpress from "vite-express";
import ENV from "@/utils/env";
import { getDataByToken } from "./services/sheets-api";
import { tokenSchema } from "@/models/tokenModel";

const app = Express();

app.get("/api", (_req: Request, res: Response) => {
  return success(res, "Welcome to Maxima 2024 OPREC API!");
});

app.get(
  "/api/data/:token",
  async (req: Request<{ token: string }>, res: Response) => {
    try {
      const validateToken = await tokenSchema.safeParseAsync(req.params.token);
      if (!validateToken.success) {
        return validationError(res, validateToken.error.message);
      }

      const data = await getDataByToken(validateToken.data);

      if (!data) {
        return notFound(
          res,
          `Tidak dapat menemukan kandidat dengan token ${req.params.token}`
        );
      }

      return success(res, "Berhasil mendapatkan data kandidat", data);
    } catch (err) {
      return internalServerError(res);
    }
  }
);

ViteExpress.config({
  mode: "production",
  inlineViteConfig: {
    build: {
      outDir: "static/",
    },
  },
});

ViteExpress.listen(app, ENV.APP_PORT, () => {
  console.log(`⚡ Server running on port ${ENV.APP_PORT}`);
});
