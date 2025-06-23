"use client";
import React from "react";
import { useReceptionDetail } from "../hooks";
import { Button, Modal } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { normalizeStatus } from "@/widgets/ManagerReceptions/ui/ManagerReceptions";

export const ReceptionDetail = ({ id }: { id: number }) => {
  const { data, isLoading } = useReceptionDetail(id);
  const [opened, { open, close }] = useDisclosure(false);
  return (
    <>
      <Modal opened={opened} onClose={close}>
        {isLoading ? (
          <div>loading</div>
        ) : (
          <section>
            <h1 className="font-bold text-2xl">
              Имя: {data?.user?.profile?.fullName}
            </h1>
            <section className="mt-4">
              <p>
                <strong>ИИН:</strong>
                {data?.user?.profile?.iin}
              </p>
              <p>
                <strong>Телефон:</strong> {data?.user?.profile?.phone}
              </p>
              <p>
                <strong>Дата записи:</strong>{" "}
                {new Date(data?.date as string).toLocaleDateString("ru-RU")}
              </p>
              <p>
                <strong>Время записи:</strong>{" "}
                {new Date(data?.time as string).toLocaleTimeString("ru-RU", {
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </p>
              <p>
                <strong>Статус:</strong> {normalizeStatus(data?.status)}
              </p>
              <p>
                <strong>Выбранный сервис:</strong> {data?.service?.name?.["ru"]}
              </p>
            </section>
          </section>
        )}
      </Modal>
      <Button variant="default" onClick={open}>
        Детальная информация
      </Button>
    </>
  );
};
