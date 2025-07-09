import { Box, Flex } from "@mantine/core";

import { useMediaQuery } from "@mantine/hooks";
import React from "react";
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  ArcElement,
  PointElement,
  LineElement,
} from "chart.js";
import { MainStatistics } from "./MainStatistics";
import { DoneClientsBar } from "./DoneClientsBar";
// import { SourcePieChart } from "./SourcePieChart";
import { ManagerAvgLoad } from "./ManagerAvgLoad";
import { ReceptionStatuses } from "./ReceptionStatuses";

ChartJS.register(
  BarElement,
  CategoryScale,
  LinearScale,
  ArcElement,
  PointElement,
  LineElement
);

export interface IDepartmentDashboardData {
  clientServedTotal: number;
  sourceTelegram: number;
  sourceOffline: number;
  avgServiceTime: string;
  avgLoad: string;
  barChart: {
    labels: string[];
    datasets: { label: string; data: number[]; backgroundColor: string }[];
  };
  pieChart: {
    labels: string[];
    datasets: { data: number[]; backgroundColor: string[] }[];
  };
  lineChart: {
    labels: string[];
    datasets: {
      label: string;
      data: number[];
      borderColor: string;
      fill: boolean;
    }[];
  };
}

export const PersonalControl = ({
  data,
}: {
  data: IDepartmentDashboardData;
}) => {
  const xl = useMediaQuery("(max-width: 1480px)");
  const lg = useMediaQuery("(max-width: 1200px)");

  return (
    <Box
      py={"md"}
      h={"70vh"}
      display={"grid"}
      style={{
        gridTemplateColumns: xl ? "1fr" : "repeat(12, 1fr)",
        gap: "20px",
      }}
    >
      <MainStatistics
        data={data}
        styles={{
          gridColumn: xl ? "span 1" : "span 2",
          gridRow: lg ? "span 1" : "span 2",
        }}
      />
      <Flex
        style={{
          gridColumn: xl ? "span 1" : "span 10",
        }}
        direction={{ base: "column", lg: "row" }}
        gap="md"
      >
        <DoneClientsBar barChart={data.barChart} />
        {/* <SourcePieChart pieChart={data.pieChart} /> */}
      </Flex>
      <Flex
        style={{
          gridColumn: xl ? "span 1" : "span 10",
        }}
        direction={{ base: "column", lg: "row" }}
        gap="md"
      >
        <ManagerAvgLoad lineChart={data.lineChart} />
        <ReceptionStatuses />
      </Flex>
    </Box>
  );
};
