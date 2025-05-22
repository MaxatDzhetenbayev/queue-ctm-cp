"use client";
import { PersonalControl } from "@/widgets";
import { ManagersTodaySummary } from "@/widgets/AdminManagersTodayStatistics";
import { ManagersWeekDashBoard } from "@/widgets/AdminManagersWeekDashboard/ui/AdminManagersWeekDashBoard";
import { Box, Card, Flex, Tabs, Title } from "@mantine/core";

import React from "react";

export default function Page() {
  return (
    <Box>
      <Tabs defaultValue="stats">
        <Tabs.List>
          <Tabs.Tab value="stats">Статистика</Tabs.Tab>
          <Tabs.Tab value="controls">Управление</Tabs.Tab>
        </Tabs.List>
        <Tabs.Panel value="stats">
          <Flex direction="column" gap={20}>
            <Box>
              <ManagersTodaySummary variant="center" />
            </Box>
            <Box>
              <ManagersWeekDashBoard variant="center" />
            </Box>
          </Flex>
        </Tabs.Panel>
        <Tabs.Panel value="controls">
          <Box>
            <Title order={2}>Управление персоналом</Title>
            <Card withBorder mt={20}>
              <PersonalControl />
            </Card>
          </Box>
        </Tabs.Panel>
      </Tabs>
    </Box>
  );
}
