"use client";
import { api } from "@/shared";
import { queryClient } from "@/shared/providers/query-providers";
import {
  Button,
  Flex,
  Input,
  Modal,
  // MultiSelect
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { useMutation, useQuery } from "@tanstack/react-query";
import React from "react";
import { Controller, useForm } from "react-hook-form";

export const ManagerCreate = () => {
  // const { data: services } = useQuery({
  //   queryKey: ["services"],
  //   queryFn: async () => {
  //     const res = await api.get(`/services`);
  //     return res.data;
  //   },
  // });

  interface FormData {
    login: string;
    password: string;
    profile: {
      full_name: string;
      phone: string;
    };
    cabinet: string;
    table: string;
    role: string;
    center_id: string;
    auth_type: string;
    // service_ids: never[];
  }

  const { mutate } = useMutation({
    mutationKey: ["manager-create"],
    mutationFn: async (data: FormData) => {
      await api.post("/users", data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["managers"],
      });
    },
  });

  // const { data: user } = useQuery({
  //   queryKey: ["user-profile"],
  //   queryFn: async () => (await api.get(`/users/profile`)).data,
  // });

  const { control, handleSubmit } = useForm<FormData>({
    defaultValues: {
      login: "",
      password: "",
      profile: {
        full_name: "",
        phone: "",
      },
      cabinet: "",
      table: "",
      center_id: "",
      auth_type: "default",
      role: "manager",
      // service_ids: [],
    },
  });

  const onSubmit = (data: FormData) => mutate(data);
  const [opened, { open, close }] = useDisclosure(false);
  return (
    <>
      <Modal opened={opened} onClose={close}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Flex direction="column" gap={15}>
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
            {/* <Controller
				name="service_ids"
				control={control}
				render={({ field }) => (
					<MultiSelect
						data={
							services?.map((service: any) => {
								console.log({
									value: service.id,
									label: service.name["ru"],
								});
								return {
									value: service.id,
									label: service.name["ru"],
								};
							}) || []
						}
						{...field}
						placeholder="Выберите сервисы"
						searchable
					/>
				)}
			/> */}
            <Button type="submit">Изменить данные</Button>
          </Flex>
        </form>
      </Modal>
      <Button variant="default" onClick={open}>
        Создать менеджера
      </Button>
    </>
  );
};
