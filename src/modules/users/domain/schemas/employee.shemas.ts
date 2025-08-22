import { z } from "zod";

import { CenterSchema } from "./center.shemas";
import { DepartmentSchema } from "./department.shemas";
import { ServiceSchema } from "./service.shemas";
import { UserProfileSchema } from "./user.shemas";

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

// Схема для обновления профиля сотрудника
export const UpdateEmployeeProfileSchema = z.object({
  fullName: z.string().optional(),
  phone: z.string().optional(),
});

// Схема для обновления сотрудника
export const UpdateEmployeeSchema = z.object({
  profile: UpdateEmployeeProfileSchema.optional(),
  service_ids: z.array(z.string()).optional(),
  table: z.number().optional(),
  cabinet: z.number().optional(),
  password: z.string().optional(),
  login: z.string().optional(),
});

export type EmployeeType = z.infer<typeof EmployeeSchema>;
export type EmployeeInfoType = z.infer<typeof EmployeeInfoSchema>;
export type ServiceType = z.infer<typeof ServiceSchema>;
export type DepartmentType = z.infer<typeof DepartmentSchema>;
export type EmployeeOneType = z.infer<typeof EmployeeOneSchema>;
export type UpdateEmployeeProfileType = z.infer<
  typeof UpdateEmployeeProfileSchema
>;
export type UpdateEmployeeType = z.infer<typeof UpdateEmployeeSchema>;
