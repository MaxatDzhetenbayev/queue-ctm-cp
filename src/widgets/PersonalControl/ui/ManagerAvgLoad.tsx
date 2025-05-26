import React from "react";
import { Flex, Paper } from "@mantine/core";
import { Line } from "react-chartjs-2";
import { IDepartmentDashboardData } from "./PersonalControl";

export const ManagerAvgLoad = ({
  lineChart,
}: {
  lineChart: IDepartmentDashboardData["lineChart"];
}) => {
  return (
    <Paper
      flex={1}
      h={"100%"}
      withBorder
      radius="md"
      p={{ base: "xs", sm: "sm" }}
    >
      <Flex flex={1} h={"100%"} justify="center" align="center">
        <Line data={lineChart} />
      </Flex>
    </Paper>
  );
};
