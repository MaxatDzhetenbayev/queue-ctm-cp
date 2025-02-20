// import { AdminManagersTable } from "@/widgets/AdminManagersTable";

import dynamic from "next/dynamic";

import React from "react";

const AdminApp = dynamic(
  () => import("@/widgets/AdminManagers/ui/AdminManagers"),
  { ssr: false }
);
//     <Flex p={20} direction="column" h="100vh">
// <AdminManagersTable />
// </Flex>

export default function Page() {
  return <AdminApp />;
}
