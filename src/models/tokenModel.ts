import { z } from "zod";

export const tokenSchema = z
  .string()
  .length(6, "Token length harus 6 karakter!");
export type Token = z.infer<typeof tokenSchema>;
