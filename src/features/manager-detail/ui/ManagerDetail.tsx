"use client";
import React from "react";
import { useManagerDetailCompleted, useManagerDetailStats } from "../hook";
import { Box, Flex, Modal } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { ManagerWeekCompleted } from "./ManagerWeekCompleted";
// import { ManagerWeekStats } from "./ManagerWeekStats";
import { ManagerTodayStatistics } from "./ManagerTodayStatistics";

export const ManagerDetailModal = ({ id, children, }: {
  id: number, children: React.ReactNode, manager: {
    full_name: string;
    iin: string;
    phone: string;
  }
}) => {
  const { data: weekCompletedData, isLoading: weekCompletedLoading } =
    useManagerDetailCompleted(id);
  // const { data: weekStatsData, isLoading: weekStatsLoading } =
  useManagerDetailStats(id);
  const [opened, { open, close }] = useDisclosure(false)

  return (
    <>
      <Modal size="60%" opened={opened} onClose={close} >
        <Flex gap={20} direction="column" >

          <ManagerTodayStatistics id={id} />
          <ManagerWeekCompleted
            data={weekCompletedData}
            isLoading={weekCompletedLoading}
          />
          {/* <ManagerWeekStats data={weekStatsData} isLoading={weekStatsLoading} /> */}
        </Flex>
      </Modal>
      <Box onClick={open} w="100%" style={{ cursor: "pointer" }} >
        {children}
      </Box>
    </>
  );
};
