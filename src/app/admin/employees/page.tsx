import { AdminManagersTodayStatistics } from "@/widgets/AdminManagersTodayStatistics";
import { AdminManagersWeekDashBoard } from "@/widgets/AdminManagersWeekDashboard/ui/AdminManagersWeekDashBoard";
import { Box, Flex } from "@mantine/core";

import React from "react";

export default function Page() {
  return (
    <Flex p={20} direction="column" h="100vh">
      <Box flex={2}>
        <AdminManagersWeekDashBoard />
      </Box>
      <Box flex={1}>
        <AdminManagersTodayStatistics />
      </Box>
    </Flex>
  );
}
