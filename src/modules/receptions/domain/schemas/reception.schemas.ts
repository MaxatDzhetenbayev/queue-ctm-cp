import { z } from "zod";

// Схема для типов авторизации
export const AuthTypeSchema = z.enum(["TELEGRAM", "OFFLINE"]);

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
  authType: AuthTypeSchema,
  profile: UserProfileSchema,
});

// Схема для сервиса
const ServiceSchema = z.object({
  id: z.string(),
  name: NameSchema,
});

// Схема для списка сервисов менеджера
export const ManagerServicesSchema = z.array(ServiceSchema);

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

// Схема для пагинированного ответа
export const PaginatedReceptionsSchema = z.object({
  receptions: ReceptionsListSchema,
  total: z.number(),
  page: z.number(),
  totalPages: z.number(),
});

// Схема для обновления статуса приема
export const UpdateReceptionStatusSchema = z.object({
  id: z.string(),
  status: ReceptionStatusSchema,
  comment: z.string().optional(),
});

// Схема для поиска пользователя по ИИН
export const UserByIinSchema = z.object({
  id: z.string(),
  fullName: z.string(),
  userIin: z.string(),
  phone: z.string(),
});

// Схема для создания офлайн приема
export const CreateOfflineReceptionSchema = z.object({
  full_name: z.string().min(2, "ФИО должно содержать минимум 2 символа"),
  iin: z
    .string()
    .length(12, "ИИН должен содержать 12 символов")
    .refine((value) => !value.includes(" "), "ИИН не должен содержать пробелы")
    .refine(
      (value) => /^\d+$/.test(value),
      "ИИН должен содержать только цифры"
    ),
  phone: z.string().min(10, "Телефон должен содержать минимум 10 цифр"),
  serviceId: z.string().min(1, "Выберите сервис"),
});

// Схема для запроса всех записей (админ)
export const GetAllReceptionsQuerySchema = z.object({
  search: z.string().optional(),
  status: ReceptionStatusSchema.optional(),
  date: z.string().optional(),
  type: AuthTypeSchema.optional(),
  centerId: z.string().optional(),
  page: z.number().optional(),
  limit: z.number().optional(),
});

// Типы
export type ReceptionType = z.infer<typeof ReceptionSchema>;
export type ReceptionsListType = z.infer<typeof ReceptionsListSchema>;
export type PaginatedReceptionsType = z.infer<typeof PaginatedReceptionsSchema>;
export type ReceptionStatusType = z.infer<typeof ReceptionStatusSchema>;
export type UpdateReceptionStatusType = z.infer<
  typeof UpdateReceptionStatusSchema
>;
export type CreateOfflineReceptionType = z.infer<
  typeof CreateOfflineReceptionSchema
>;
export type UserProfileType = z.infer<typeof UserProfileSchema>;
export type ServiceType = z.infer<typeof ServiceSchema>;
export type ManagerServicesType = z.infer<typeof ManagerServicesSchema>;
export type UserByIinType = z.infer<typeof UserByIinSchema>;
export type CenterType = z.infer<typeof CenterSchema>;
export type DepartmentType = z.infer<typeof DepartmentSchema>;
export type AuthType = z.infer<typeof AuthTypeSchema>;
export type GetAllReceptionsQueryType = z.infer<
  typeof GetAllReceptionsQuerySchema
>;
