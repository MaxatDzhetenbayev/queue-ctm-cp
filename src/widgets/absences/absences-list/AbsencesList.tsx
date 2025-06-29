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
import { useMutation, useQuery } from "@tanstack/react-query";
import { api } from "@/shared";
import { Controller, useForm } from "react-hook-form";
import { queryClient } from "@/shared/providers/query-providers";
import { IManagers } from "@/widgets/AdminManagersTable/hooks";

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

interface FormDate {
  startDate: string; //iso8601 format
  endDate?: string; //iso8601 format
  employeeId: string;
  comment?: string;
  type: AbsenceType;
}

const CreateAbsenceModal = () => {
  const [opened, { open, close }] = useDisclosure(false);

  const [value, setValue] = useState<[Date | null, Date | null]>([null, null]);

  const { handleSubmit, control } = useForm<FormDate>();

  const { data: employees } = useQuery<IManagers>({
    queryKey: ["employees"],
    queryFn: async () => (await api.get("/users/managers/center")).data,
  });

  console.log("employees", employees?.managers);

  const { mutate } = useMutation({
    mutationKey: ["create-absence"],
    mutationFn: async (data: FormDate) => {
      await api.post(`/leaves/employee/${data.employeeId}`, {
        ...data,
        startDate: value[0]?.toISOString(),
        endDate: value[1]?.toISOString(),
      });
    },
    onSuccess: () => {
      close();
      queryClient.invalidateQueries({ queryKey: ["absences"] });
      queryClient.invalidateQueries({ queryKey: ["absences-analytics-types"] });
      queryClient.invalidateQueries({ queryKey: ["absences-upcoming"] });
    },
  });

  const onSubmit = (data: FormDate) => mutate(data);
  return (
    <>
      <Modal
        centered
        p={20}
        opened={opened}
        onClose={close}
        title="Добавить отсутствие"
      >
        <form onSubmit={handleSubmit(onSubmit)}>
          <Stack gap="md">
            <Controller
              name="employeeId"
              control={control}
              render={({ field }) => (
                <Select
                  label="Сотрудник"
                  placeholder="Выберите сотрудника"
                  data={
                    employees?.managers.map((manager) => ({
                      value: manager.id.toString(),
                      label: manager.full_name,
                    })) || []
                  }
                  required
                  {...field}
                />
              )}
            />
            <Controller
              name="type"
              control={control}
              render={({ field }) => (
                <Select
                  label="Тип отсутствия"
                  placeholder="Выберите тип отсутствия"
                  data={[
                    { value: AbsenceType.HOLIDAY, label: "Отпуск" },
                    { value: AbsenceType.SICK_LEAVE, label: "Больничный" },
                    { value: AbsenceType.PERSONAL, label: "Личное" },
                  ]}
                  required
                  {...field}
                />
              )}
            />
            <Controller
              name="comment"
              control={control}
              render={({ field }) => (
                <Textarea
                  label="Комментарий"
                  placeholder="Введите комментарий"
                  {...field}
                />
              )}
            />
            <Flex>
              <DatePickerInput
                label="Даты отсутствия"
                placeholder="Выберите даты"
                type="range"
                value={value}
                style={{ width: "100%" }}
                onChange={setValue}
                required
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
