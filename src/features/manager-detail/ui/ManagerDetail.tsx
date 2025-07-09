"use client";
import React from "react";
import { Box, Card, Flex, Modal, Text, Tabs, Badge } from "@mantine/core";
import { IManager } from "@/widgets/AdminManagersTable/hooks";
import { ManagerChange } from "@/features/manager-change";
import { ManagerDestroy } from "@/features/manager-destroy";
import { IReception } from "@/entities";
import { useDisclosure } from "@mantine/hooks";
import { useQuery } from "@tanstack/react-query";
import { api } from "@/shared";

export const ManagerDetailModal = ({ full_name, id, isOnline }: IManager) => {
  const [opened, { open, close }] = useDisclosure(false);
  return (
    <>
      <Card
        key={id}
        withBorder
        w="100%"
        style={{ cursor: "pointer" }}
        onClick={() => {
          open();
        }}
      >
        <Flex gap="md" align="center">
          <Flex gap="xs" align="center">
            <Box
              style={{
                padding: "8px",
                borderRadius: "8px",
                backgroundColor: isOnline ? "green" : "red",
              }}
            ></Box>
          </Flex>
          <Text>{full_name}</Text>
        </Flex>
      </Card>
      <Modal opened={opened} onClose={close} size="70%">
        <Tabs defaultValue="info">
          <Tabs.List>
            <Tabs.Tab value="info">Общая информация</Tabs.Tab>
            {/* <Tabs.Tab value="stats">Статистика</Tabs.Tab> */}
            <Tabs.Tab value="receptions">Записи</Tabs.Tab>
          </Tabs.List>
          <Tabs.Panel value="info">
            <Flex direction="column" gap={10}>
              <ManagerChange id={id} />
              <ManagerDestroy id={id} />
            </Flex>
          </Tabs.Panel>

          <Tabs.Panel value="receptions">
            <ManagerReceptions id={id} />
          </Tabs.Panel>
        </Tabs>
      </Modal>
    </>
  );
};

const ManagerReceptions = ({ id }: { id: number }) => {
  const { data: managerReceptions, isLoading } = useQuery({
    queryKey: ["manager-receptions-by-id", id],
    queryFn: async () => {
      const res = await api.get(`/receptions/managers/${id}`);
      return res.data;
    },
  });

  return (
    <Box>
      {isLoading ? (
        <div></div>
      ) : (
        <Flex mt={20} direction="column" gap={10}>
          {managerReceptions?.map((reception: IReception) => (
            <Card withBorder key={reception.id} w="100%">
              <Flex justify="space-between" align="center">
                <Flex direction="column" gap={10}>
                  <Badge color="dark">
                    {reception?.user?.authType === "TELEGRAM"
                      ? "Телеграм"
                      : "Оффлайн"}
                  </Badge>
                  <Flex direction="column" gap={10}>
                    <Flex gap={30}>
                      <Text>
                        <strong>ФИО:</strong>{" "}
                        {reception?.user?.profile.fullName}
                      </Text>
                      <Text>
                        <strong>ИИН:</strong> {reception?.user?.profile.iin}
                      </Text>
                    </Flex>
                    <Flex gap={30}>
                      <Text>
                        <strong>Телефон:</strong>
                        {reception?.user?.profile.phone}
                      </Text>
                      <Flex gap={20}>
                        <Text>
                          <strong>Дата:</strong>{" "}
                          {new Date(
                            reception?.date as string
                          ).toLocaleDateString("ru-RU")}
                        </Text>
                        <Text>
                          <strong>Время:</strong>{" "}
                          {new Date(
                            reception?.time as string
                          ).toLocaleTimeString("ru-RU", {
                            hour: "2-digit",
                            minute: "2-digit",
                          })}
                        </Text>
                      </Flex>
                    </Flex>
                  </Flex>
                </Flex>
              </Flex>
            </Card>
          ))}
        </Flex>
      )}
    </Box>
  );
};
