import { z } from "zod";

const clientEnvSchema = z.object({
  NEXT_PUBLIC_API_URL: z.string({
    error: "NEXT_PUBLIC_API_URL не задан в окружении",
  }),
});

const _parsed = clientEnvSchema.safeParse(process.env);

if (!_parsed.success) {
  throw new Error("Ошибка валидации окружения. " + _parsed.error.message);
}
