import { StatusesType } from "@/modules/users/domain/schemas";

export const statusOptions: Array<{ value: StatusesType; label: string }> = [
  {
    value: "PENDING",
    label: "В ожидании",
  },
  {
    value: "WORKING",
    label: "В работе",
  },
  {
    value: "DONE",
    label: "Завершено",
  },
  {
    value: "CANCELED",
    label: "Отменено",
  },
  {
    value: "NO_SHOW",
    label: "Не пришел",
  },
  {
    value: "CALLED",
    label: "Приглашение",
  },
  {
    value: "TRANSFERRED",
    label: "Перенесен",
  },
];
