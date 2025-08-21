export const MAIN_CONFIG = {
  title: "Типы авторизации",
  chart: {
    innerRadius: 60,
    strokeWidth: 5,
    maxWidth: 300,
    aspectRatio: "square",
    activeRadiusIncrease: 10,
    activeInnerRadiusIncrease: 12,
    activeOuterRadiusIncrease: 25,
  },
  messages: {
    error: "Произошла ошибка при загрузке данных о типах авторизации.",
    empty:
      "В данный момент нет информации о типах авторизации. Попробуйте обновить страницу или обратитесь к администратору.",
    errorTitle: "Не удалось загрузить данные",
    emptyTitle: "Нет данных для отображения",
    noData: "Нет данных",
    receptions: "Записи",
  },
  select: {
    placeholder: "Выберите тип авторизации",
    triggerClass: "ml-auto h-7 w-[180px] rounded-lg pl-2.5",
    contentClass: "rounded-xl",
    itemClass: "rounded-lg [&_span]:flex",
    colorIndicatorClass: "flex h-3 w-3 shrink-0 rounded-xs",
  },
  authTypes: {
    OFFLINE: {
      label: "Офлайн",
      color: "var(--chart-2)",
    },
    TELEGRAM: {
      label: "Telegram",
      color: "var(--chart-4)",
    },
  },
} as const;

export const chartConfig = {
  defaultColor: "var(--chart-1)",
  labelColor: "var(--foreground)",
  mutedColor: "var(--muted-foreground)",
} as const;
