import { z } from "zod";

export const LoginSchema = z.object({
  login: z.string(),
  password: z
    .string()
    .min(6, {
      message: "Пароль должен содержать не менее 6 символов",
    })
    .max(20, {
      message: "Пароль должен содержать не более 20 символов",
    }),
});

export type LoginSchemaType = z.infer<typeof LoginSchema>;
