"use client";

import { DepartmentList } from "@/widgets";
import { Card } from "@mantine/core";
import React from "react";

export default function WorkersPage() {
  return (
    <Card withBorder mt={20}>
      <DepartmentList />
    </Card>
  );
}
