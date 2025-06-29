"use client";
import {
  AbsencesList,
  AbsencesTypeProgress,
  UpcomingAbsences,
} from "@/widgets";
import { Grid } from "@mantine/core";
import React from "react";

export default function AbsencesPage() {
  return (
    <Grid columns={9} gutter="xl">
      <Grid.Col span={6}>
        <AbsencesList />
      </Grid.Col>
      <Grid.Col span={3}>
        <AbsencesTypeProgress />
      </Grid.Col>
      <Grid.Col span={6}>
        <UpcomingAbsences />
      </Grid.Col>
    </Grid>
  );
}
