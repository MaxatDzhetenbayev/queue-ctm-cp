"use client";
import React, { useState } from "react";
import { Box, Flex, Pagination, Paper, Table, Title } from "@mantine/core";
import { AbsencesItem } from "./ui/absences-item/AbsencesItem";
import { useQuery } from "@tanstack/react-query";
import { api } from "@/shared";
import { AbsenceStatus } from "@/features/absences/AbsencesUpdateStatusButton";
import { CreateAbsenceModal } from "@/features";

export interface Absence {
  id: string;
  employeeName: string;
  type: AbsenceType;
  status: AbsenceStatus;
  startDate: Date;
  endDate: Date;
  comment: string;
}

export interface AbsenceResponse {
  total: number;
  data: Absence[];
}

export enum AbsenceType {
  SICK_LEAVE = "SICK_LEAVE",
  HOLIDAY = "HOLIDAY",
  PERSONAL = "PERSONAL",
}

export const getAbsenceTypeText = (type: AbsenceType): string => {
  switch (type) {
    case AbsenceType.HOLIDAY:
      return "Отпуск";
    case AbsenceType.SICK_LEAVE:
      return "Больничный";
    case AbsenceType.PERSONAL:
      return "Личное";
    default:
      return "Другое";
  }
};

export const getAbsenceStatusText = (status: AbsenceStatus): string => {
  switch (status) {
    case AbsenceStatus.WORKING:
      return "Работает";
    case AbsenceStatus.ARCHIVED:
      return "Архивирован";
  }
};

export const AbsencesList = () => {
  const [page, setPage] = useState(1);
  const [limit] = useState(5);

  const { data, isLoading } = useQuery<AbsenceResponse>({
    queryKey: ["absences", page, limit],
    queryFn: async () =>
      (
        await api.get("leaves/center", {
          params: {
            page: page,
            limit: limit,
          },
        })
      ).data,
  });

  return (
    <Paper withBorder p={20} h={500} style={{ position: "relative" }}>
      <Flex justify="space-between" align="center">
        <Title order={3}>Список отсутствий</Title>
        <CreateAbsenceModal />
      </Flex>
      <Flex h={420} direction={"column"}>
        <Box flex={1}>
          <Table mah={420} stickyHeader stickyHeaderOffset={60}>
            <Table.Thead>
              <Table.Tr>
                <Table.Th>Сотрудник</Table.Th>
                <Table.Th>Тип</Table.Th>
                <Table.Th>Статус</Table.Th>
                <Table.Th>Период</Table.Th>
                <Table.Th>Действия</Table.Th>
              </Table.Tr>
            </Table.Thead>
            <Table.Tbody>
              {isLoading ? (
                <></>
              ) : (
                <>
                  {data?.data?.map((item) => (
                    <AbsencesItem key={item.id} {...item} />
                  ))}
                </>
              )}
            </Table.Tbody>
          </Table>
        </Box>
        <Pagination
          total={Math.ceil((data?.total || 0) / limit)}
          value={page}
          onChange={setPage}
        />
      </Flex>
    </Paper>
  );
};
