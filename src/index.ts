import Express, { type Request, type Response } from "express";
import {
  success,
  notFound,
  internalServerError,
  validationError,
  parseZodError,
} from "@/utils/responses";
import ViteExpress from "vite-express";
import ENV from "@/utils/env";
import { getDataByNim } from "./services/sheets-api";
import { nimSchema } from "@/models/nimModel";

const app = Express();

app.get("/api", (_req: Request, res: Response) => {
  return success(res, "Welcome to Maxima 2024 OPREC API!");
});

app.get(
  "/api/data/:nim",
  async (req: Request<{ nim: string }>, res: Response) => {
    try {
      const validateNim = await nimSchema.safeParseAsync(req.params.nim);
      if (!validateNim.success) {
        return validationError(res, parseZodError(validateNim.error));
      }

      const data = await getDataByNim(validateNim.data);

      if (!data) {
        return notFound(
          res,
          `Tidak dapat menemukan kandidat dengan token ${validateNim.data}`
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
