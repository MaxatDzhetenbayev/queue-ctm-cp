import { Card, Flex, SimpleGrid, Text, Title } from "@mantine/core";
import React from "react";
import { IManagerTodaySummary } from "../models";

export const ManagerTodaySummary = ({
  averageRating,
  completedReceptionsCount,
  managerLoad,
  problematicRate,
  isCenter = true,
}: IManagerTodaySummary & { isCenter?: boolean }) => {
  return (
    <Flex direction="column" gap="lg">
      <Title order={2}>Дневная статистика</Title>
      <SimpleGrid cols={4} flex={1}>
        <StatCard
          title="Обслуженные клиенты"
          span={isCenter ? "общее" : undefined}
          stat={completedReceptionsCount || "0"}
        />
        <StatCard
          title="Доля проблемных записей"
          span={isCenter ? "менеджер" : undefined}
          stat={problematicRate || "0"}
        />
        <StatCard
          title="Средний рейтинг удовлетворенности"
          span={isCenter ? "менеджер" : undefined}
          stat={averageRating || "0.0"}
        />
        <StatCard
          title="Средняя загруженность"
          span={isCenter ? "менеджер" : undefined}
          stat={`${managerLoad || "0.0"}%`}
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
  span: string | undefined;
}) => {
  return (
    <Card radius="md" withBorder>
      <Flex direction="column" h="100%" justify="space-between" gap="md">
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
          {span && (
            <Text component="span" fz={"sm"} fw="lighter">
              / {span}
            </Text>
          )}
        </Text>
      </Flex>
    </Card>
  );
};
