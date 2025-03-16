"use client";
import { AdminManagersTable } from "@/widgets/AdminManagersTable";
import { AdminManagersTodaySummary } from "@/widgets/AdminManagersTodayStatistics";
import { AdminManagersWeekDashBoard } from "@/widgets/AdminManagersWeekDashboard/ui/AdminManagersWeekDashBoard";
import { Box, Card, Flex, Tabs, Title } from "@mantine/core";

import React from "react";

export default function Page() {
  return (
    <Box>
      <Tabs defaultValue="queue">
        <Tabs.List>
          <Tabs.Tab value="queue">Очередь</Tabs.Tab>
          <Tabs.Tab value="kpi">Менеджеры</Tabs.Tab>
        </Tabs.List>
        <Tabs.Panel value="queue">
          <Flex direction="column" gap={20}>
            <Box>
              <AdminManagersTodaySummary />
            </Box>
            <Box>
              <AdminManagersWeekDashBoard />
            </Box>
          </Flex>
        </Tabs.Panel>
        <Tabs.Panel value="kpi">
          <Box>
            <Title order={2}>Управление менеджерами</Title>
            <Card withBorder mt={20}>
              <AdminManagersTable />
            </Card>
          </Box>
        </Tabs.Panel>
      </Tabs>
    </Box>
  );
}
