"use client";

import { api } from "@/shared";
import { Button, Modal, Stack, Title } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { useMutation, useQuery } from "@tanstack/react-query";

export const ManagerStartWork = () => {
  const [opened, { close }] = useDisclosure(true);

  const { data, isLoading } = useQuery<{
    isOnline: boolean;
  }>({
    queryKey: ["manager-online-check"],
    queryFn: async () => {
      const res = await api.get("/users/managers/online-check");
      return res.data;
    },
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
        <Title order={3} mb="md">
          Добро пожаловать в панель управления очередью!
        </Title>
        <Button onClick={() => startWork()} color="dark">
          Приступить к работе
        </Button>
      </Stack>
    </Modal>
  );
};
