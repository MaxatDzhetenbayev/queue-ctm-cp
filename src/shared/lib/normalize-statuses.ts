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
    case "CANCELED":
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

/**
 * Получает цвет фона и текста для статуса
 * @param status - Статус
 * @returns Классы для стилизации
 */
export function getStatusColor(status: string) {
  switch (status) {
    case "PENDING":
      return "bg-yellow-100 text-yellow-800";
    case "WORKING":
      return "bg-blue-100 text-blue-800";
    case "DONE":
      return "bg-green-100 text-green-800";
    case "CANCELLED":
      return "bg-red-100 text-red-800";
    case "NO_SHOW":
      return "bg-gray-100 text-gray-800";
    case "CALLED":
      return "bg-purple-100 text-purple-800";
    case "TRANSFERRED":
      return "bg-orange-100 text-orange-800";
    default:
      return "bg-gray-100 text-gray-800";
  }
}
