"use client";
import { ManagerReceptions } from "@/widgets";
import { Flex } from "@mantine/core";

import React from "react";

export default function Page() {
  return (
    <Flex direction="column" h="100%" gap="lg">
      <ManagerReceptions />
    </Flex>
  );
}
