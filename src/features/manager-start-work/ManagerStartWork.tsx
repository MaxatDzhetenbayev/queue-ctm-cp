"use client";

import { Button, Modal, Stack, Title } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import React from "react";

export const ManagerStartWork = () => {
  const [opened, { close }] = useDisclosure(true);

  function customClose() {}

  const managerStartWork = localStorage.getItem("manager_start_work");

  if (managerStartWork === "true") {
    return null;
  }

  function setManagerStartWork() {
    localStorage.setItem("manager_start_work", "true");
    close();
  }

  return (
    <>
      <Modal onClose={customClose} opened={opened} centered size="lg">
        <Stack justify="center" align="center" style={{ height: "100%" }}>
          <Title order={3} mb="md">
            Добро пожаловать в панель управления очередью!
          </Title>
          <Button onClick={setManagerStartWork} color="dark">
            Начать работу
          </Button>
        </Stack>
      </Modal>
    </>
  );
};
