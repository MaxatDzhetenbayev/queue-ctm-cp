import React from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  ArcElement,
  CategoryScale,
  Legend,
  LinearScale,
  LineElement,
  PointElement,
  Title,
  Tooltip,
} from "chart.js";
import { useCenterManagersWeekStatics } from "../hooks";
import { Box, Skeleton, Title as MantineTitle } from "@mantine/core";

export const ManagersWeekCompleted = () => {
  ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    ArcElement
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
      <MantineTitle order={2}>Статистики Менеджеров за неделю</MantineTitle>
      <Line
        data={{
          labels,
          datasets: [
            {
              label: "Завершенные приемы",
              data,
              fill: false,
              borderColor: "#193CB8",
              backgroundColor: "rgb(25,60,184,0.5)",
            },
          ],
        }}
      />
    </Box>
  );
};
