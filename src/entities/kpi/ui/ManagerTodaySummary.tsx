import { Card, Flex, SimpleGrid, Text, Title } from "@mantine/core";
import React from "react";
import { IManagerTodaySummary } from "../models";

export const ManagerTodaySummary = ({
  averageRating,
  completedReceptionsCount,
  managerLoad,
  problematicRate,
}: IManagerTodaySummary) => {
  return (
    <Flex direction="column" gap="lg">
      <Title order={2}>Дневная статистика</Title>
      <SimpleGrid cols={4} flex={1}>
        <StatCard
          title="Обслуженные клиенты"
          span="общее"
          stat={completedReceptionsCount}
        />
        <StatCard
          title="Доля проблемных записей"
          span="менеджер"
          stat={problematicRate}
        />
        <StatCard
          title="Средний рейтинг удовлетворенности"
          span="менеджер"
          stat={averageRating}
        />
        <StatCard
          title="Средняя загруженность"
          span="менеджер"
          stat={`${managerLoad}%`}
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
  stat: string | undefined;
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
