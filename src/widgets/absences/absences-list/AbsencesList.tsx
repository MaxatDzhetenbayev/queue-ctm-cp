"use client";
import React, { useState } from "react";
import {
  Button,
  Flex,
  Modal,
  Pagination,
  Paper,
  Select,
  Stack,
  Table,
  Textarea,
  Title,
} from "@mantine/core";
import { FaPlus } from "react-icons/fa";
import { AbsencesItem } from "./ui/absences-item/AbsencesItem";
import { useDisclosure } from "@mantine/hooks";
import { DatePickerInput } from "@mantine/dates";
import { useQuery } from "@tanstack/react-query";
import { api } from "@/shared";

export interface Absence {
  id: string;
  employeeName: string;
  type: AbsenceType;
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
    <Paper withBorder p={20}>
      <Flex justify="space-between" align="center">
        <Title order={3}>Список отсутствий</Title>
        <CreateAbsenceModal />
      </Flex>
      <Table mt={20} stickyHeader stickyHeaderOffset={60}>
        <Table.Thead>
          <Table.Tr>
            <Table.Th>Сотрудник</Table.Th>
            <Table.Th>Тип</Table.Th>
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
      <Flex justify="space-between" align={"center"} mt={10}>
        <Pagination
          total={Math.ceil((data?.total || 0) / limit)}
          value={page}
          onChange={setPage}
        />
      </Flex>
    </Paper>
  );
};

const CreateAbsenceModal = () => {
  const [opened, { open, close }] = useDisclosure(false);

  const [value, setValue] = useState<[Date | null, Date | null]>([null, null]);

  return (
    <>
      <Modal
        centered
        p={20}
        opened={opened}
        onClose={close}
        title="Добавить отсутствие"
      >
        <form>
          <Stack gap="md">
            <Select
              label="Сотрудник"
              placeholder="Выберите сотрудника"
              data={[
                { value: "12dfsjfsidfj", label: "Джетенбаев Максат" },
                { value: "w83hsodnfvdf", label: "Баширов Надиль" },
              ]}
              required
            />
            <Select
              label="Тип отсутствия"
              placeholder="Выберите тип отсутствия"
              data={[
                { value: "12dfsjfsidfj", label: "Отпуск" },
                { value: "w83hsodnfvdf", label: "Больничный" },
                { value: "w83hsodnfvdв", label: "Другое" },
              ]}
              required
            />
            <Textarea label="Комментарий" placeholder="Введите комментарий" />
            <Flex>
              <DatePickerInput
                label="Даты отсутствия"
                placeholder="Выберите даты"
                type="range"
                value={value}
                style={{ width: "100%" }}
                onChange={setValue}
              />
            </Flex>
            <Button variant="filled" color="dark" type="submit" mt="md">
              Добавить
            </Button>
          </Stack>
        </form>
      </Modal>
      <Button variant="filled" color="dark" size="md" onClick={open}>
        <FaPlus style={{ marginRight: 5 }} />
        Добавить отсутствие
      </Button>
    </>
  );
};
