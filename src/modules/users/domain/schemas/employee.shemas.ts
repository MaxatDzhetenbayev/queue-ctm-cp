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

/** Роли, доступные при редактировании сотрудника (специалист / руководитель отдела). */
export const EDITABLE_EMPLOYEE_ROLES = ["MANAGER", "HEAD"] as const;
export type EditableEmployeeRole = (typeof EDITABLE_EMPLOYEE_ROLES)[number];

const EmployeeOneSchema = z.object({
  login: z.string(),
  role: z.enum(["REGULAR", "MANAGER", "ADMIN", "SUPERADMIN", "HEAD"]).optional(),
  ...UserProfileSchema.omit({ role: true }).shape,
  employeeInfo: EmployeeInfoSchema,
  employeeServices: z.array(
    z.object({
      service: ServiceSchema,
    })
  ),
  employeeFeatures: z
    .array(
      z.object({
        id: z.string(),
        type: z.string(),
        value: z.string(),
      })
    )
    .optional(),
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
  department_id: z.string().optional(),
  cabinet: z.number().optional(),
  password: z.string().optional(),
  login: z.string().optional(),
  role: z
    .enum(EDITABLE_EMPLOYEE_ROLES, {
      message:
        "Роль может быть только MANAGER (специалист) или HEAD (руководитель отдела)",
    })
    .optional(),
  employeeFeatures: z
    .array(
      z.object({
        type: z.string(),
        value: z.string(),
      })
    )
    .optional(),
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

// Схема для создания работника
export const CreateEmployeeSchema = z.object({
  login: z
    .string()
    .min(6, "Логин должен содержать минимум 6 символов")
    .max(50, "Логин не должен превышать 50 символов")
    .regex(
      /^[a-zA-Z0-9_]+$/,
      "Логин может содержать только буквы, цифры и знак подчеркивания"
    ),
  password: z
    .string()
    .min(6, "Пароль должен содержать минимум 6 символов")
    .max(100, "Пароль не должен превышать 100 символов"),
  profile: z.object({
    fullName: z
      .string()
      .min(2, "ФИО должно содержать минимум 2 символа")
      .max(100, "ФИО не должно превышать 100 символов")
      .regex(
        /^[а-яёәғқңөұүһі\s]+$/i,
        "ФИО может содержать только буквы и пробелы"
      ),
    phone: z
      .string()
      .min(10, "Телефон должен содержать минимум 10 цифр")
      .max(15, "Телефон не должен превышать 15 цифр")
      .regex(
        /^[0-9+\-\s()]+$/,
        "Телефон может содержать только цифры, пробелы, скобки, плюс и дефис"
      ),
  }),
  cabinet: z
    .number()
    .int("Номер кабинета должен быть целым числом")
    .min(1, "Номер кабинета должен быть больше 0")
    .max(9999, "Номер кабинета не должен превышать 9999"),
  table: z
    .number()
    .int("Номер стола должен быть целым числом")
    .min(1, "Номер стола должен быть больше 0")
    .max(9999, "Номер стола не должен превышать 9999"),
  role: z.string().optional().default("MANAGER"),
  auth_type: z.string().optional().default("CREDENTIALS"),
  /** ID центра (для суперадмина; для админа подставляется на бэкенде) */
  center_id: z.string().optional(),
  department_id: z.string().min(1, "ID департамента обязателен"),
  service_ids: z.array(z.string()).min(1, "Выберите хотя бы один сервис"),

  employeeFeatures: z
    .array(
      z.object({
        type: z.string(),
        value: z.string(),
      })
    )
    .optional(),
});

export type CreateEmployeeType = z.infer<typeof CreateEmployeeSchema>;

// Схема для создания директора (только базовые данные, без отделов и сервисов)
export const CreateDirectorSchema = z.object({
  login: z
    .string()
    .min(6, "Логин должен содержать минимум 6 символов")
    .max(50, "Логин не должен превышать 50 символов")
    .regex(
      /^[a-zA-Z0-9_]+$/,
      "Логин может содержать только буквы, цифры и знак подчеркивания"
    ),
  password: z
    .string()
    .min(6, "Пароль должен содержать минимум 6 символов")
    .max(100, "Пароль не должен превышать 100 символов"),
  profile: z.object({
    fullName: z
      .string()
      .min(2, "ФИО должно содержать минимум 2 символа")
      .max(100, "ФИО не должно превышать 100 символов")
      .regex(
        /^[а-яёәғқңөұүһі\s]+$/i,
        "ФИО может содержать только буквы и пробелы"
      ),
    phone: z
      .string()
      .min(10, "Телефон должен содержать минимум 10 цифр")
      .max(15, "Телефон не должен превышать 15 цифр")
      .regex(
        /^[0-9+\-\s()]+$/,
        "Телефон может содержать только цифры, пробелы, скобки, плюс и дефис"
      ),
  }),
  auth_type: z.string().optional().default("CREDENTIALS"),
  role: z.literal("ADMIN"),
  center_id: z.string().min(1, "ID центра обязателен"),
});

export type CreateDirectorType = z.infer<typeof CreateDirectorSchema>;
