import { z } from "zod";

// Схема для названий (многоязычные)
const NameSchema = z.object({
  kz: z.string(),
  ru: z.string(),
});

// Схема для профиля пользователя
const UserProfileSchema = z.object({
  iin: z.string().optional(),
  fullName: z.string(),
  phone: z.string(),
});

// Схема для пользователя
const UserSchema = z.object({
  id: z.string(),
  authType: z.string(),
  profile: UserProfileSchema,
});

// Схема для сервиса
const ServiceSchema = z.object({
  id: z.string(),
  name: NameSchema,
});

// Схема для центра
const CenterSchema = z.object({
  id: z.string(),
  name: NameSchema,
});

// Схема для департамента
const DepartmentSchema = z.object({
  id: z.string(),
  name: NameSchema,
  centerId: z.string(),
});

// Схема для статуса приема
export const ReceptionStatusSchema = z.enum([
  "PENDING",
  "CALLED",
  "WORKING",
  "DONE",
  "NO_SHOW",
  "CANCELED",
]);

// Схема для одного приема
export const ReceptionSchema = z.object({
  id: z.string(),
  date: z.string(),
  time: z.string(),
  status: ReceptionStatusSchema,
  comment: z.string().optional(),
  service: ServiceSchema,
  user: UserSchema,
  center: CenterSchema,
  department: DepartmentSchema,
});

// Схема для списка приемов (массив приемов)
export const ReceptionsListSchema = z.array(ReceptionSchema);

// Схема для обновления статуса приема
export const UpdateReceptionStatusSchema = z.object({
  id: z.string(),
  status: ReceptionStatusSchema,
  comment: z.string().optional(),
});

// Схема для создания офлайн приема
export const CreateOfflineReceptionSchema = z.object({
  profile: z.object({
    fullName: z.string().min(2, "ФИО должно содержать минимум 2 символа"),
    phone: z.string().min(10, "Телефон должен содержать минимум 10 цифр"),
  }),
  time: z.string(),
});

// Типы
export type ReceptionType = z.infer<typeof ReceptionSchema>;
export type ReceptionsListType = z.infer<typeof ReceptionsListSchema>;
export type ReceptionStatusType = z.infer<typeof ReceptionStatusSchema>;
export type UpdateReceptionStatusType = z.infer<
  typeof UpdateReceptionStatusSchema
>;
export type CreateOfflineReceptionType = z.infer<
  typeof CreateOfflineReceptionSchema
>;
export type UserProfileType = z.infer<typeof UserProfileSchema>;
export type ServiceType = z.infer<typeof ServiceSchema>;
export type CenterType = z.infer<typeof CenterSchema>;
export type DepartmentType = z.infer<typeof DepartmentSchema>;
