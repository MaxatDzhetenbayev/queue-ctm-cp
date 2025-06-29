"use client";
import { AbsencesList } from "@/widgets";
import { Grid, Space } from "@mantine/core";
import React from "react";

export default function AbsencesPage() {
  return (
    <Grid columns={9} gutter="md">
      <Grid.Col span={6}>
        <AbsencesList />
      </Grid.Col>
      <Grid.Col span={3}>
        <Space p={"md"}>sdfsdf</Space>
      </Grid.Col>
      <Grid.Col span={6}>
        <Space p={"md"}>sdfsdf</Space>
      </Grid.Col>
    </Grid>
  );
}
