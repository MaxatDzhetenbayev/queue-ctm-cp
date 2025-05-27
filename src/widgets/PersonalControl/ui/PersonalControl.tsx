import {
  Box,
  Button,
  Card,
  Flex,
  Grid,
  Group,
  Modal,
  Tabs,
  Text,
  Title,
  useMantineTheme,
} from "@mantine/core";

import { useDisclosure, useMediaQuery } from "@mantine/hooks";
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
import { AdminManagersTable } from "@/widgets/AdminManagersTable";
import { MainStatistics } from "./MainStatistics";
import { DoneClientsBar } from "./DoneClientsBar";
// import { SourcePieChart } from "./SourcePieChart";
import { ManagerAvgLoad } from "./ManagerAvgLoad";
import { ReceptionStatuses } from "./ReceptionStatuses";

const mockData: IDepartment[] = [
  {
    id: "1",
    name: { ru: "Отдел по работе с соискателями", en: "Sales Department" },
    employeesСount: 10,
    onlineEmployeesCount: 8,
    clientServedCount: 100,
    telegramClient: 50,
    offlineClient: 50,
    avgServiceTime: "5 мин",
    avgLoadTime: "2 мин",
  },
  {
    id: "2",
    name: { ru: "Отдел по работе с работодателями", en: "Support Department" },
    employeesСount: 5,
    onlineEmployeesCount: 4,
    clientServedCount: 200,
    telegramClient: 100,
    offlineClient: 100,
    avgServiceTime: "10 мин",
    avgLoadTime: "3 мин",
  },
];

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

const DepartmentDashboard = () => {
  const theme = useMantineTheme();

  const data: IDepartmentDashboardData = {
    clientServedTotal: 20,
    sourceTelegram: 10,
    sourceOffline: 20,
    avgServiceTime: "8:16",
    avgLoad: "40%",
    barChart: {
      labels: ["Пн", "Вт", "Ср", "Чт", "Пт"],
      datasets: [
        {
          label: "Клиенты",
          data: [3, 5, 2, 6, 4],
          backgroundColor: theme.colors.dark[6],
        },
      ],
    },
    pieChart: {
      labels: ["Telegram", "Оффлайн"],
      datasets: [
        {
          data: [10, 20],
          backgroundColor: [theme.colors.cyan[6], theme.colors.dark[6]],
        },
      ],
    },
    lineChart: {
      labels: ["9:00", "10:00", "11:00", "12:00", "13:00", "14:00"],
      datasets: [
        {
          label: "Загруженность",
          data: [20, 35, 40, 60, 50, 40],
          borderColor: theme.colors.dark[6],
          fill: false,
        },
      ],
    },
  };

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
