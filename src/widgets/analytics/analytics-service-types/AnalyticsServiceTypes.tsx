"use client";

import {
  Center,
  Flex,
  Paper,
  Text,
  Title,
  useMantineTheme,
} from "@mantine/core";
import React from "react";

import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Pie } from "react-chartjs-2";
import { useQuery } from "@tanstack/react-query";
import { api, LanguageField } from "@/shared";

ChartJS.register(ArcElement, Tooltip, Legend);

interface IAnalyticsServiceType {
  name: LanguageField;
  count: number;
}

const COLORS = [
  "#4e79a7",
  "#f28e2b",
  "#e15759",
  "#76b7b2",
  "#59a14f",
  "#edc949",
  "#af7aa1",
  "#ff9da7",
  "#9c755f",
  "#bab0ab",
];

export const AnalyticsServiceTypes = () => {
  const theme = useMantineTheme();

  const { data, isLoading, isSuccess } = useQuery<IAnalyticsServiceType[]>({
    queryKey: ["absences-analytics-types"],
    queryFn: async () =>
      (await api.get("analytics/statistics/service-types")).data,
  });

  return (
    <Paper shadow="md">
      <Flex w="100%" p={20} justify="space-between" align="center">
        <Title order={3}>Типы услуг</Title>
        <Text c="dimmed">Процентное соотношение</Text>
      </Flex>
      <Center mt={20} h={420} p={10}>
        {isLoading ? (
          <Title order={3}>Загрузка данных ...</Title>
        ) : (
          <>
            {isSuccess && data && data.length > 0 ? (
              <Pie
                data={{
                  labels: data.map((stat) => stat.name.ru),
                  datasets: [
                    {
                      data: data.map((stat) => stat.count),
                      backgroundColor: data.map(
                        (_, index) => COLORS[index % COLORS.length]
                      ),
                    },
                  ],
                }}
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
              />
            ) : (
              <Text c="dimmed">Нет данных</Text>
            )}
          </>
        )}
      </Center>
    </Paper>
  );
};
