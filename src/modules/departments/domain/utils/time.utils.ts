/**
 * Генерирует массив временных слотов от начального до конечного времени
 * @param startTime - Начальное время в формате "HH:MM"
 * @param endTime - Конечное время в формате "HH:MM"
 * @returns Массив временных слотов
 */
export const getHoursFromToHourEnd = (
  startTime: string,
  endTime: string
): string[] => {
  const slots: string[] = [];
  const [startHour, startMinute] = startTime.split(":").map(Number);
  const [endHour, endMinute] = endTime.split(":").map(Number);

  let currentHour = startHour;
  let currentMinute = startMinute;

  while (
    currentHour < endHour ||
    (currentHour === endHour && currentMinute <= endMinute)
  ) {
    const timeString = `${currentHour
      .toString()
      .padStart(2, "0")}:${currentMinute.toString().padStart(2, "0")}`;
    slots.push(timeString);

    currentMinute += 30;
    if (currentMinute >= 60) {
      currentMinute = 0;
      currentHour += 1;
    }
  }

  return slots;
};
