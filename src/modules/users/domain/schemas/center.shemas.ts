import z from "zod";

import { LanguageSchema } from "./employee.shemas";

export const CenterSchema = z.object({
  id: z.string(),
  name: LanguageSchema,
});
