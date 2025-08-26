import z from "zod";

import { LanguageSchema } from "./common.schemas";

export const DepartmentSchema = z.object({
  id: z.string(),
  name: LanguageSchema,
  employeeCount: z.number(),
});

export const CreateDepartmentSchema = z.object({
  name: LanguageSchema,
  departmentFeatures: z
    .object({
      TIME: z.string().optional(),
      SHOW: z.string().optional(),
      LETTER: z.string().optional(),
    })
    .optional(),
});

export type DepartmentType = z.infer<typeof DepartmentSchema>;
export type CreateDepartmentType = z.infer<typeof CreateDepartmentSchema>;
