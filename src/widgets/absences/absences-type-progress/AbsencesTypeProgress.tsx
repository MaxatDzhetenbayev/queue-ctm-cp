import { Box, Flex, Progress, Stack, Text, Title } from "@mantine/core";
import React from "react";

export const AbsencesTypeProgress = () => {
  return (
    <Box component="section">
      <Title order={2}>Статистика</Title>
      <Stack gap="md" mt={20}>
        <Box>
          <Flex justify="space-between" align="center">
            <Text>Отпуск</Text>
            <Text>50%</Text>
          </Flex>
          <Progress value={50} color="blue" />
        </Box>
        <Box>
          <Flex justify="space-between" align="center">
            <Text>Отпуск</Text>
            <Text>50%</Text>
          </Flex>
          <Progress value={50} color="blue" />
        </Box>
        <Box>
          <Flex justify="space-between" align="center">
            <Text>Отпуск</Text>
            <Text>50%</Text>
          </Flex>
          <Progress value={50} color="blue" />
        </Box>
        <Box>
          <Flex justify="space-between" align="center">
            <Text>Отпуск</Text>
            <Text>50%</Text>
          </Flex>
          <Progress value={50} color="blue" />
        </Box>
      </Stack>
    </Box>
  );
};
