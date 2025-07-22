"use client";

import { Button, Modal, Stack, Title } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import React, { useEffect, useState } from "react";

export const ManagerStartWork = () => {
  const [opened, { close }] = useDisclosure(true);
  const [hasStarted, setHasStarted] = useState<boolean | null>(null); // null = пока не знаем

  useEffect(() => {
    const value = localStorage.getItem("manager_start_work");
    setHasStarted(value === "true");
  }, []);

  function setManagerStartWork() {
    localStorage.setItem("manager_start_work", "true");
    setHasStarted(true);
    close();
  }

  // Пока не знаем, что в localStorage — ничего не рендерим
  if (hasStarted === null) return null;

  // Если уже начал работу — ничего не показываем
  if (hasStarted) return null;

  return (
    <Modal onClose={() => {}} opened={opened} centered size="lg">
      <Stack justify="center" align="center" style={{ height: "100%" }}>
        <Title order={3} mb="md">
          Добро пожаловать в панель управления очередью!
        </Title>
        <Button onClick={setManagerStartWork} color="dark">
          Начать работу
        </Button>
      </Stack>
    </Modal>
  );
};
