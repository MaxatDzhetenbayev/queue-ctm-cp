import React from "react";
import { ProgressBar, ProgressType } from "@/shared/ui";
import { Paper, Stack, Title } from "@mantine/core";

interface ProgressStatsProps {
  title: string;
  data: {
    title: string;
    value: number;
  }[];
  type: ProgressType;
}

export const ProgressStats = ({ data, type, title }: ProgressStatsProps) => {
  return (
    <Paper withBorder p={20}>
      <Title order={3}>{title}</Title>
      <Stack gap="md" mt={20}>
        {data.map((item, index) => (
          <ProgressBar
            key={index}
            title={item.title}
            value={item.value}
            type={type}
          />
        ))}
      </Stack>
    </Paper>
  );
};
