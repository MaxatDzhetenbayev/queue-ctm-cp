import { z } from "zod";

const LanguageSchema = z.object({
  kz: z.string(),
  ru: z.string(),
});

const CenterSchema = z.object({
  id: z.string(),
  name: LanguageSchema,
});

const DepartmentSchema = z.object({
  id: z.string(),
  name: LanguageSchema,
});

const ServiceSchema = z.object({
  id: z.string(),
  name: LanguageSchema,
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
});

export type EmployeeType = z.infer<typeof EmployeeSchema>;
export type EmployeeProfileType = z.infer<typeof EmployeeProfileSchema>;
export type EmployeeInfoType = z.infer<typeof EmployeeInfoSchema>;
export type ServiceType = z.infer<typeof ServiceSchema>;
export type CenterType = z.infer<typeof CenterSchema>;
export type DepartmentType = z.infer<typeof DepartmentSchema>;
export type EmployeeOneType = z.infer<typeof EmployeeOneSchema>;
