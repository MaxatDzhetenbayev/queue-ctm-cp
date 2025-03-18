"use client";
import React from "react";
import { Box, Card, Flex, Modal, SimpleGrid, Skeleton, Text, Title as MantineTitle, Tabs } from "@mantine/core";
import { IManager } from "@/widgets/AdminManagersTable/hooks";
import { ManagerChange } from "@/features/manager-change";
import { ManagerDestroy } from "@/features/manager-destroy";
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
import { IReception, ManagerTodaySummary, useManagerTodaySummaryOne, useManagerWeekdayCompletedReceptionsByOne } from "@/entities";
import { useDisclosure } from "@mantine/hooks";
import { useQuery } from "@tanstack/react-query";
import { api } from "@/shared";
import { ReceptionDetail } from "@/features/reception-detail";

export const ManagerDetailModal = ({ full_name, id }: IManager) => {

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
        <Tabs defaultValue="info">
          <Tabs.List>
            <Tabs.Tab value="info">Общая информация</Tabs.Tab>
            <Tabs.Tab value="stats">Статистика</Tabs.Tab>
            <Tabs.Tab value="receptions">Записи</Tabs.Tab>
          </Tabs.List>
          <Tabs.Panel value="info">
            <Flex direction="column" gap={10}>
              <ManagerChange id={id} />
              <ManagerDestroy id={id} />
            </Flex>
          </Tabs.Panel>
          <Tabs.Panel value="stats">
            <ManagerTodaySummaryForModal id={id} />
            <ManagerWeekDayStatsForModal id={id} />
          </Tabs.Panel>
          <Tabs.Panel value="receptions">
            <ManagerReceptions id={id} />
          </Tabs.Panel>
        </Tabs>
      </Modal>
    </>
  );
};


const ManagerReceptions = ({ id }: { id: number }) => {

  const { data: managerReceptions, isLoading } = useQuery({
    queryKey: ['manager-receptions-by-id', id],
    queryFn: async () => {
      const res = await api.get(`/receptions/managers/${id}`)
      return res.data
    }
  })

  console.log(managerReceptions)
  return (
    <Box>
      {
        isLoading ? (
          <div></div>
        ) : (
          <Flex mt={20} direction="column" gap={10}>
            {managerReceptions.map((reception: IReception) => (
              <Card withBorder key={reception.id} w="100%">
                <Flex justify="space-between" align="center">
                  <Flex direction="column" gap={20}>
                    <Text>
                      <strong>ФИО:</strong> {reception?.user?.profile.full_name}
                    </Text>
                    <Flex gap={20}>
                      <Text>
                        <strong>Дата:</strong> {reception?.date}
                      </Text>
                      <Text>
                        <strong>Время:</strong> {reception?.time}
                      </Text>
                    </Flex>
                  </Flex>

                  <ReceptionDetail id={reception.id} />
                </Flex>
              </Card>
            ))}
          </Flex>
        )
      }
    </Box >
  )
}



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
