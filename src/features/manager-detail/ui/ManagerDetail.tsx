"use client";
import React from "react";
import { useManagerDetailCompleted, useManagerDetailStats } from "../hook";
import { Flex } from "@mantine/core";
import { ManagerWeekCompleted } from "./ManagerWeekCompleted";
import { ManagerWeekStats } from "./ManagerWeekStats";
import { ManagerTodayStatistics } from "./ManagerTodayStatistics";

export const ManagerDetail = ({ id }: { id: number }) => {
  const { data: weekCompletedData, isLoading: weekCompletedLoading } =
    useManagerDetailCompleted(id);
  const { data: weekStatsData, isLoading: weekStatsLoading } =
    useManagerDetailStats(id);

  return (
    <Flex direction="column" gap="lg">
      <Flex gap="lg">
        <ManagerWeekCompleted
          data={weekCompletedData}
          isLoading={weekCompletedLoading}
        />
        <ManagerWeekStats data={weekStatsData} isLoading={weekStatsLoading} />
        <ManagerTodayStatistics id={id} />
      </Flex>
    </Flex>
  );
};
