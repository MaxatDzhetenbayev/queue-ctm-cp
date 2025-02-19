"use client";
import React from "react";
import { ManagerWeekStats } from "./ManagerWeekStats";
import { ManagerWeekCompleted } from "./ManagerWeekCompleted";
import { Box, Flex } from "@mantine/core";

export const ManagerWeekStatistics = () => {
  return (
    <Box component="section" h="100%">
      <Flex component="section" h="100%" gap="md">
        <Box flex={2}>
          <ManagerWeekCompleted />
        </Box>
        <Box flex={1}>
          <ManagerWeekStats />
        </Box>
      </Flex>
    </Box>
  );
};
