"use client";
import { api } from "@/shared";
import { queryClient } from "@/shared/providers/query-providers";
import {
  Button,
  Flex,
  Input,
  Modal,
  MultiSelect,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { useMutation, useQuery } from "@tanstack/react-query";
import React, { useEffect } from "react";
import { Controller, useForm } from "react-hook-form";

export const ManagerCreate = () => {
  const [opened, { open, close }] = useDisclosure(false);

  const { data: services, isLoading: isServicesLoagin } = useQuery({
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
      full_name: string;
      phone: string;
    };
    cabinet: number;
    table: number;
    role: string;
    center_id: number;
    auth_type: string;
    service_ids: number[];
  }

  const { mutate } = useMutation({
    mutationKey: ["manager-create"],
    mutationFn: async (data: FormData) => {
      console.log(data)
      await api.post("/users", data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["managers"],
      });
      close()
    },
  });

  const { data: user, isLoading } = useQuery({
    queryKey: ["user-profile"],
    queryFn: async () => (await api.get(`/users/profile`)).data,
  });

  const { control, handleSubmit, reset, getValues } = useForm<FormData>({
    defaultValues: {
      login: "",
      password: "",
      profile: {
        full_name: "",
        phone: "",
      },
      auth_type: "default",
      role: "manager",
    },
  });

  useEffect(() => {
    if (!isLoading) {
      reset({ ...getValues(), center_id: user.center_id, service_ids: user?.services?.map((s: { id: number }) => s.id) })
    }
  }, [user, reset, getValues, isLoading])

  const onSubmit = (data: FormData) => mutate(data);
  return (
    <>
      <Modal opened={opened} onClose={close}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Flex direction="column" gap={15}>
            <Controller
              name="login"
              control={control}
              render={({ field }) => <Input placeholder="Введите логин"  {...field} />}
            />
            <Controller
              name="password"
              control={control}
              render={({ field }) => <Input placeholder="Введите пароль" type="password" {...field} />}
            />
            <Controller
              name="profile.full_name"
              control={control}
              render={({ field }) => <Input placeholder="Введите полное ФИО" {...field} />}
            />
            <Controller
              name="profile.phone"
              control={control}
              render={({ field }) => <Input placeholder="Введите сотовый телефон" {...field} />}
            />
            <Controller
              name="cabinet"
              control={control}
              render={({ field }) => <Input placeholder="Введите кабинет работника" onChange={(e) => field.onChange(Number(e.target.value))} value={field.value} />}
            />
            <Controller
              name="table"
              control={control}
              render={({ field }) => <Input placeholder="Введите стол работника" onChange={(e) => field.onChange(Number(e.target.value))} value={field.value} />}
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
            <Button type="submit">Создать</Button>
          </Flex>
        </form>
      </Modal>
      <Button variant="filled" bg="dark" onClick={open}>
        Создать менеджера
      </Button>
    </>
  );
};
