import { z } from "zod";

import { CenterSchema } from "./center.shemas";
import { DepartmentSchema } from "./department.shemas";
import { ServiceSchema } from "./service.shemas";

export const LanguageSchema = z.object({
  kz: z.string(),
  ru: z.string(),
});

const EmployeeProfileSchema = z.object({
  id: z.string(),
  fullName: z.string(),
  iin: z.string().optional(),
  phone: z.string().optional(),
});

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
  profile: EmployeeProfileSchema,
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
export type EmployeeProfileType = z.infer<typeof EmployeeProfileSchema>;
export type EmployeeInfoType = z.infer<typeof EmployeeInfoSchema>;
export type ServiceType = z.infer<typeof ServiceSchema>;
export type DepartmentType = z.infer<typeof DepartmentSchema>;
export type EmployeeOneType = z.infer<typeof EmployeeOneSchema>;
