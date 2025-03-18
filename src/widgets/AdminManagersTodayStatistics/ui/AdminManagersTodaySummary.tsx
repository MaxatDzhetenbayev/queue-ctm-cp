"use client";
import React from "react";
import { Flex, SimpleGrid, Skeleton } from "@mantine/core";
import { ManagerTodaySummary } from "@/entities";
import { useManagerTodaySummary } from "@/entities/kpi/api";

export const ManagersTodaySummary = ({ id, variant = "manager" }: { id?: number, variant?: "manager" | "center" }) => {
  const { data, isLoading, isSuccess } = useManagerTodaySummary({ id, variant });

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
