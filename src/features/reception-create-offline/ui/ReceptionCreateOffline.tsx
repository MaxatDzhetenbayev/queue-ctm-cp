"use client";
import { api } from "@/shared";
import { queryClient } from "@/shared/providers/query-providers";
import { Button, Flex, Input, Modal, Select, Title } from "@mantine/core";
import { useDebouncedValue, useDisclosure } from "@mantine/hooks";
import { useMutation, useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";
import React, { useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import { toast } from "react-toastify";

interface FormData {
  full_name: string;
  iin: string;
  phone: string;
  serviceId: string;
}

export const ReceptionCreateOffline = () => {
  const [opened, { open, close }] = useDisclosure(false);

  const { data: managerServices, isLoading: isServicesLoading } = useQuery({
    queryKey: ["manager-services-list"],
    queryFn: async () => {
      const res = await api.get("/services/manager");
      return res.data;
    },
  });

  const { control, handleSubmit, reset, watch } = useForm<FormData>();

  const iin = watch("iin");
  const [debouncedIin] = useDebouncedValue(iin, 1000);

  const {
    data: userByIin,
    isSuccess: isUserFindSuccess,
    isLoading: isUserFindLoading,
  } = useQuery({
    queryKey: ["finded-user-by-iin", debouncedIin],
    queryFn: async () => {
      const res = await api.get("/users/iin/" + iin);
      return res.data;
    },
    enabled: !!debouncedIin,
    retry: false,
    refetchOnWindowFocus: false,
  });

  useEffect(() => {
    if (isUserFindSuccess) {
      reset((prev) => ({
        ...prev,
        full_name: userByIin.fullName,
        phone: userByIin.phone,
        serviceId: userByIin.serviceId,
      }));
    }
  }, [userByIin, isUserFindSuccess, reset]);

  const { mutate } = useMutation({
    mutationKey: ["receptions-create-offline"],
    mutationFn: async (data: FormData) => {
      const res = await api.post("/receptions/offline", data);
      return res;
    },
    onSuccess: () => {
      reset();
      close();
      queryClient.invalidateQueries({
        queryKey: ["receptions-list"],
      });
    },
    onError: (error: AxiosError) => {
      if (
        error.response?.data &&
        typeof error.response.data === "object" &&
        "message" in error.response.data
      ) {
        (error.response.data.message as string[]).forEach((msg: string) => {
          toast.error(msg);
        });
      }
    },
  });

  const onSubmit = (data: FormData) => mutate(data);

  return (
    <>
      <Modal opened={opened} onClose={close} size="xl">
        <Title order={2}>Создание записи оффлайн</Title>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Flex direction="column" gap={15} mt={20}>
            <Controller
              name="iin"
              control={control}
              render={({ field }) => (
                <Input maxLength={12} placeholder="Введите ИИН" {...field} />
              )}
            />
            {!!debouncedIin && !isUserFindLoading && (
              <>
                {isUserFindSuccess ? (
                  <>
                    <Input
                      disabled
                      value={userByIin.fullName}
                      placeholder="Введите полное ФИО"
                    />
                    <Input
                      disabled
                      value={userByIin.phone}
                      placeholder="Введите номер телефона"
                    />
                    <Controller
                      name="serviceId"
                      control={control}
                      render={({ field }) => (
                        <Select
                          value={field.value}
                          onChange={(value) => field.onChange(value)}
                          placeholder="Выберите сервис"
                          data={
                            (!isServicesLoading &&
                              managerServices.map(
                                (s: {
                                  id: string;
                                  name: { [key: string]: string };
                                }) => ({
                                  value: s.id,
                                  label: s.name["ru"],
                                })
                              )) ||
                            []
                          }
                        />
                      )}
                    />
                  </>
                ) : (
                  <>
                    <Controller
                      name="full_name"
                      control={control}
                      render={({ field }) => (
                        <Input placeholder="Введите полное ФИО" {...field} />
                      )}
                    />
                    <Controller
                      name="phone"
                      control={control}
                      render={({ field }) => (
                        <Input
                          maxLength={11}
                          placeholder="Введите номер телефона"
                          {...field}
                        />
                      )}
                    />
                    <Controller
                      name="serviceId"
                      control={control}
                      render={({ field }) => (
                        <Select
                          value={field.value}
                          onChange={(value) => field.onChange(value)}
                          placeholder="Выберите сервис"
                          data={
                            (!isServicesLoading &&
                              managerServices.map(
                                (s: {
                                  id: string;
                                  name: { [key: string]: string };
                                }) => ({
                                  value: s.id,
                                  label: s.name["ru"],
                                })
                              )) ||
                            []
                          }
                        />
                      )}
                    />
                  </>
                )}
              </>
            )}

            <Button type="submit" bg="dark">
              Создать запись
            </Button>
          </Flex>
        </form>
      </Modal>
      <Button variant="default" onClick={open}>
        Создать запись
      </Button>
    </>
  );
};
