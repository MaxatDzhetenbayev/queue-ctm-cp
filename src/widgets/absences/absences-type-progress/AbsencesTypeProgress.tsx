import { Box, Flex, Paper, Progress, Stack, Text, Title } from "@mantine/core";
import React from "react";

export const AbsencesTypeProgress = () => {
  return (
    <Paper withBorder p={20}>
      <Title order={3}>Статистика</Title>
      <Stack gap="md" mt={20}>
        <AbsencesTypeItem />
        <AbsencesTypeItem />
        <AbsencesTypeItem />
        <AbsencesTypeItem />
      </Stack>
    </Paper>
  );
};

const AbsencesTypeItem = () => {
  return (
    <Box>
      <Flex justify="space-between" align="center">
        <Text>Отпуск</Text>
        <Text c="dimmed">50%</Text>
      </Flex>
      <Progress value={50} color="blue" />
    </Box>
  );
};
