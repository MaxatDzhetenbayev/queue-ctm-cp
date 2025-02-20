"use client";
import React from "react";
import { useManagerDetailToday } from "../hook/index";
import {
  Card,
  Center,
  Flex,
  SimpleGrid,
  Skeleton,
  Text,
  Title,
} from "@mantine/core";

export const ManagerTodayStatistics = ({ id }: { id: number }) => {
  const { data, isLoading } = useManagerDetailToday(id);

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
        <Card p={10} radius="md" bg="#F3E8FF">
          <Center h="100%">
            <Flex direction="column" gap="sm">
              <Title fz={"lg"} fw="normal" style={{ textAlign: "center" }}>
                Обслуженные клиенты
              </Title>
              <Text fz={"h1"} fw="bold" style={{ textAlign: "center" }}>
                {data?.totalReceptions}
              </Text>
            </Flex>
          </Center>
        </Card>
        <Card p={10} radius="md" bg="#FEF2F2">
          <Center h="100%">
            <Flex direction="column" gap="sm">
              <Title fz={"lg"} fw="normal" style={{ textAlign: "center" }}>
                Доля проблемных записей
              </Title>
              <Text fz={"h1"} fw="bold" style={{ textAlign: "center" }}>
                {data?.problematicRate}
              </Text>
            </Flex>
          </Center>
        </Card>
        <Card p={10} radius="md" bg="#F0FDF4">
          <Center h="100%">
            <Flex direction="column" gap="sm">
              <Title fz={"lg"} fw="normal" style={{ textAlign: "center" }}>
                Средний рейтинг удовлетворенности
              </Title>
              <Text fz={"h1"} fw="bold" style={{ textAlign: "center" }}>
                {data?.averageRating}
              </Text>
            </Flex>
          </Center>
        </Card>
        <Card p={10} radius="md" bg="#EFF6FF">
          <Center h="100%">
            <Flex direction="column" gap="sm">
              <Title fz={"lg"} fw="normal" style={{ textAlign: "center" }}>
                Средняя загруженность
              </Title>
              <Text fz={"h1"} fw="bold" style={{ textAlign: "center" }}>
                {data?.managerLoad.toPrecision(2)}%
              </Text>
            </Flex>
          </Center>
        </Card>
      </SimpleGrid>
    </Flex>
  );
};
