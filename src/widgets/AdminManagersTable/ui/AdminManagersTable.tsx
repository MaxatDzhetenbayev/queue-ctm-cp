"use client";

import {
  Box,
  Card,
  Flex,
  Input,
  Modal,
  Pagination,
  SimpleGrid,
  Skeleton,
  Text,
  Title as MantineTitle,
} from "@mantine/core";
import React, { useState, useEffect } from "react";
import { IManager, useManagersList } from "../hooks";
import { useDisclosure } from "@mantine/hooks";
import {
  ManagerTodaySummary,
  useManagerTodaySummaryOne,
  useManagerWeekdayCompletedReceptionsByOne,
} from "@/entities";
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
import { ManagerChange, ManagerCreate, ManagerDestroy } from "@/features";

export const AdminManagersTable = () => {
  const [fullName, setFullName] = useState<string>("");
  const [page, setPage] = useState(1);

  useEffect(() => {
    setPage(1);
  }, [fullName]);

  const { data, isLoading } = useManagersList({ page, search: fullName });

  const managers = data?.managers ?? [];
  const totalPages = data?.totalPages ?? 1;

  return (
    <Flex direction="column" gap={20}>
      <Flex w="100%" gap={20} >
        <Box flex={1}>
          <Input
            placeholder="Поиск по ФИО менеджера"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
          />
        </Box>
        <ManagerCreate />
      </Flex>
      <Box w="100%">
        {isLoading ? (
          <Box mih={593}>
            <Skeleton h={35} w={150} />
            {Array.from({ length: 8 }).map((_, i) => (
              <Skeleton key={i} mt={5} h={59} w="100%" />
            ))}
          </Box>
        ) : (
          <Flex
            direction="column"
            justify="space-between"
            w="100%"
            gap={10}
            mih={593}
          >
            <Flex direction="column" gap={10}>
              {managers.length > 0 ? (
                managers.map((manager: IManager) => (
                  <ManagerCard key={manager.id} {...manager} />
                ))
              ) : (
                <Text>Менеджеры не найдены</Text>
              )}
            </Flex>
            <Pagination total={totalPages} value={page} onChange={setPage} />
          </Flex>
        )}
      </Box>
    </Flex>
  );
};

const ManagerCard = ({ full_name, id }: IManager) => {
  const [opened, { open, close }] = useDisclosure(false);

  return (
    <>
      <Card
        key={id}
        withBorder
        w="100%"
        style={{ cursor: "pointer" }}
        onClick={() => {
          open();
        }}
      >
        <Box>
          <Text>{full_name}</Text>
        </Box>
      </Card>
      <Modal opened={opened} onClose={close} size="70%">
        <Flex direction="column" gap={10}>
          <ManagerChange id={id} />
          <ManagerDestroy id={id} />
        </Flex>
        <ManagerTodaySummaryForModal id={id} />
        <ManagerWeekDayStatsForModal id={id} />
      </Modal>
    </>
  );
};

const ManagerTodaySummaryForModal = ({ id }: { id: number }) => {
  const { data, isLoading, isSuccess } = useManagerTodaySummaryOne({ id });

  return isLoading ? (
    <Flex direction="column" h="100%" gap="lg">
      <Skeleton h={35} w={200} />
      <SimpleGrid cols={4} flex={1}>
        <Skeleton p={10} />
        <Skeleton p={10} />
        <Skeleton p={10} />
        <Skeleton p={10} />
      </SimpleGrid>
    </Flex>
  ) : (
    isSuccess && <ManagerTodaySummary isCenter={false} {...data} />
  );
};

const ManagerWeekDayStatsForModal = ({ id }: { id: number }) => {
  ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
  );
  const { data, isLoading } = useManagerWeekdayCompletedReceptionsByOne({ id });

  const labels: string[] = [];

  for (const item in data) {
    labels.push(item);
  }

  return isLoading ? (
    <Skeleton h="280px" w="100%" />
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
