"use client";

import { api } from "@/shared";
import { queryClient } from "@/shared/providers/query-providers";
import { AbsenceType } from "@/widgets/absences/absences-list/AbsencesList";
import { IManagers } from "@/widgets/AdminManagersTable/hooks";
import { Button, Flex, Modal, Select, Stack, Textarea } from "@mantine/core";
import { DatePickerInput } from "@mantine/dates";
import { useDisclosure } from "@mantine/hooks";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { FaPlus } from "react-icons/fa";

interface FormDate {
  startDate: string; //iso8601 format
  endDate?: string; //iso8601 format
  employeeId: string;
  comment?: string;
  type: AbsenceType;
}

export const CreateAbsenceModal = () => {
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
