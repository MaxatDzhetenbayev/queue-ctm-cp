export const MAIN_CONFIG = {
  title: "Нагрузка на отделы",
  skeleton: {
    itemsCount: 5,
    headerWidth: "w-48",
    itemHeight: "h-10",
    labelWidth: "w-12",
    valueWidth: "w-8",
  },
  chart: {
    height: 280,
    barSize: 40,
    radius: 4,
    margin: { right: 16 },
    fontSize: 16,
    offset: 8,
  },
  messages: {
    error: "Произошла ошибка при загрузке данных о нагрузке на отделы.",
    empty:
      "В данный момент нет информации о нагрузке на отделы. Попробуйте обновить страницу или обратитесь к администратору.",
    errorTitle: "Не удалось загрузить данные",
    emptyTitle: "Нет данных для отображения",
  },
} as const;

export const chartConfig = {
  count: {
    label: "Количество",
    color: "var(--chart-2)",
  },
  label: {
    color: "var(--background)",
  },
} as const;
