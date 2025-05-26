import { Flex, Paper } from "@mantine/core";
import React from "react";
import { Bar } from "react-chartjs-2";
import { IDepartmentDashboardData } from "./PersonalControl";

export const DoneClientsBar = ({
  barChart,
}: {
  barChart: IDepartmentDashboardData["barChart"];
}) => {
  return (
    <Paper
      flex={1}
      withBorder
      mah={{ base: "100%", sm: "300px" }}
      radius="md"
      p={{ base: "xs", sm: "sm" }}
    >
      <Flex flex={1} h={"100%"} justify="center" align="center">
        <Bar data={barChart} />
      </Flex>
    </Paper>
  );
};
