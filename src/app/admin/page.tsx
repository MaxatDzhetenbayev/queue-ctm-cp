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
      </Grid>
    </Box>
  );
}
