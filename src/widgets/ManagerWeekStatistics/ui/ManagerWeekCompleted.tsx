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
import { useManagerWeekStatics } from "../hooks";
import { Box, Skeleton, Title as MantineTitle } from "@mantine/core";

export const ManagerWeekCompleted = () => {
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

  const { data, isLoading } = useManagerWeekStatics();

  const labels: string[] = [];

  for (const item in data) {
    labels.push(item);
  }

  return isLoading ? (
    <Skeleton h="100%" />
  ) : (
    <Box>
      <MantineTitle order={3}>Статистики за неделю</MantineTitle>
      <Line
        style={{ height: "330px" }}
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
