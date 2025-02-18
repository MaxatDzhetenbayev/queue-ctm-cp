"use client";
import { ManagerReceptions } from "@/widgets";
import { ManagerTodayStatistics } from "@/widgets/ManagerTodayStatistics";
import { ManagerWeekStatistics } from "@/widgets/ManagerWeekStatistics";
import { Grid } from "@mantine/core";

import React from "react";

export default function Page() {
  //   const [reminders, setReminders] = useState([
  //     { id: 1, text: "Следующий клиент через 5 минут", type: "warning" },
  //     { id: 2, text: "Запись без подтверждения", type: "alert" },
  //     { id: 3, text: "Закрытие смены через 30 минут", type: "info" },
  //   ]);

  //   const removeReminder = (id: number) => {
  //     setReminders(reminders.filter((reminder) => reminder.id !== id));
  //   };

  return (
    <Grid grow>
      <Grid.Col span={12}>
        <ManagerReceptions />
      </Grid.Col>
      <Grid.Col span={8}>
        <ManagerWeekStatistics />
      </Grid.Col>
      <Grid.Col span={4}>
        <ManagerTodayStatistics />
      </Grid.Col>
    </Grid>
  );
}
