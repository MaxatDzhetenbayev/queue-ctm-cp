import z from "zod";

import { LanguageSchema } from "./common.shemas";

export const CenterSchema = z.object({
  id: z.string(),
  name: LanguageSchema,
});
