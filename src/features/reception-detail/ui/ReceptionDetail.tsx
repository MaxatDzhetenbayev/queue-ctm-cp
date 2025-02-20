"use client";
import React from "react";
import { useReceptionDetail } from "../hooks";
import { Button, Modal } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";

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
              Имя: {data?.user?.profile?.full_name}
            </h1>
            <section className="mt-4">
              <p>Телефон: {data?.user?.profile?.phone}</p>
              <p>Время: {data?.time}</p>
              <p>Статус: {data?.status?.name}</p>
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
