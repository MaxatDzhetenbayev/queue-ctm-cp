"use client";
import React from "react";
import { useManagerReceptions } from "../hooks/index";
import { receptionTransformDto } from "../../../entities/receptions/helpers";
import {
  ChangeReceptiontionStatusButton,
  ReceptionCreateOffline,
  ReceptionDetail,
  Statuses,
} from "@/features";
import { Box, Flex, Skeleton, Table, Title } from "@mantine/core";

export function normalizeStatus(status?: string) {
  switch (status) {
    case "pending":
      return "На ожидании";
    case "working":
      return "В работе";
    case "done":
      return "Завершен";
    case "canceled":
      return "Отменен";
    case "no-show":
      return "Не пришел";
    case "called":
      return "Приглашение";
    default:
      return "Ошибка";
  }
}

export const ManagerReceptions = () => {
  const { data, isLoading, isError } = useManagerReceptions();

  if (!isLoading || !isError) {
  }

  const receptionTableHeader = [
    "Имя",
    "Телефон",
    "Время",
    "Статус",
    "Действия",
  ];

  return (
    <Box component="section" className="overflow-auto h-full max-h-[330px]">
      {isLoading ? (
        <Box>
          <Skeleton h={35} w={150} />
          <Skeleton mt={20} h={35} w="100%" />
          <Skeleton mt={5} h={35} w="100%" />
          <Skeleton mt={5} h={35} w="100%" />
          <Skeleton mt={5} h={35} w="100%" />
          <Skeleton mt={5} h={35} w="100%" />
          <Skeleton mt={5} h={35} w="100%" />
          <Skeleton mt={5} h={35} w="100%" />
          <Skeleton mt={5} h={35} w="100%" />
        </Box>
      ) : (
        <>
          <Flex align="center" justify="space-between">
            <Title mb={20} order={2}>
              Приемы
            </Title>
            <ReceptionCreateOffline />
          </Flex>
          {data === undefined ? (
            <div>Нет записей</div>
          ) : (
            <Table>
              <Table.Thead>
                <Table.Tr>
                  {receptionTableHeader.map((header) => (
                    <Table.Th
                      key={header}
                      className="px-6 py-3 text-left text-sm font-medium"
                    >
                      {header}
                    </Table.Th>
                  ))}
                </Table.Tr>
              </Table.Thead>
              <Table.Tbody className="divide-y divide-neutral-200">
                {receptionTransformDto(data).map((reception) => (
                  <Table.Tr
                    key={reception.id}
                    className="hover:bg-neutral-50 transition-colors"
                  >
                    <Table.Td className="px-6 py-2 text-sm">
                      {reception?.profile?.full_name}
                    </Table.Td>
                    <Table.Td className="px-6 py-2 text-sm">
                      {reception?.profile?.phone}
                    </Table.Td>
                    <Table.Td className="px-6 py-2 text-sm">
                      {reception?.time}
                    </Table.Td>
                    <Table.Td className="px-6 py-2">
                      <span className="px-2 py-1 text-xs rounded-full bg-primary-100">
                        {normalizeStatus(reception?.status?.name)}
                      </span>
                    </Table.Td>
                    <Table.Td className="px-6 py-2 space-x-2">
                      {reception.status.id === Statuses.DONE && (
                        <ReceptionDetail id={reception.id} />
                      )}
                      {reception.status.id === Statuses.NO_SHOW && (
                        <Flex gap={8}>
                          <ChangeReceptiontionStatusButton
                            id={reception.id}
                            status={Statuses.WORKING}
                          >
                            Принять
                          </ChangeReceptiontionStatusButton>
                          <ReceptionDetail id={reception.id} />
                        </Flex>
                      )}
                      {reception.status.id === Statuses.CANCELED && (
                        <ReceptionDetail id={reception.id} />
                      )}
                      {reception.status.id === Statuses.CALLED && (
                        <Flex gap={8}>
                          <ChangeReceptiontionStatusButton
                            id={reception.id}
                            status={Statuses.WORKING}
                          >
                            Принять
                          </ChangeReceptiontionStatusButton>
                          <ChangeReceptiontionStatusButton
                            id={reception.id}
                            status={Statuses.NO_SHOW}
                          >
                            Не пришел
                          </ChangeReceptiontionStatusButton>
                        </Flex>
                      )}
                      {reception.status.id === Statuses.PENDING && (
                        <Flex gap={8}>
                          <ChangeReceptiontionStatusButton
                            id={reception.id}
                            status={Statuses.CALLED}
                          >
                            Позвать
                          </ChangeReceptiontionStatusButton>

                          <ReceptionDetail id={reception.id} />
                        </Flex>
                      )}
                      {reception.status.id === Statuses.WORKING && (
                        <Flex gap={8}>
                          <ChangeReceptiontionStatusButton
                            id={reception.id}
                            status={Statuses.DONE}
                          >
                            Завершить
                          </ChangeReceptiontionStatusButton>
                          <ReceptionDetail id={reception.id} />
                        </Flex>
                      )}
                    </Table.Td>
                  </Table.Tr>
                ))}
              </Table.Tbody>
            </Table>
          )}
        </>
      )}
    </Box>
  );
};
