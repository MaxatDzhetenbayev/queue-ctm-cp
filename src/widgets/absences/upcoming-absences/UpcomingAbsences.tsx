import React from "react";
import { Avatar, Flex, Paper, Pill, Stack, Text, Title } from "@mantine/core";
import { FaRegCalendarAlt } from "react-icons/fa";

export const UpcomingAbsences = () => {
  return (
    <Paper withBorder p={20} radius="md">
      <Title order={2}>Ближайшие отсутствия</Title>
      <Stack mt={20} gap={10}>
        <UpcomingAbsenceItem />
        <UpcomingAbsenceItem />
        <UpcomingAbsenceItem />
      </Stack>
    </Paper>
  );
};

const UpcomingAbsenceItem = () => {
  return (
    <Paper style={{ borderLeft: "2px solid blue" }} p={10} radius="md">
      <Flex align={"center"}>
        <Flex align={"center"} gap={10}>
          <Avatar name={"Максат Джетенбаев"} color="initials" />
          Максат Джетенбаев
        </Flex>
        <Pill ml="auto" color="blue">
          Отпуск
        </Pill>
      </Flex>
      <Flex mt={10} align="center" gap={10}>
        <FaRegCalendarAlt />
        <Text mt={4}>29.06.2025 - 12.07.2025</Text>
      </Flex>
    </Paper>
  );
};
