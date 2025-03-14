"use client";
import { api } from "@/shared";
import { useEffect, useState } from "react";
import {
  Create,
  SimpleForm,
  TextInput,
  NumberInput,
  PasswordInput,
  SelectArrayInput,
} from "react-admin";

interface Service {
  id: number;
  name: {
    ru: string;
  };
  children: Service[];
}

const flattenServices = (services: Service[]) => {
  let result: {
    id: number;
    name: string;
  }[] = [];

  services.forEach((service: Service) => {
    if (service.children.length > 0) {
      result = result.concat(flattenServices(service.children));
    } else {
      result.push({
        id: service.id,
        name: service.name.ru,
      });
    }
  });

  return result;
};

export const ManagerCreate = () => {
  const [services, setServices] = useState<{ id: number; name: string }[]>([]);

  useEffect(() => {
    api.get("/services").then((response) => {
      setServices(flattenServices(response.data));
    });
  }, []);

  return (
    <Create
      transform={(data) => ({
        login: data.login,
        password: data.password,
        role: Number(data.role),
        table: Number(data.table),
        cabinet: Number(data.cabinet),
        profile: {
          full_name: data.full_name,
          phone: data.phone,
        },
        service_ids: data.service_ids || [],
      })}
    >
      <SimpleForm>
        <TextInput source="login" label="Логин" />
        <PasswordInput source="password" label="Пароль" />
        <NumberInput source="role" label="Роль" defaultValue={3} />
        <NumberInput source="table" label="Стол" />
        <NumberInput source="cabinet" label="Кабинет" />

        <TextInput source="full_name" label="ФИО" />
        <TextInput source="phone" label="Телефон" />

        <SelectArrayInput
          source="service_ids"
          label="Ответственный за услуги"
          choices={services}
        />
      </SimpleForm>
    </Create>
  );
};
