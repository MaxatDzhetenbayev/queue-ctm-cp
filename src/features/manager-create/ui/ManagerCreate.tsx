"use client";
import { api } from "@/shared";
import { queryClient } from "@/shared/providers/query-providers";
import { Button, Flex, Input, Modal, MultiSelect, Select } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";

import { useMutation, useQuery } from "@tanstack/react-query";
import React, { useEffect, useState } from "react";
import { Controller, useForm, UseFormSetValue } from "react-hook-form";

interface DepartmentFeature {
  id: string;
  type: string;
  value: string;
}

interface FormData {
  login: string;
  // email: string;
  password: string;
  profile: {
    fullName: string;
    phone: string;
  };
  cabinet: number;
  table: number;
  role: string;
  department_id: string;
  auth_type: string;
  service_ids: string[];
  employee_features?: {
    [key: string]: string;
  };
}

const kazakhAlphabet = [
  "А",
  "Ә",
  "Б",
  "В",
  "Г",
  "Ғ",
  "Д",
  "Е",
  "Ё",
  "Ж",
  "З",
  "И",
  "Й",
  "К",
  "Қ",
  "Л",
  "М",
  "Н",
  "Ң",
  "О",
  "Ө",
  "П",
  "Р",
  "С",
  "Т",
  "У",
  "Ұ",
  "Ү",
  "Ф",
  "Х",
  "Һ",
  "Ц",
  "Ч",
  "Ш",
  "Щ",
  "Ъ",
  "Ы",
  "І",
  "Ь",
  "Э",
  "Ю",
  "Я",
];

export const ManagerCreate = ({ departmentId }: { departmentId: string }) => {
  const [opened, { open, close }] = useDisclosure(false);

  const { data: services, isLoading: isServicesLoading } = useQuery({
    queryKey: ["services"],
    queryFn: async () => {
      const res = await api.get(`/services`);
      return res.data;
    },
  });

  const { data: departmentFeatures } = useQuery<DepartmentFeature[]>({
    queryKey: ["department-features", departmentId],
    queryFn: async () => {
      const res = await api.get(`/departments/${departmentId}/features`);
      return res.data;
    },
  });

  const { mutate } = useMutation({
    mutationKey: ["manager-create"],
    mutationFn: async (data: FormData) => {
      await api.post("/users", data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["managers"],
      });
      close();
    },
  });

  const {
    control,
    handleSubmit,
    setValue: setFormValue,
  } = useForm<FormData>({
    defaultValues: {
      login: "",
      password: "",
      // email: "",
      profile: {
        fullName: "",
        phone: "",
      },
      auth_type: "CREDENTIALS",
      role: "MANAGER",
      department_id: departmentId,
    },
  });

  const onSubmit = (data: FormData) => mutate(data);
  return (
    <>
      <Modal opened={opened} onClose={close}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Flex direction="column" gap={15}>
            <Controller
              name="login"
              control={control}
              render={({ field }) => (
                <Input placeholder="Введите логин работника" {...field} />
              )}
            />
            {/* <Controller
              name="email"
              control={control}
              render={({ field }) => (
                <Input placeholder="Введите email работника" {...field} />
              )}
            /> */}
            <Controller
              name="password"
              control={control}
              render={({ field }) => (
                <Input placeholder="Введите пароль работника" {...field} />
              )}
            />
            <Controller
              name="profile.fullName"
              control={control}
              render={({ field }) => (
                <Input placeholder="Введите полное ФИО работника" {...field} />
              )}
            />
            <Controller
              name="profile.phone"
              control={control}
              render={({ field }) => (
                <Input
                  placeholder="Введите сотовый телефон работника"
                  {...field}
                />
              )}
            />
            <Controller
              name="cabinet"
              control={control}
              render={({ field }) => (
                <Input
                  placeholder="Введите кабинет работника"
                  onChange={(e) => field.onChange(Number(e.target.value))}
                  value={field.value}
                />
              )}
            />
            <Controller
              name="table"
              control={control}
              render={({ field }) => (
                <Input
                  placeholder="Введите стол работника"
                  onChange={(e) => field.onChange(Number(e.target.value))}
                  value={field.value}
                />
              )}
            />
            <Controller
              name="service_ids"
              control={control}
              render={({ field }) => (
                <MultiSelect
                  data={
                    (!isServicesLoading &&
                      services.map(
                        (s: {
                          id: string;
                          name: { ru: string; kz: string };
                        }) => ({
                          value: s.id, // уже строка
                          label: s.name["ru"],
                        })
                      )) ||
                    []
                  }
                  {...field}
                  value={field.value || []}
                  onChange={(values) => field.onChange(values)}
                  placeholder="Выберите сервисы за которые будет отвечать работник"
                  searchable
                />
              )}
            />
            {departmentFeatures && (
              <EmployeeFeaturesForm
                departmentFeatures={departmentFeatures}
                setFormValue={setFormValue}
              />
            )}
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

const EmployeeFeaturesForm = ({
  departmentFeatures,
  setFormValue,
}: {
  departmentFeatures: DepartmentFeature[];
  setFormValue: UseFormSetValue<FormData>;
}) => {
  const [startLetter, setStartLetter] = useState<string>();
  const [endLetter, setEndLetter] = useState<string>();

  useEffect(() => {
    if (startLetter && endLetter) {
      const letters = `${startLetter}-${endLetter}`;
      setFormValue("employee_features", {
        LETTER: letters,
      });
    }
  }, [startLetter, endLetter, setFormValue]);

  return (
    <Flex>
      <Flex direction="column" gap={10}>
        {departmentFeatures.some(
          (feature) => feature.type === "LETTER" && feature.value === "true"
        ) && (
          <>
            Выберите буквы за которые отвечает работник
            <Select
              label="С какой буквы"
              data={kazakhAlphabet}
              value={startLetter}
              onChange={(value) => {
                setStartLetter(value || "");
                setEndLetter(""); // сброс endLetter при смене начала
              }}
              placeholder="Начальная буква"
            />
            <Select
              label="По какую букву"
              data={kazakhAlphabet.filter(
                (letter) =>
                  startLetter &&
                  kazakhAlphabet.indexOf(letter) >
                    kazakhAlphabet.indexOf(startLetter)
              )}
              value={endLetter}
              onChange={(value) => setEndLetter(value || "")}
              placeholder="Конечная буква"
              disabled={!startLetter}
            />
          </>
        )}
      </Flex>
    </Flex>
  );
};
