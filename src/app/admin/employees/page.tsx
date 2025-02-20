import { AdminManagersTable } from "@/widgets/AdminManagersTable";

import { Flex } from "@mantine/core";

import React from "react";

export default function Page() {
  return (
    <Flex p={20} direction="column" h="100vh">
      <AdminManagersTable />
    </Flex>
  );
}
