"use client";

import { ProgressStats } from "@/entities";
import { ProgressType } from "@/shared";
import {
  AnalyticsReceptionStatuses,
  AnalyticsServiceTypes,
  AnaliticsActivityStats,
} from "@/widgets";
import { Box, Grid } from "@mantine/core";
import React from "react";

export default function Page() {
  return (
    <Box>
      <Grid columns={12} gutter={"lg"}>
        <Grid.Col span={6}>
          <AnaliticsActivityStats />
        </Grid.Col>
        <Grid.Col span={6}>
          <AnalyticsServiceTypes />
        </Grid.Col>
        <Grid.Col span={6}>
          <AnalyticsReceptionStatuses />
        </Grid.Col>
        <Grid.Col span={6}>
          <ProgressStats
            title="Нагрузка на отделы"
            type={ProgressType.PERCENTAGE}
            data={[
              { title: "Отдел трудоустройства", value: 20 },
              { title: "Отдел молодежной политики", value: 30 },
              { title: "Отдел социальных услуг", value: 10 },
              { title: "Отдел по работе с пожилыми", value: 10 },
              { title: "Отдел по работе с молодежью", value: 10 },
            ]}
          />
        </Grid.Col>
        {/* <Grid.Col span={4}>
				<Paper withBorder p={20} h={320}>
					<Title order={3}>Воронка заявок</Title>
					<Bar
						height={200}
						data={{
							labels: [
								"В ожидании",
								"В обработке",
								"Завершенные",
								"Отмененные",
								"Не явился",
							],
							datasets: [
								{
									label: "Количество заявок",
									data: [50, 30, 20, 10, 5],
									backgroundColor: theme.colors.blue[6],
								},
							],
						}}
						options={{
							indexAxis: "y",
							responsive: true,
							plugins: {
								legend: {
									position: "bottom",
									labels: {
										color: theme.colors.dark[3],
									},
								},
							},
						}}
					/>
				</Paper>
			</Grid.Col> */}
        {/* <Grid.Col span={12}>
				<UpcomingAbsences />
			</Grid.Col> */}
      </Grid>
    </Box>
  );
}

// <Tabs defaultValue="controls">
//         <Tabs.List>
//           <Tabs.Tab value="stats">Статистика</Tabs.Tab>
//           <Tabs.Tab value="controls">Управление</Tabs.Tab>
//         </Tabs.List>
//         <Tabs.Panel value="stats">
//           <Paper></Paper>
//           {/* <Flex direction="column" gap={20}>
//             <Box>
//               <ManagersTodaySummary variant="center" />
//             </Box>
//             <Box>
//               <ManagersWeekDashBoard variant="center" />
//             </Box>
//           </Flex> */}
//         </Tabs.Panel>
//         <Tabs.Panel value="controls">
//           <Box>
//             <Title order={2}>Управление персоналом</Title>
//             <Card withBorder mt={20}>
//               <DepartmentList />
//             </Card>
//           </Box>
//         </Tabs.Panel>
//       </Tabs>
