"use client";
import React from "react";
import dynamic from "next/dynamic";
import { useReceptionDetail } from "../hooks";
import { Skeleton } from "@/shared";

const Modal = dynamic(() => import("@/shared/ui/modal"), {
  ssr: false,
  loading: () => <div>Загрузка...</div>,
});

export const ReceptionDetail = ({ id }: { id: number }) => {
  const { data, isLoading } = useReceptionDetail(id);

  return (
    <Modal triggerText="Детальнее">
      <div>
        {isLoading ? (
          <Skeleton className="w-full h-20" />
        ) : (
          <section>
            <h1 className="font-bold text-2xl">
              Имя: {data?.user.profile.full_name}
            </h1>
            <section className="mt-4">
              <p>Телефон: {data?.user.profile.phone}</p>
              <p>Время: {data?.time}</p>
              <p>Статус: {data?.status.name}</p>
            </section>
          </section>
        )}
      </div>
    </Modal>
  );
};
