"use client";

import { api } from "@/shared";
import { Button, Modal, Stack, Title } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { useMutation, useQuery } from "@tanstack/react-query";
import "./ManagerStartWork.css";
export const ManagerStartWork = () => {
  const [opened, { close }] = useDisclosure(true);

  const { data, isLoading, isError } = useQuery<{
    isOnline: boolean;
  }>({
    queryKey: ["manager-online-check"],
    queryFn: async () => {
      const res = await api.get("/users/managers/online-check");
      return res.data;
    },
    retry: false,
  });

  const { mutate: startWork } = useMutation({
    mutationFn: async () => {
      await api.patch("/users/managers/start-work");
    },
    onSuccess: () => {
      close();
    },
  });

  if (isLoading) return;
  if (data?.isOnline === true) return null;

  return (
    <Modal onClose={() => {}} opened={opened} centered size="lg">
      <Stack justify="center" align="center" style={{ height: "100%" }}>
        <Title order={3} mb="md" style={{ textAlign: "center" }}>
          {isError ? (
            <>
              Рабочее время окончено. <br /> До следующего рабочего дня!
            </>
          ) : (
            "Добро пожаловать в панель управления очередью!"
          )}
        </Title>
        {!isError && (
          <Button onClick={() => startWork()} color="dark" disabled={isError}>
            Приступить к работе
          </Button>
        )}
      </Stack>
    </Modal>
  );
};
