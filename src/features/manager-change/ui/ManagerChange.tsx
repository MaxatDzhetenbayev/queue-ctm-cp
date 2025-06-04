"use client";
import { api } from "@/shared";
import { queryClient } from "@/shared/providers/query-providers";
import { Button, Flex, Input, MultiSelect, Title } from "@mantine/core";
import { useMutation, useQuery } from "@tanstack/react-query";
import React, { useEffect } from "react";
import { Controller, useForm } from "react-hook-form";

export const ManagerChange = ({ id }: { id: number }) => {
  const { data: managerData } = useQuery({
    queryKey: ["manager", id],
    queryFn: async () => {
      const res = await api.get(`/users/${id}`);
      return res.data;
    },
  });

  const { data: services, isLoading: isServicesLoading } = useQuery({
    queryKey: ["services"],
    queryFn: async () => {
      const res = await api.get(`/services`);
      return res.data;
    },
  });

  interface FormData {
    login: string;
    password: string;
    profile: {
      fullName: string;
      phone: string;
    };
    cabinet: number | null;
    table: number | null;
    service_ids: string[];
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
      profile: {
        fullName: "",
        phone: "",
      },
      cabinet: null,
      table: null,
      service_ids: [],
    },
  });

  // Обновляем значения формы, только когда managerData и services загружены
  useEffect(() => {
    if (managerData && services && !isServicesLoading) {
      reset({
        login: managerData.login,
        password: "", // Пароль не возвращается, поэтому оставим пустым
        profile: {
          fullName: managerData.profile.fullName,
          phone: managerData.profile.phone,
        },
        cabinet: managerData.employeeInfo.cabinet,
        table: managerData.employeeInfo.table,
        service_ids: managerData.employeeServices.map(
          (s: { serviceId: string }) => s.serviceId
        ),
      });
    }
  }, [managerData, services, isServicesLoading, reset]);

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
          name="password"
          control={control}
          render={({ field }) => <Input type="password" {...field} />}
        />
        <Controller
          name="profile.fullName"
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
          render={({ field }) => (
            <Input
              type="number"
              {...field}
              value={field.value === null ? "" : field.value}
            />
          )}
        />
        <Controller
          name="table"
          control={control}
          render={({ field }) => (
            <Input
              type="number"
              {...field}
              value={field.value === null ? "" : field.value}
            />
          )}
        />
        <Controller
          name="service_ids"
          control={control}
          render={({ field }) => (
            <MultiSelect
              data={
                services?.map(
                  (s: { id: string; name: { ru: string; kz: string } }) => ({
                    value: s.id,
                    label: s.name.ru,
                  })
                ) || []
              }
              value={field.value || []}
              onChange={(values) => field.onChange(values)}
              placeholder="Выберите сервисы, за которые будет отвечать работник"
              searchable
            />
          )}
        />
        <Button bg="dark" type="submit">
          Изменить данные
        </Button>
      </Flex>
    </form>
  );
};
