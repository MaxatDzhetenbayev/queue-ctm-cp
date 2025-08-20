import { AuthVariantType } from "@/modules/users/domain/schemas";

/**
 *
 * @param variant - Вариант авторизации для нормализации
 * @returns Нормализованный текст варианта
 */
export function normalizeAuthVariant(variant?: AuthVariantType) {
  switch (variant) {
    case "CREDENTIALS":
      return "Авторизация";
    case "TELEGRAM":
      return "Telegram";
    case "OFFLINE":
      return "Офлайн";
    default:
      return "Ошибка";
  }
}
