import { z } from "zod";

import { ReceptionSchema } from "./repcetion.schemas";
import { UserProfileSchema } from "./user.shemas";

export const ClientInfoSchema = z.object({
  id: z.string(),
  profile: UserProfileSchema,
  receptions: z.array(ReceptionSchema),
});

// Схема для обновления клиента
export const UpdateClientSchema = z.object({
  name: z
    .string()
    .min(2, "Имя должно содержать минимум 2 символа")
    .max(100, "Имя не должно превышать 100 символов")
    .optional(),
  phone: z.string().optional(),
  iin: z
    .string()
    .regex(/^\d{12}$/, "ИИН должен содержать ровно 12 цифр")
    .optional(),
});

export type ClientInfoType = z.infer<typeof ClientInfoSchema>;
export type UpdateClientType = z.infer<typeof UpdateClientSchema>;
