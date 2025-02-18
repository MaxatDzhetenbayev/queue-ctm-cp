"use client";
import React from "react";
import { useReceptionDetail } from "../hooks";

export const ReceptionDetail = ({ id }: { id: number }) => {
  const { data, isLoading } = useReceptionDetail(id);

  return (
    <div>
      {isLoading ? (
        <div>loading</div>
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
  );
};
