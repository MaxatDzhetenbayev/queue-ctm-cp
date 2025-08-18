import z from "zod";

import { LanguageSchema } from "./employee.shemas";

export const DepartmentSchema = z.object({
  id: z.string(),
  name: LanguageSchema,
});
