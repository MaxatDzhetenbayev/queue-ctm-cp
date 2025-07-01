import { Statuses } from "@/features";

/**
 * @param startTime - время начала в формате "HH:mm"
 * @param endTime - время конца в формате "HH:mm"
 */
export function getHoursFromToHourEnd(
  startTime: string,
  endTime: string
): string[] {
  const toMinutes = (time: string): number => {
    const [h, m] = time.split(":").map(Number);
    return h * 60 + m;
  };

  const toTimeStr = (minutes: number): string => {
    const h = Math.floor(minutes / 60);
    const m = minutes % 60;
    return `${h.toString().padStart(2, "0")}:${m.toString().padStart(2, "0")}`;
  };

  const result: string[] = [];
  let current = toMinutes(startTime);
  const end = toMinutes(endTime);

  while (current <= end) {
    result.push(toTimeStr(current));
    current += 30;
  }

  return result;
}

export function normalizeStatus(status?: Statuses) {
  switch (status) {
    case Statuses.PENDING:
      return "На ожидании";
    case Statuses.WORKING:
      return "В работе";
    case Statuses.DONE:
      return "Завершен";
    case Statuses.CANCELED:
      return "Отменен";
    case Statuses.NO_SHOW:
      return "Не пришел";
    case Statuses.CALLED:
      return "Приглашение";
    default:
      return "Ошибка";
  }
}
