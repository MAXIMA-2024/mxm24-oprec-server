import { z } from "zod";

export const nimSchema = z
  .string()
  // .min(11, "NIM minimum harus memiliki panjang 11 karakter")
  // .max(12, "NIM maksimum harus memiliki panjang 12 karakter")

  .length(11, "NIM harus memiliki panjang 11 karakter")
  .startsWith("00000", "NIM harus diawali dengan 00000");

export type Token = z.infer<typeof nimSchema>;
