"use client";

import {
  Center,
  Flex,
  Grid,
  Paper,
  Text,
  Title,
  useMantineTheme,
} from "@mantine/core";
import React from "react";

import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
} from "chart.js";
import { Bar, Line } from "react-chartjs-2";
import { AnalyticsServiceTypes, UpcomingAbsences } from "@/widgets";
import { ProgressStats } from "@/entities";
import { ProgressType } from "@/shared";

ChartJS.register(
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement
);

export default function DashboardPage() {
  const theme = useMantineTheme();

  const dashboardData = {
    typeStats: [
      {
        label: "Содействие в трудоустройстве",
        value: 10,
        color: theme.colors.violet[6],
      },
      {
        label: "Молодежная практика",
        value: 20,
        color: theme.colors.blue[6],
      },
      {
        label: "Контракт поколения",
        value: 15,
        color: theme.colors.blue[3],
      },
      {
        label: "Серебрянный возраст",
        value: 25,
        color: theme.colors.green[6],
      },
      {
        label: "Первое рабочее место",
        value: 30,
        color: theme.colors.green[3],
      },
      {
        label: "Общественные работы",
        value: 5,
        color: theme.colors.orange[6],
      },
      {
        label: "Социальные рабочие места",
        value: 10,
        color: theme.colors.orange[3],
      },
      {
        label: "Адресная социальная помощь",
        value: 5,
        color: theme.colors.red[6],
      },
    ],
    activeStatsByWeek: [
      { day: "Пн", value: 10 },
      { day: "Вт", value: 15 },
      { day: "Ср", value: 20 },
      { day: "Чт", value: 25 },
      { day: "Пт", value: 30 },
      { day: "Сб", value: 5 },
      { day: "Вс", value: 10 },
    ],
  };

  return (
    <Grid columns={12} gutter={"lg"}>
      <Grid.Col span={6}>
        <Paper shadow="md">
          <Flex w="100%" p={20} justify="space-between" align="center">
            <Title order={3}>График активности</Title>
            <Text c="dimmed">За неделю</Text>
          </Flex>
          <Center mt={20} h={420} p={10}>
            <Line
              options={{
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
              data={{
                labels: dashboardData.activeStatsByWeek.map((stat) => stat.day),
                datasets: [
                  {
                    label: "Активность",
                    data: dashboardData.activeStatsByWeek.map(
                      (stat) => stat.value
                    ),
                    borderColor: theme.colors.blue[6],
                    backgroundColor: theme.colors.blue[3],
                    fill: true,
                  },
                ],
              }}
            />
          </Center>
        </Paper>
      </Grid.Col>
      <Grid.Col span={6}>
        <AnalyticsServiceTypes />
      </Grid.Col>
      <Grid.Col span={4}>
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
      <Grid.Col span={4}>
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
      <Grid.Col span={4}>
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
      </Grid.Col>
      <Grid.Col span={12}>
        <UpcomingAbsences />
      </Grid.Col>
    </Grid>
  );
}
