"use client";
import React from "react";
import { Box, Card, Flex, Modal, Text, Tabs } from "@mantine/core";
import { IManager } from "@/widgets/AdminManagersTable/hooks";
import { ManagerChange } from "@/features/manager-change";
import { ManagerDestroy } from "@/features/manager-destroy";
import { IReception, } from "@/entities";
import { useDisclosure } from "@mantine/hooks";
import { useQuery } from "@tanstack/react-query";
import { api } from "@/shared";
import { ReceptionDetail } from "@/features/reception-detail";
import { ManagersTodaySummary } from "@/widgets/AdminManagersTodayStatistics";
import { ManagersWeekDashBoard } from "@/widgets/AdminManagersWeekDashboard/ui/AdminManagersWeekDashBoard";

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
            <ManagersTodaySummary id={id} variant="manager" />
            <ManagersWeekDashBoard id={id} variant="manager" />
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