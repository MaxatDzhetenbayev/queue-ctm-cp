"use client";
import React from "react";
import {
  useManagerDetail,
  useManagerDetailCompleted,
  useManagerDetailStats,
} from "../hook";
import { Box, Button, Flex, Modal, Text } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { ManagerWeekCompleted } from "./ManagerWeekCompleted";
import { ManagerWeekStats } from "./ManagerWeekStats";

export const ManagerDetail = ({ id }: { id: number }) => {
  const { data, isLoading } = useManagerDetail(id);
  const { data: weekCompletedData, isLoading: weekCompletedLoading } =
    useManagerDetailCompleted(id);
  const { data: weekStatsData, isLoading: weekStatsLoading } =
    useManagerDetailStats(id);

  const [opened, { open, close }] = useDisclosure(false);

  return (
    <>
      <Modal opened={opened} onClose={close}>
        {isLoading ? (
          <Box>Загрузка...</Box>
        ) : (
          <Flex direction="column" gap="lg">
            <Box></Box>
            <Text>ФИО: {data?.profile?.full_name}</Text>
            <Text>ИИН: {data?.profile?.iin}</Text>
            <Text>Телефон: {data?.profile?.phone}</Text>
            <Flex gap="lg">
              <ManagerWeekCompleted
                data={weekCompletedData}
                isLoading={weekCompletedLoading}
              />
              <ManagerWeekStats
                data={weekStatsData}
                isLoading={weekStatsLoading}
              />
            </Flex>
          </Flex>
        )}
      </Modal>
      <Button onClick={open}>Детальнее</Button>
    </>
  );
};
