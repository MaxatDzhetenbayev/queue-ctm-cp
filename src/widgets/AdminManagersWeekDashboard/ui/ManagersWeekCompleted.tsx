import React from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { useCenterManagersWeekStatics } from "../hooks";
import { Box, Skeleton, Title as MantineTitle } from "@mantine/core";

export const ManagersWeekCompleted = () => {
  ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
  );

  const { data, isLoading } = useCenterManagersWeekStatics();

  const labels: string[] = [];

  for (const item in data) {
    labels.push(item);
  }

  return isLoading ? (
    <Skeleton h="100%" />
  ) : (
    <Box>
      <MantineTitle order={2}>Статистика по дням</MantineTitle>
      <Bar
        height={200}
        width={600}
        data={{
          labels,
          datasets: [
            {
              label: "Завершенные приемы",
              data,
              borderColor: "#000",
              backgroundColor: "#000",
            },
          ],
        }}
      />
    </Box>
  );
};
