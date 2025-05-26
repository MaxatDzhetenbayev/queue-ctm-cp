import React from "react";
import { Flex, Paper } from "@mantine/core";
import { Pie } from "react-chartjs-2";
import { IDepartmentDashboardData } from "./PersonalControl";

export const SourcePieChart = ({
  pieChart,
}: {
  pieChart: IDepartmentDashboardData["pieChart"];
}) => {
  return (
    <Paper
      flex={1}
      withBorder
      mah={"330px"}
      radius="md"
      p={{ base: "xs", sm: "sm" }}
    >
      <Flex flex={1} h={"100%"} justify="center" align="center">
        <Pie data={pieChart} />
      </Flex>
    </Paper>
  );
};
