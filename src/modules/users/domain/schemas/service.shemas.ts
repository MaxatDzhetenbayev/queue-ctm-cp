import z from "zod";

import { LanguageSchema } from "./common.shemas";

export const ServiceSchema = z.object({
  id: z.string(),
  name: LanguageSchema,
});
