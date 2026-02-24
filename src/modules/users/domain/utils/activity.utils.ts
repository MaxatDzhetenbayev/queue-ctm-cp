import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";

import {
  ActivityStatus,
  EmployeeActivity,
  LeaveStatus,
} from "../schemas/activity.schemas";

dayjs.extend(utc);
dayjs.extend(timezone);

export interface ActivityDay {
  date: string;
  status: ActivityStatus | null;
  activities: EmployeeActivity[];
  totalHours: number;
}

export interface HeatmapData {
  days: ActivityDay[];
  months: string[];
  weekDays: string[];
}

export const getStatusColor = (status: ActivityStatus | null): string => {
  switch (status) {
    case "ONLINE":
      return "bg-green-500";
    case "OFFLINE":
      return "bg-red-500";
    case "OFFLINE_BY_REASON":
      return "bg-blue-500";
    default:
      return "bg-gray-200";
  }
};

export const getActivityStatusLabel = (status: LeaveStatus): string => {
  switch (status) {
    case "WORKING":
      return "В работе";
    case "CANCELLED":
      return "Отменен";
    case "COMPLETED":
      return "Завершен";
    case "PLANNED":
      return "Планируется";
    default:
      return "Неизвестно";
  }
};

export const getStatusIntensity = (totalHours: number): string => {
  if (totalHours === 0) return "bg-gray-200";
  if (totalHours < 2) return "bg-green-200";
  if (totalHours < 4) return "bg-green-300";
  if (totalHours < 6) return "bg-green-400";
  return "bg-green-500";
};

export const formatDate = (date: string): string => {
  return new Date(date).toLocaleDateString("ru-RU", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
};

/** Время в Asia/Almaty (UTC+5), формат HH:mm */
export const formatTime = (date: string): string => {
  return dayjs.utc(date).tz("Asia/Almaty").format("HH:mm");
};

export const getStatusLabel = (status: ActivityStatus): string => {
  switch (status) {
    case "ONLINE":
      return "Онлайн";
    case "OFFLINE":
      return "Оффлайн";
    case "OFFLINE_BY_REASON":
      return "Отсутствует по причине";
    default:
      return "Неизвестно";
  }
};

export const processActivityData = (
  activities: EmployeeActivity[]
): HeatmapData => {
  const today = new Date();
  const currentYear = today.getFullYear();

  // Начало года
  // const startDate = new Date(currentYear, 0, 1);
  // Конец года
  const endDate = new Date(currentYear, 11, 31);

  const days: ActivityDay[] = [];
  const months: string[] = [];
  const weekDays = ["Пн", "Вт", "Ср", "Чт", "Пт", "Сб", "Вс"];

  // Правильно вычисляем пустые дни в начале года
  const firstDayOfYear = new Date(currentYear, 0, 1);
  const firstDayOfWeek = firstDayOfYear.getDay();
  // Понедельник = 1, Вторник = 2, ..., Воскресенье = 0
  // Нам нужно, чтобы понедельник был первым днем недели
  const daysToAdd = firstDayOfWeek === 0 ? 6 : firstDayOfWeek - 1;

  // Добавляем пустые дни в начале года
  if (daysToAdd > 0) {
    for (let i = 0; i < daysToAdd; i++) {
      const prevDate = new Date(firstDayOfYear);
      prevDate.setDate(firstDayOfYear.getDate() - daysToAdd + i);
      days.push({
        date: prevDate.toISOString().split("T")[0],
        status: null,
        activities: [],
        totalHours: 0,
      });
    }
  }

  // Создаем массив всех дней года
  const currentDate = new Date(firstDayOfYear);
  while (currentDate <= endDate) {
    const dateStr = currentDate.toISOString().split("T")[0];

    // Находим активность для этого дня
    const dayActivities = activities.filter((activity) => {
      const activityStart = new Date(activity.startDate);
      const activityEnd = activity.endDate
        ? new Date(activity.endDate)
        : new Date();

      // Создаем границы дня в UTC времени для корректного сравнения
      const dayStart = new Date(currentDate);
      dayStart.setUTCHours(0, 0, 0, 0);
      const dayEnd = new Date(currentDate);
      dayEnd.setUTCHours(23, 59, 59, 999);

      return activityStart <= dayEnd && activityEnd >= dayStart;
    });

    // Определяем основной статус дня
    let mainStatus: ActivityStatus | null = null;
    let totalHours = 0;

    if (dayActivities.length > 0) {
      // Группируем по статусам и считаем часы
      const statusHours: Record<ActivityStatus, number> = {
        ONLINE: 0,
        OFFLINE: 0,
        OFFLINE_BY_REASON: 0,
      };

      dayActivities.forEach((activity) => {
        const start = new Date(activity.startDate);
        const end = activity.endDate ? new Date(activity.endDate) : new Date();

        const dayStart = new Date(currentDate);
        dayStart.setUTCHours(0, 0, 0, 0);
        const dayEnd = new Date(currentDate);
        dayEnd.setUTCHours(23, 59, 59, 999);

        const overlapStart = new Date(
          Math.max(start.getTime(), dayStart.getTime())
        );
        const overlapEnd = new Date(Math.min(end.getTime(), dayEnd.getTime()));

        const hours =
          (overlapEnd.getTime() - overlapStart.getTime()) / (1000 * 60 * 60);
        statusHours[activity.status] += hours;
        totalHours += hours;
      });

      // Определяем основной статус по наибольшему количеству часов
      const maxStatus = Object.entries(statusHours).reduce((a, b) =>
        statusHours[a[0] as ActivityStatus] >
        statusHours[b[0] as ActivityStatus]
          ? a
          : b
      );
      mainStatus = maxStatus[0] as ActivityStatus;
    }

    days.push({
      date: dateStr,
      status: mainStatus,
      activities: dayActivities,
      totalHours,
    });

    // Добавляем месяц в список месяцев
    const monthStr = currentDate.toLocaleDateString("ru-RU", {
      month: "short",
    });
    if (!months.includes(monthStr)) {
      months.push(monthStr);
    }

    currentDate.setDate(currentDate.getDate() + 1);
  }

  return { days, months, weekDays };
};
