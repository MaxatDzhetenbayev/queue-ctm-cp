"use client";
import React from "react";
import { useManagerTodaySummary } from "./hooks";
import {
  Card,
  Center,
  Flex,
  SimpleGrid,
  Skeleton,
  Text,
  Title,
} from "@mantine/core";

export const ManagerTodayStatistics = () => {
  const { data, isLoading } = useManagerTodaySummary();

  return isLoading ? (
    <Flex direction="column" h="100%" gap="lg">
      <Skeleton h={35} w={200} />
      <SimpleGrid cols={2} flex={1}>
        <Skeleton p={10} />
        <Skeleton p={10} />
        <Skeleton p={10} />
        <Skeleton p={10} />
      </SimpleGrid>
    </Flex>
  ) : (
    <Flex direction="column" h="100%" gap="lg">
      <Title order={2}>Дневная статистика</Title>
      <SimpleGrid cols={2} flex={1}>
        <Card p={10} shadow="md" bg="violet.4">
          <Center h="100%">
            <Flex direction="column" gap="sm">
              <Title order={3} style={{ textAlign: "center" }} c="#fff">
                Обслуженные клиенты
              </Title>
              <Text fz="h2" style={{ textAlign: "center" }} c="#fff">
                {data?.totalReceptions}
              </Text>
            </Flex>
          </Center>
        </Card>
        <Card p={10} shadow="md" bg="red.4">
          <Center h="100%">
            <Flex direction="column" gap="sm">
              <Title order={3} style={{ textAlign: "center" }} c="#fff">
                Доля проблемных записей
              </Title>
              <Text fz="h2" style={{ textAlign: "center" }} c="#fff">
                {data?.problematicRate}
              </Text>
            </Flex>
          </Center>
        </Card>
        <Card p={10} shadow="md" bg="green.4">
          <Center h="100%">
            <Flex direction="column" gap="sm">
              <Title order={3} style={{ textAlign: "center" }} c="#fff">
                Средний рейтинг удовлетворенности
              </Title>
              <Text fz="h2" style={{ textAlign: "center" }} c="#fff">
                {data?.averageRating}
              </Text>
            </Flex>
          </Center>
        </Card>
        <Card p={10} shadow="md" bg="blue.4">
          <Center h="100%">
            <Flex direction="column" gap="sm">
              <Title order={3} style={{ textAlign: "center" }} c="#fff">
                Средняя загруженность
              </Title>
              <Text fz="h2" style={{ textAlign: "center" }} c="#fff">
                {data?.managerLoad.toPrecision(2)}%
              </Text>
            </Flex>
          </Center>
        </Card>
      </SimpleGrid>
    </Flex>
  );
};
