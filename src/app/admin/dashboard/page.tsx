"use client";

import React from "react";
import { Grid } from "@mantine/core";

import {
  AnaliticsActivityStats,
  AnalyticsServiceTypes,
  UpcomingAbsences,
} from "@/widgets";
import { ProgressStats } from "@/entities";
import { ProgressType } from "@/shared";

export default function DashboardPage() {
  return (
    <Grid columns={12} gutter={"lg"}>
      <Grid.Col span={6}>
        <AnaliticsActivityStats />
      </Grid.Col>
      <Grid.Col span={6}>
        <AnalyticsServiceTypes />
      </Grid.Col>
      <Grid.Col span={6}>
        <ProgressStats
          title="Статусы заявок"
          type={ProgressType.NUMBER}
          data={[
            { title: "В ожидании", value: 10 },
            { title: "В обработке", value: 5 },
            { title: "Завершенные", value: 15 },
            { title: "Отмененные", value: 15 },
            { title: "Не явился", value: 15 },
          ]}
        />
      </Grid.Col>
      <Grid.Col span={6}>
        <ProgressStats
          title="Нагрузка на отделы"
          type={ProgressType.PERCENTAGE}
          data={[
            { title: "Отдел трудоустройства", value: 20 },
            { title: "Отдел молодежной политики", value: 30 },
            { title: "Отдел социальных услуг", value: 10 },
            { title: "Отдел по работе с пожилыми", value: 10 },
            { title: "Отдел по работе с молодежью", value: 10 },
          ]}
        />
      </Grid.Col>
      {/* <Grid.Col span={4}>
        <Paper withBorder p={20} h={320}>
          <Title order={3}>Воронка заявок</Title>
          <Bar
            height={200}
            data={{
              labels: [
                "В ожидании",
                "В обработке",
                "Завершенные",
                "Отмененные",
                "Не явился",
              ],
              datasets: [
                {
                  label: "Количество заявок",
                  data: [50, 30, 20, 10, 5],
                  backgroundColor: theme.colors.blue[6],
                },
              ],
            }}
            options={{
              indexAxis: "y",
              responsive: true,
              plugins: {
                legend: {
                  position: "bottom",
                  labels: {
                    color: theme.colors.dark[3],
                  },
                },
              },
            }}
          />
        </Paper>
      </Grid.Col> */}
      <Grid.Col span={12}>
        <UpcomingAbsences />
      </Grid.Col>
    </Grid>
  );
}
