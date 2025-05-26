import { Box, Flex, Paper, Text, Title } from "@mantine/core";
import React from "react";

export const ReceptionStatuses = () => {
  return (
    <Box
      flex={1}
      display="grid"
      style={{
        gap: "20px",
        gridTemplateColumns: "repeat(2, 1fr)",
        gridTemplateRows: "repeat(2, 1fr)",
      }}
    >
      <Paper flex={1} withBorder radius="md" p="sm">
        <Flex h={"100%"} direction="column" justify={"space-between"}>
          <Text size="sm" color="dimmed">
            В ожидании
          </Text>
          <Title order={2}>16</Title>
          <Text size="xs" color="dimmed">
            за сегодня
          </Text>
        </Flex>
      </Paper>
      <Paper flex={1} withBorder radius="md" p="sm">
        <Flex h={"100%"} direction="column" justify={"space-between"}>
          <Text size="sm" color="dimmed">
            В работе
          </Text>
          <Title order={2}>8</Title>
          <Text size="xs" color="dimmed">
            за сегодня
          </Text>
        </Flex>
      </Paper>
      <Paper flex={1} withBorder radius="md" p="sm">
        <Flex h={"100%"} direction="column" justify={"space-between"}>
          <Text size="sm" color="dimmed">
            Завершено
          </Text>
          <Title order={2}>16</Title>
          <Text size="xs" color="dimmed">
            за сегодня
          </Text>
        </Flex>
      </Paper>
      <Paper flex={1} withBorder radius="md" p="sm">
        <Flex h={"100%"} direction="column" justify={"space-between"}>
          <Text size="sm" color="dimmed">
            Отменено
          </Text>
          <Title order={2}>14</Title>
          <Text size="xs" color="dimmed">
            за сегодня
          </Text>
        </Flex>
      </Paper>
    </Box>
  );
};
