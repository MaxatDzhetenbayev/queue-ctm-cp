import z from "zod";

import { LanguageSchema } from "./common.shemas";

export const DepartmentSchema = z.object({
  id: z.string(),
  name: LanguageSchema,
});
