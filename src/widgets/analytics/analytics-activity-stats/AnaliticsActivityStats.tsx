"use client";
import React from "react";
import { useQuery } from "@tanstack/react-query";
import { Line } from "react-chartjs-2";
import {
  Center,
  Flex,
  Paper,
  Text,
  Title,
  useMantineTheme,
} from "@mantine/core";
import { api } from "@/shared";
import {
  Chart as ChartJS,
  Legend,
  LinearScale,
  LineElement,
  PointElement,
} from "chart.js";

ChartJS.register(Legend, LinearScale, PointElement, LineElement);

interface IAnalyticsActivityStats {
  [key: string]: number;
}

export const AnaliticsActivityStats = () => {
  const theme = useMantineTheme();

  const { data, isLoading, isSuccess } = useQuery<IAnalyticsActivityStats>({
    queryKey: ["analytics-statistics-activity"],
    queryFn: async () => (await api.get("analytics/statistics/activity")).data,
  });

  return (
    <Paper shadow="md">
      <Flex w="100%" p={20} justify="space-between" align="center">
        <Title order={3}>График активности</Title>
        <Text c="dimmed">За неделю</Text>
      </Flex>
      <Center mt={20} h={420} p={10}>
        {isLoading ? (
          <Title order={3}>Загрузка данных ...</Title>
        ) : (
          <>
            {isSuccess && data ? (
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
                  labels: ["пн", "вт", "ср", "чт", "пт", "сб", "вс"],
                  datasets: [
                    {
                      label: "Активность",
                      data: () => {
                        const days: number[] = [];
                        for (const day in data) {
                          days.push(data[day]);
                        }
                        return days;
                      },
                      borderColor: theme.colors.blue[6],
                      backgroundColor: theme.colors.blue[3],
                      fill: true,
                    },
                  ],
                }}
              />
            ) : (
              <Title>Нет данных</Title>
            )}
          </>
        )}
      </Center>
    </Paper>
  );
};
