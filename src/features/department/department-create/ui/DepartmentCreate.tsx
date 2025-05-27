"use client";
import { api, getHoursFromToHourEnd } from "@/shared";
import { queryClient } from "@/shared/providers/query-providers";
import {
  Button,
  Flex,
  Input,
  Modal,
  MultiSelect,
  NativeSelect,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";

import { useMutation } from "@tanstack/react-query";
import React, { useEffect, useState } from "react";
import { Control, Controller, useForm, UseFormSetValue } from "react-hook-form";

interface FormData {
  name: { [key: string]: string };
  departmentFeatures: {
    type: string;
    value: string;
  }[];
}

const featuresData = [
  { value: "TIME", label: "Установка своего времени" },
  { value: "LETTER", label: "Принимать по буквам" },
  { value: "SHOW", label: "Убрать из базы телеграмма" },
];

export const DepartmentCreate = () => {
  const [opened, { open, close }] = useDisclosure(false);
  const [features, setFeatures] = React.useState<string[]>();
  const { mutate } = useMutation({
    mutationKey: ["department-create"],
    mutationFn: async (data: FormData) => {
      await api.post("/departments", data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["departments"],
      });
      close();
    },
  });

  const {
    control,
    handleSubmit,
    setValue: setFormValue,
    getValues,
  } = useForm<FormData>({
    defaultValues: {
      name: {
        ru: "",
        en: "",
      },
      departmentFeatures: [],
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

            <MultiSelect
              label="Особенности отдела"
              placeholder="Выберите особенности"
              data={featuresData}
              onChange={(values) => setFeatures(values)}
              value={features}
            />
            {features && (
              <DepartmentFeaturesControlInput
                features={features}
                control={control}
                setFormValue={setFormValue}
              />
            )}
            {/* Uncomment when services are available */}
            {/* <Controller
              name="service_ids"
              control={control}
              render={({ field }) => (
                <MultiSelect
                  data={
                    (!isServicesLoagin &&
                      services.map(
                        (s: {
                          id: number;
                          name: { [key: string]: string };
                        }) => ({
                          value: String(s.id),
                          label: s.name["ru"],
                        })
                      )) ||
                    []
                  }
                  {...field}
                  value={field.value?.map(String) || []}
                  onChange={(values) => field.onChange(values.map(Number))}
                  placeholder="Выберите сервисы"
                  searchable
                />
              )}
            /> */}
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
  features,
  setFormValue,
}: {
  features: string[];
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  control: Control<FormData, any>;
  setFormValue: UseFormSetValue<FormData>;
}) => {
  const timeSlots = getHoursFromToHourEnd("09:00", "18:30");

  const [departmentFeatures, setDepartmentFeatures] = useState<
    { type: string; value: string }[]
  >([]);

  useEffect(() => {
    setFormValue("departmentFeatures", departmentFeatures);
  }, [departmentFeatures, setFormValue]);

  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");

  useEffect(() => {
    if (startTime && endTime) {
      const time = `${startTime}-${endTime}`;
      setDepartmentFeatures((prev) => [...prev, { type: "TIME", value: time }]);
    }
  }, [startTime, endTime]);

  for (const feature of features) {
    switch (feature) {
      case "TIME":
        return (
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
        );
      case "LETTER":
        return <Input placeholder="Введите букву" />;
      case "SHOW":
        return <Input placeholder="Введите информацию для показа" />;
      default:
        return null;
    }
  }
};
