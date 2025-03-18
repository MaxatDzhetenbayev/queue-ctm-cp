"use client"
import { ManagerReceptions } from "@/widgets";
import { ManagersTodaySummary } from "@/widgets/AdminManagersTodayStatistics";
import { ManagersWeekDashBoard } from "@/widgets/AdminManagersWeekDashboard/ui/AdminManagersWeekDashBoard";
import { Box, Flex, Tabs } from "@mantine/core";

import React from "react";

export default function Page() {
  return (
    <Flex direction="column" h="100%" gap="lg">
      <Tabs defaultValue="receptions">
        <Tabs.List>
          <Tabs.Tab value="receptions">Записи</Tabs.Tab>
          <Tabs.Tab value="stats">Статистика</Tabs.Tab>
        </Tabs.List>
        <Tabs.Panel value="receptions">
          <ManagerReceptions />
        </Tabs.Panel>
        <Tabs.Panel value="stats">
          <Box>
            <Box flex={1}>
              <ManagersTodaySummary variant="manager" />
            </Box>
            <Box flex={2} h="100%">
              <ManagersWeekDashBoard variant="manager" />
            </Box>
          </Box>
        </Tabs.Panel>
      </Tabs>
    </Flex >
  );
}
