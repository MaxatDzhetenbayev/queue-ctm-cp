import { z } from "zod";

export const LanguageSchema = z.object({
  kz: z.string(),
  ru: z.string(),
});

export type LanguageType = z.infer<typeof LanguageSchema>;
