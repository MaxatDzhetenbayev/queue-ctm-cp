"use client";
import React from "react";
import { useManagerDetailToday } from "../hook/index";
import {
  Card,
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
    <Flex direction="column" gap="lg">
      <Title order={2}>Дневная статистика</Title>
      <SimpleGrid cols={4} flex={1}>
        <StatCard
          title="Обслуженные клиенты"
          span="общее"
          stat={data?.totalReceptions}
        />
        <StatCard
          title="Доля проблемных записей"
          span="менеджер"
          stat={data?.problematicRate}
        />
        <StatCard
          title="Средний рейтинг удовлетворенности"
          span="менеджер"
          stat={data?.averageRating}
        />
        <StatCard
          title="Средняя загруженность"
          span="менеджер"
          stat={Number(data?.managerLoad.toPrecision(2))}
        />
      </SimpleGrid>
    </Flex>
  );
};

const StatCard = ({
  title,
  span,
  stat,
}: {
  title: string;
  stat: number | undefined;
  span: string;
}) => {
  return (
    <Card radius="md" withBorder>
      <Flex direction="column" h="100%" justify="space-between" gap="sm">
        <Title fz={"md"} fw="normal">
          {title}
        </Title>
        <Text
          fz={"h2"}
          style={{
            lineHeight: 0,
          }}
          fw="bold"
        >
          {stat}{" "}
          <Text component="span" fz={"sm"} fw="lighter">
            / {span}
          </Text>
        </Text>
      </Flex>
    </Card>
  );
};
