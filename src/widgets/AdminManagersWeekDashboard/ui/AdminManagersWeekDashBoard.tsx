"use client";
import React from "react";
import { Box, Flex } from "@mantine/core";
import { ManagersWeekCompleted } from "./ManagersWeekCompleted";
import { ManagersWeekStats } from "./ManagersWeekStats";

export const AdminManagersWeekDashBoard = () => {
  return (
    <Box component="section" h="100%">
      <Flex component="section" h="100%" gap="md">
        <Box flex={2}>
          <ManagersWeekCompleted />
        </Box>
        <Box flex={1}>
          <ManagersWeekStats />
        </Box>
      </Flex>
    </Box>
  );
};
