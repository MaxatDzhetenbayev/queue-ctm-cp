"use client";
import { api, getHoursFromToHourEnd } from "@/shared";
import { queryClient } from "@/shared/providers/query-providers";
import {
  Button,
  Checkbox,
  Flex,
  Input,
  Modal,
  NativeSelect,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";

import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import React, { useEffect, useState } from "react";
import { Control, Controller, useForm, UseFormSetValue } from "react-hook-form";
import { toast } from "react-toastify";

interface FormData {
  name: { [key: string]: string };
  departmentFeatures: {
    [key: string]: string;
  };
}

export const DepartmentCreate = () => {
  const [opened, { open, close }] = useDisclosure(false);
  const { mutate } = useMutation({
    mutationKey: ["department-create"],
    mutationFn: async (data: FormData) => {
      await api.post("/departments", data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["departments"],
      });
      reset({
        departmentFeatures: {},
      });
      close();
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

  console.log("getValues", getValues());

  const onSubmit = (data: FormData) => mutate(data);
  return (
    <>
      <Modal opened={opened} onClose={close}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Flex direction="column" gap={15}>
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
            <DepartmentFeaturesControlInput
              control={control}
              setFormValue={setFormValue}
            />
            <Button type="submit" color="dark">
              Создать
            </Button>
          </Flex>
        </form>
      </Modal>
      <Button variant="filled" color="dark" onClick={open}>
        Создать отдел
      </Button>
    </>
  );
};

const DepartmentFeaturesControlInput = ({
  setFormValue,
}: {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  control: Control<FormData, any>;
  setFormValue: UseFormSetValue<FormData>;
}) => {
  const timeSlots = getHoursFromToHourEnd("09:00", "18:30");

  const [departmentFeatures, setDepartmentFeatures] = useState<{
    [key: string]: string;
  }>({});

  useEffect(() => {
    setFormValue("departmentFeatures", departmentFeatures);
  }, [departmentFeatures, setFormValue]);

  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [isShowDepartment, setIsShowDepartment] = useState(false);
  const [isLetterDepartment, setIsLetterDepartment] = useState(false);

  useEffect(() => {
    if (startTime && endTime) {
      const time = `${startTime}-${endTime}`;
      setDepartmentFeatures((prev) => ({ ...prev, TIME: time }));
    }
  }, [startTime, endTime]);

  useEffect(() => {
    setDepartmentFeatures((prev) => ({
      ...prev,
      SHOW: String(isShowDepartment),
    }));
  }, [isShowDepartment]);

  useEffect(() => {
    setDepartmentFeatures((prev) => ({
      ...prev,
      LETTER: String(isLetterDepartment),
    }));
  }, [isLetterDepartment]);

  return (
    <>
      <Flex justify="space-between">
        <NativeSelect
          value={startTime}
          onChange={(e) => setStartTime(e.currentTarget.value)}
          data={timeSlots}
          defaultValue={timeSlots[0]}
          label="Выберите начальное время"
        >
          {timeSlots.map((slot) => (
            <option key={slot} value={slot}>
              {slot}
            </option>
          ))}
        </NativeSelect>
        <NativeSelect
          value={endTime}
          onChange={(e) => setEndTime(e.currentTarget.value)}
          data={timeSlots}
          label="Выберите конечное время"
        >
          {timeSlots.map((slot) => (
            <option key={slot} value={slot}>
              {slot}
            </option>
          ))}
        </NativeSelect>
      </Flex>
      <Checkbox
        checked={isShowDepartment}
        onChange={(e) => {
          setIsShowDepartment(e.currentTarget.checked);
        }}
        label="Не показывать отдел в базе телеграм"
      />
      <Checkbox
        checked={isLetterDepartment}
        onChange={(e) => {
          setIsLetterDepartment(e.currentTarget.checked);
        }}
        label="Принимать людей по алфавиту (по буквам) в телеграмме"
      />
    </>
  );
};
