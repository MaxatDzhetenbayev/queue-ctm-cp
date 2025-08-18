import z from "zod";

import { LanguageSchema } from "./employee.shemas";

export const ServiceSchema = z.object({
  id: z.string(),
  name: LanguageSchema,
});
