"use client";
import React from "react";
import { Flex, SimpleGrid, Skeleton } from "@mantine/core";
import { ManagerTodaySummary } from "@/entities";
import { useManagerTodaySummaryByCenter } from "@/entities/kpi/api";

export const AdminManagersTodaySummary = () => {
  const { data, isLoading, isSuccess } = useManagerTodaySummaryByCenter({});

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
    isSuccess && <ManagerTodaySummary {...data} />
  );
};
