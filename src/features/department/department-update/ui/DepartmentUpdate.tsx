"use client";

import { api } from "@/shared";
import { queryClient } from "@/shared/providers/query-providers";
import { Button, Flex, Input } from "@mantine/core";
import { useMutation, useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";
import React, { useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { DepartmentFeaturesControlInput } from "../../department-create/ui/DepartmentCreate";

interface FormData {
  name: { [key: string]: string };
  departmentFeatures: {
    [key: string]: string;
  };
}

export const DepartmentUpdate = ({ id }: { id: string }) => {
  const { data } = useQuery({
    queryKey: ["departments", id],
    queryFn: async () => (await api.get(`/departments/${id}`)).data,
  });

  const { mutate } = useMutation({
    mutationKey: ["department-update"],
    mutationFn: async (data: FormData) => {
      await api.patch(`/departments/${id}`, data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["departments", id],
      });
    },
    onError: (error: AxiosError) => {
      if (
        error.response?.data &&
        typeof error.response.data === "object" &&
        "message" in error.response.data
      ) {
        (error.response.data.message as string[]).forEach((msg: string) => {
          toast.error(msg.split(".")[1] || msg);
        });
      }
    },
  });

  const {
    control,
    handleSubmit,
    setValue: setFormValue,
    getValues,
    reset,
  } = useForm<FormData>({
    defaultValues: {
      departmentFeatures: {},
    },
  });

  useEffect(() => {
    const features: { [key: string]: string } = {};

    if (data?.departmentFeatures) {
      Object.entries(data.departmentFeatures).forEach(([, value]) => {
        const feature = value as { type: string; value: string };
        features[feature.type] = String(feature.value);
      });
    }


    if (data) {
      reset({
        name: data.name,
        departmentFeatures: features,
      });
    }
  }, [data, reset]);

  const onSubmit = (data: FormData) => mutate(data);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Flex direction="column" gap={15} pt={20}>
        <Controller
          name="name.ru"
          control={control}
          render={({ field }) => (
            <Input placeholder="Введите название (RU)" {...field} />
          )}
        />
        <Controller
          name="name.kz"
          control={control}
          render={({ field }) => (
            <Input placeholder="Введите название (KZ)" {...field} />
          )}
        />
        <Flex direction="column" w={400} gap={15}>
          <DepartmentFeaturesControlInput
            control={control}
            setFormValue={setFormValue}
            features={getValues().departmentFeatures}
          />
        </Flex>
        <Button type="submit" color="dark">
          Обновить
        </Button>
      </Flex>
    </form>
  );
};
