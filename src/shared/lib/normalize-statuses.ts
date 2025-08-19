import { StatusesType } from "@/modules/users/domain/schemas";

/**
 *
 * @param status - Статус для нормализации
 * @returns Нормализованный текст статуса
 */
export function normalizeStatus(status?: StatusesType) {
  switch (status) {
    case "PENDING":
      return "На ожидании";
    case "WORKING":
      return "В работе";
    case "DONE":
      return "Завершен";
    case "CANCELLED":
      return "Отменен";
    case "NO_SHOW":
      return "Не пришел";
    case "CALLED":
      return "Приглашение";
    case "TRANSFERRED":
      return "Перенесен";
    default:
      return "Ошибка";
  }
}
