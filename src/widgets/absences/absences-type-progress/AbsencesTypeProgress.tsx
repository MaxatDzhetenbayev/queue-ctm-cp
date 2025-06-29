import { api } from "@/shared";
import { Box, Flex, Paper, Progress, Stack, Text, Title } from "@mantine/core";
import { useQuery } from "@tanstack/react-query";
import React from "react";
import { AbsenceType, getAbsenceTypeText } from "../absences-list/AbsencesList";

type AbsenceAnalytics = {
  HOLIDAY: number;
  SICK_LEAVE: number;
  PERSONAL: number;
};

export const AbsencesTypeProgress = () => {
  const { data } = useQuery<AbsenceAnalytics>({
    queryKey: ["absences-analytics-types"],
    queryFn: async () => (await api.get("leaves/center/analytics/types")).data,
  });

  return (
    <Paper withBorder p={20}>
      <Title order={3}>Статистика</Title>
      <Stack gap="md" mt={20}>
        {data ? (
          <>
            <AbsencesTypeItem
              type={AbsenceType.HOLIDAY}
              percentage={data.HOLIDAY}
            />
            <AbsencesTypeItem
              type={AbsenceType.SICK_LEAVE}
              percentage={data.SICK_LEAVE}
            />
            <AbsencesTypeItem
              type={AbsenceType.PERSONAL}
              percentage={data.PERSONAL}
            />
          </>
        ) : null}
      </Stack>
    </Paper>
  );
};

const AbsencesTypeItem = ({
  type,
  percentage,
}: {
  type: AbsenceType;
  percentage: number;
}) => {
  return (
    <Box>
      <Flex justify="space-between" align="center">
        <Text>{getAbsenceTypeText(type)}</Text>
        <Text c="dimmed">{percentage}%</Text>
      </Flex>
      <Progress value={percentage} color="blue" />
    </Box>
  );
};
