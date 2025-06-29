import React from "react";
import { Avatar, Flex, Paper, Pill, Stack, Text, Title } from "@mantine/core";
import { FaRegCalendarAlt } from "react-icons/fa";
import {
  Absence,
  AbsenceResponse,
  getAbsenceTypeText,
} from "../absences-list/AbsencesList";
import { useQuery } from "@tanstack/react-query";
import { api } from "@/shared";

export const UpcomingAbsences = () => {
  const { data } = useQuery<AbsenceResponse>({
    queryKey: ["absences-upcoming"],
    queryFn: async () =>
      (
        await api.get("leaves/center", {
          params: {
            limit: 3,
            sort: "asc",
            upcoming: true,
          },
        })
      ).data,
  });

  return (
    <Paper withBorder p={20} radius="md">
      <Title order={3}>Ближайшие отсутствия</Title>
      <Stack mt={20} gap={10}>
        {data?.data?.map((item) => (
          <UpcomingAbsenceItem key={item.id} {...item} />
        ))}
      </Stack>
    </Paper>
  );
};

const UpcomingAbsenceItem = (data: Absence) => {
  return (
    <Paper style={{ borderLeft: "2px solid blue" }} p={10} radius="md">
      <Flex align={"center"}>
        <Flex align={"center"} gap={10}>
          <Avatar name={data.employeeName} color="initials" />
          {data.employeeName}
        </Flex>
        <Pill ml="auto" color="blue">
          {getAbsenceTypeText(data.type)}
        </Pill>
      </Flex>
      <Flex mt={10} align="center" gap={10}>
        <FaRegCalendarAlt />
        <Text c="dimmed" mt={4}>
          {new Date(data?.startDate).toLocaleDateString("ru-RU")} -{" "}
          {new Date(data?.endDate).toLocaleDateString("ru-RU")}
        </Text>
      </Flex>
    </Paper>
  );
};
