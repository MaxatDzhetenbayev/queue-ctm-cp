export const MAIN_CONFIG = {
  title: "График активности",
  chart: {
    height: 250,
    margin: {
      left: 12,
      right: 12,
    },
    tooltipWidth: 180,
  },
  messages: {
    error: "Произошла ошибка при загрузке данных о активности.",
    empty:
      "В данный момент нет информации о активности. Попробуйте обновить страницу или обратитесь к администратору.",
    errorTitle: "Не удалось загрузить данные",
    emptyTitle: "Нет данных для отображения",
    loading: "Загрузка...",
  },
  dateFormat: {
    tooltip: {
      month: "short",
      day: "numeric",
      year: "numeric",
    },
    axis: {
      month: "short",
      day: "numeric",
    },
  },
} as const;

export const chartConfig = {
  records: {
    label: "Количество записей",
    color: "var(--color-chart-7)",
  },
} as const;
