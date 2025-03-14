import React from "react";
import { Doughnut } from "react-chartjs-2";
import {
  Chart as ChartJS,
  ArcElement,
  CategoryScale,
  Legend,
  LinearScale,
  PointElement,
  Title,
  Tooltip,
} from "chart.js";
import { useCenterManagersWeekStats } from "../hooks";
import { Box, Skeleton } from "@mantine/core";

export const ManagersWeekStats = () => {
  ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    Title,
    Tooltip,
    Legend,
    ArcElement
  );

  const { data, isLoading } = useCenterManagersWeekStats();

  return isLoading ? (
    <Box h="100%">
      <Skeleton h="100%" />
    </Box>
  ) : (
    <Box style={{ display: "flex", alignItems: "flex-end", height: "100%" }}>
      <Doughnut
        data={{
          labels: ["Приемы", "Завершенные", "Отмененные"],
          datasets: [
            {
              data: [
                data?.total ? data.total : 0,
                data?.completed ? data.completed : 0,
                data?.declined ? data.declined : 0,
              ],
              backgroundColor: ["#B0B0B0", "#808080", "#404040"],
            },
          ],
        }}
        options={{
          plugins: {
            legend: {
              position: "top",
              labels: {
                font: {
                  size: 12,
                },
              },
            },
          },
        }}
      />
    </Box>
  );
};
