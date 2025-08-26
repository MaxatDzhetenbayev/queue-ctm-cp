import z from "zod";

import { LanguageSchema } from "./common.schemas";

export const DepartmentSchema = z.object({
  id: z.string(),
  name: LanguageSchema,
  employeeCount: z.number(),
});

export type DepartmentType = z.infer<typeof DepartmentSchema>;
