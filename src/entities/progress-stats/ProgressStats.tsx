import React from "react";
import { ProgressBar, ProgressType } from "@/shared/ui";
import { Paper, Stack, Title } from "@mantine/core";

export interface ProgressStatsProps {
  title: string;
  data: {
    title: string;
    value: number;
  }[];
  type: ProgressType;
}

export const ProgressStats = ({ data, type, title }: ProgressStatsProps) => {
  return (
    <Paper withBorder p={20} style={{ overflow: "hidden" }} h={320}>
      <Title order={3}>{title}</Title>
      <Stack gap="md" mt={20} style={{ height: "100%", overflowY: "auto" }}>
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
