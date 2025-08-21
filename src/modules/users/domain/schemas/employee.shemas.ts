import { z } from "zod";

import { CenterSchema } from "./center.shemas";
import { DepartmentSchema } from "./department.shemas";
import { ServiceSchema } from "./service.shemas";
import { UserProfileSchema } from "./user.shemas";

export const LanguageSchema = z.object({
  kz: z.string(),
  ru: z.string(),
});

export type LanguageType = z.infer<typeof LanguageSchema>;

const EmployeeInfoSchema = z.object({
  id: z.string(),
  table: z.number(),
  cabinet: z.number(),
  department: DepartmentSchema,
  isOnline: z.boolean(),
  center: CenterSchema,
});

const EmployeeOneSchema = z.object({
  id: z.string(),
  profile: UserProfileSchema,
  employeeInfo: EmployeeInfoSchema,
  employeeServices: z.array(
    z.object({
      service: ServiceSchema,
    })
  ),
});

export const EmployeeSchema = z.object({
  managers: z.array(EmployeeOneSchema),
  total: z.number(),
  page: z.number(),
  totalPages: z.number(),
});

export type EmployeeType = z.infer<typeof EmployeeSchema>;
export type EmployeeInfoType = z.infer<typeof EmployeeInfoSchema>;
export type ServiceType = z.infer<typeof ServiceSchema>;
export type DepartmentType = z.infer<typeof DepartmentSchema>;
export type EmployeeOneType = z.infer<typeof EmployeeOneSchema>;
