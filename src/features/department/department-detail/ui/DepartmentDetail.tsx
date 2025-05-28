import { AdminManagersTable } from "@/widgets/AdminManagersTable";
import { IDepartment } from "@/widgets/departments/model/types";
import { Box, Button, Card, Modal, Tabs, Title } from "@mantine/core";
import { useDisclosure, useMediaQuery } from "@mantine/hooks";
import React from "react";

export const DepartmentDetail = ({
  departmentData,
}: {
  departmentData: IDepartment;
}) => {
  const [opened, { open, close }] = useDisclosure(false);
  const isMobileMedia = useMediaQuery("(max-width: 480px)");

  return (
    <>
      <Button color="dark" fullWidth mt="md" radius="md" onClick={open}>
        Детальнее
      </Button>

      <Modal
        opened={opened}
        onClose={close}
        size={isMobileMedia ? "100%" : "80%"}
        title={`Отдел — ${departmentData.name.ru}`}
        centered
        padding={isMobileMedia ? "sm" : "xl"}
      >
        <Tabs defaultValue="employees">
          <Tabs.List>
            {/* <Tabs.Tab value="dashboard">Дашборд</Tabs.Tab> */}
            <Tabs.Tab value="employees">Сотрудники</Tabs.Tab>
          </Tabs.List>
          <Tabs.Panel value="dashboard">
            sdfsfd
            {/* <DepartmentDashboard /> */}
          </Tabs.Panel>
          <Tabs.Panel value="employees">
            <Box>
              <Title order={2}>Управление менеджерами</Title>
              <Card withBorder mt={20}>
                <AdminManagersTable departmentId={departmentData.id} />
              </Card>
            </Box>
          </Tabs.Panel>
        </Tabs>
      </Modal>
    </>
  );
};
