import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";

dayjs.extend(utc);
dayjs.extend(timezone);

const ALMATY_TZ = "Asia/Karachi";

/**
 * Форматирует время из ISO-строки или Date (UTC) в Asia/Almaty (UTC+5).
 * Например: "1970-01-01T07:00:00.000Z" → "12:00"
 *
 * @param isoTime - ISO-строка или Date в UTC
 * @returns Строка времени HH:mm в поясе Asia/Almaty
 */
export function formatTimeAlmaty(
  isoTime: string | Date | null | undefined
): string {
  if (isoTime == null) return "";
  const iso = typeof isoTime === "string" ? isoTime : isoTime.toISOString();
  return dayjs.utc(iso).tz(ALMATY_TZ).format("HH:mm");
}

/**
 * Форматирует дату и время из ISO-строки или Date (UTC) в Asia/Almaty для отображения.
 *
 * @param isoTime - ISO-строка или Date в UTC
 * @returns Строка "DD.MM.YYYY HH:mm" в поясе Asia/Almaty
 */
export function formatDateTimeAlmaty(
  isoTime: string | Date | null | undefined
): string {
  if (isoTime == null) return "";
  const iso = typeof isoTime === "string" ? isoTime : isoTime.toISOString();
  return dayjs.utc(iso).tz(ALMATY_TZ).format("DD.MM.YYYY HH:mm");
}
