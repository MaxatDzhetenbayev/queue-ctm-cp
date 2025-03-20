"use client";
import { api } from "@/shared";
import { queryClient } from "@/shared/providers/query-providers";
import {
  Button,
  Flex,
  Input,
  MultiSelect,
  Title,
} from "@mantine/core";
import { useMutation, useQuery } from "@tanstack/react-query";
import React, { useEffect } from "react";
import { Controller, useForm } from "react-hook-form";

export const ManagerChange = ({ id }: { id: number }) => {
  const { data: managerData } = useQuery({
    queryKey: ["manager", id],
    queryFn: async () => {
      const res = await api.get(`/users/managers/${id}`);
      return res.data;
    },
  });
  const { data: services, isLoading: isServicesLoagin } = useQuery({
    queryKey: ["services"],
    queryFn: async () => {
      const res = await api.get(`/services`);
      return res.data;
    },
  });

  interface FormData {
    login: string;
    password_hash: string;
    profile: {
      full_name: string;
      phone: string;
    };
    cabinet: string;
    table: string;
    service_ids: never[];
  }

  const { mutate } = useMutation({
    mutationKey: ["manager-change", id],
    mutationFn: async (data: FormData) => {
      await api.put(`/users/managers/${id}`, data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["managers"],
      });
      queryClient.invalidateQueries({
        queryKey: ["manager", id],
      });
    },
  });

  const { control, reset, handleSubmit } = useForm<FormData>({
    defaultValues: {
      login: "",
      password_hash: "",
      profile: {
        full_name: "",
        phone: "",
      },
      cabinet: "",
      table: "",
      service_ids: [],
    },
  });

  useEffect(() => {
    if (managerData) {
      reset({
        ...managerData,
        cabinet: managerData.manager_table.cabinet,
        table: managerData.manager_table.table,
        service_ids: managerData.services.map((s: { id: number }) => s.id)
      });
    }
  }, [managerData, reset]);

  const onSubmit = (data: FormData) => mutate(data);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Title order={2}>Общая информация</Title>
      <Flex direction="column" gap={15} mt={30}>
        <Controller
          name="login"
          control={control}
          render={({ field }) => <Input {...field} />}
        />
        <Controller
          name="password_hash"
          control={control}
          render={({ field }) => <Input type="password" {...field} />}
        />
        <Controller
          name="profile.full_name"
          control={control}
          render={({ field }) => <Input {...field} />}
        />
        <Controller
          name="profile.phone"
          control={control}
          render={({ field }) => <Input {...field} />}
        />
        <Controller
          name="cabinet"
          control={control}
          render={({ field }) => <Input {...field} />}
        />
        <Controller
          name="table"
          control={control}
          render={({ field }) => <Input {...field} />}
        />
        <Controller
          name="service_ids"
          control={control}
          render={({ field }) => (
            <MultiSelect
              data={
                !isServicesLoagin && services.map((s: { id: number, name: { [key: string]: string } }) => (
                  {
                    value: String(s.id),
                    label: s.name["ru"]
                  }
                ))
                || []
              }
              {...field}
              value={field.value?.map(String) || []}
              onChange={(values) => field.onChange(values.map(Number))}
              placeholder="Выберите сервисы"
              searchable
            />
          )}
        />
        <Button bg="dark" type="submit">Изменить данные</Button>
      </Flex>
    </form>
  );
};
