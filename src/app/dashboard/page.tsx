import { ManagerReceptions } from "@/widgets";
import { ManagerTodayStatistics } from "@/widgets/ManagerTodayStatistics";
import { ManagerWeekStatistics } from "@/widgets/ManagerWeekStatistics";
import { Box, Flex } from "@mantine/core";

import React from "react";

export default function Page() {
  return (
    <Flex direction="column" h="100%" gap="lg">
      <Box flex={1} style={{ overflowY: "auto", scrollbarWidth: "none" }}>
        <ManagerReceptions />
      </Box>
      <Flex flex={1} h="100%" gap={16}>
        <Box flex={2} h="100%">
          <ManagerWeekStatistics />
        </Box>
        <Box flex={1}>
          <ManagerTodayStatistics />
        </Box>
      </Flex>
    </Flex>
  );
}
