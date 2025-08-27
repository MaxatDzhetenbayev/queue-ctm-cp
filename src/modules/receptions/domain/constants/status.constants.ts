import { ReceptionStatusType } from "@/modules/receptions/domain/schemas/reception.schemas";

// Статусы приемов
export const RECEPTION_STATUSES = {
  PENDING: "PENDING",
  CALLED: "CALLED",
  WORKING: "WORKING",
  DONE: "DONE",
  NO_SHOW: "NO_SHOW",
  CANCELED: "CANCELED",
} as const;

// Маппинг статусов на русские названия
export const STATUS_LABELS: Record<ReceptionStatusType, string> = {
  PENDING: "Ожидает",
  CALLED: "Вызван",
  WORKING: "На приеме",
  DONE: "Завершен",
  NO_SHOW: "Не пришел",
  CANCELED: "Отменен",
};

// Маппинг статусов на цвета
export const STATUS_COLORS: Record<ReceptionStatusType, string> = {
  PENDING: "bg-yellow-100 text-yellow-800",
  CALLED: "bg-blue-100 text-blue-800",
  WORKING: "bg-green-100 text-green-800",
  DONE: "bg-gray-100 text-gray-800",
  NO_SHOW: "bg-red-100 text-red-800",
  CANCELED: "bg-red-100 text-red-800",
};
