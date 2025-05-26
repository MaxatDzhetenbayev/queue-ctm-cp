import { Flex, Paper, Text, Title } from "@mantine/core";
import React from "react";
import { IDepartmentDashboardData } from "./PersonalControl";

export const MainStatistics = ({
  data,
  styles,
}: {
  data: IDepartmentDashboardData;
  styles: React.CSSProperties;
}) => {
  return (
    <Flex style={styles} direction="column" gap="md">
      <Paper flex={1} withBorder radius="md" p="sm">
        <Flex h={"100%"} direction="column" justify={"space-between"}>
          <Text size="sm" color="dimmed">
            Всего обслуженных клиентов
          </Text>
          <Title order={2}>{data.clientServedTotal}</Title>
          <Text size="xs" color="dimmed">
            за сегодня
          </Text>
        </Flex>
      </Paper>
      <Paper flex={1} withBorder radius="md" p="sm">
        <Flex h={"100%"} direction="column" justify={"space-between"}>
          <Text size="sm" color="dimmed">
            Источник
          </Text>
          <Title order={2}>
            {data.sourceOffline} / {data.sourceTelegram}
          </Title>
          <Text size="xs" color="dimmed">
            за сегодня
          </Text>
        </Flex>
      </Paper>
      <Paper flex={1} withBorder radius="md" p="sm">
        <Flex h={"100%"} direction="column" justify={"space-between"}>
          <Text size="sm" color="dimmed">
            Среднее время обслуживания
          </Text>
          <Title order={2}>{data.avgServiceTime}</Title>
          <Text size="xs" color="dimmed">
            за сегодня
          </Text>
        </Flex>
      </Paper>
      <Paper flex={1} withBorder radius="md" p="sm">
        <Flex h={"100%"} direction="column" justify={"space-between"}>
          <Text size="sm" color="dimmed">
            Средняя загруженность
          </Text>
          <Title order={2}>{data.avgLoad}</Title>
          <Text size="xs" color="dimmed">
            за сегодня
          </Text>
        </Flex>
      </Paper>
    </Flex>
  );
};
