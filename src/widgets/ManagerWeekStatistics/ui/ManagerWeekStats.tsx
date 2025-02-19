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
import { useManagerWeekStats } from "../hooks";
import { Box, Skeleton } from "@mantine/core";

export const ManagerWeekStats = () => {
  ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    Title,
    Tooltip,
    Legend,
    ArcElement
  );

  const { data, isLoading } = useManagerWeekStats();

  return isLoading ? (
    <Box h="100%">
      <Skeleton h="100%" />
    </Box>
  ) : (
    <Box>
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
              backgroundColor: ["#228be6", "#40c057", "#f03e3e"],
            },
          ],
        }}
      />
    </Box>
  );
};
