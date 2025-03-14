import { AdminManagersTable } from "@/widgets/AdminManagersTable";
import { AdminManagersTodayStatistics } from "@/widgets/AdminManagersTodayStatistics";
import { AdminManagersWeekDashBoard } from "@/widgets/AdminManagersWeekDashboard/ui/AdminManagersWeekDashBoard";
import { Box, Card, Flex, Title } from "@mantine/core";

import React from "react";

export default function Page() {
  return (
    <Flex direction="column" gap={20}>
      <Box>
        <AdminManagersTodayStatistics />
      </Box>
      <Box>
        <AdminManagersWeekDashBoard />
      </Box>
      <Box>
        <Title order={2}>Управление менеджерами</Title>
        <Card withBorder mt={20}>
          <AdminManagersTable />
        </Card>
      </Box>
    </Flex>
  );
}
