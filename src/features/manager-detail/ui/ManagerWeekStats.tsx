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
import { Box, Skeleton } from "@mantine/core";

export const ManagerWeekStats = ({
  data,
  isLoading,
}: {
  data: {
    total: number;
    completed: number;
    declined: number;
  };
  isLoading: boolean;
}) => {
  ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    Title,
    Tooltip,
    Legend,
    ArcElement
  );

  return isLoading ? (
    <Box h="100%">
      <Skeleton h="100%" />
    </Box>
  ) : (
    <Box style={{ display: "flex", alignItems: "flex-end", height: "100%" }}>
      <Doughnut
        style={{}}
        data={{
          labels: ["Приемы", "Завершенные", "Отмененные"],
          datasets: [
            {
              data: [
                data?.total ? data.total : 0,
                data?.completed ? data.completed : 0,
                data?.declined ? data.declined : 0,
              ],
              backgroundColor: ["#9C71F8", "#76C892", "#ED475F"],
            },
          ],
        }}
      />
    </Box>
  );
};
