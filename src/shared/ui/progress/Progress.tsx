import React from "react";
import { Box, Flex, Progress, Text } from "@mantine/core";

interface ProgressProps {
  title: string;
  value: number;
  type: ProgressType;
}

export enum ProgressType {
  NUMBER = "number",
  PERCENTAGE = "percentage",
}

export const ProgressBar = ({ title, value, type }: ProgressProps) => {
  return (
    <Box>
      <Flex justify="space-between" align="center">
        <Text>{title}</Text>
        <Text c="dimmed">
          {type === ProgressType.PERCENTAGE ? `${value}%` : value}
        </Text>
      </Flex>
      <Progress value={value} color="blue" />
    </Box>
  );
};
