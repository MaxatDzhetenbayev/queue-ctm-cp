"use client";

import React from "react";
import { useManagerReceptions } from "../hooks/index";
import { receptionTransformDto } from "../../../entities/receptions/helpers";
import { Skeleton } from "@/shared";
import {
  ChangeReceptiontionStatusButton,
  ReceptionDetail,
  Statuses,
} from "@/features";

export const ManagerReceptions = () => {
  const { data, isLoading, isError } = useManagerReceptions();

  if (!isLoading || !isError) {
  }

  const receptionTableHeader = [
    "Имя",
    "Телефон",
    "Время",
    "Статус",
    "Действия",
  ];

  return (
    <div className="overflow-auto h-full max-h-[330px]">
      {isLoading ? (
        <div>
          <Skeleton className="w-[200px] h-5" />
          <Skeleton className="w-full h-10 mt-3" />
          <Skeleton className="w-full h-10 mt-3" />
          <Skeleton className="w-full h-10 mt-3" />
          <Skeleton className="w-full h-10 mt-3" />
          <Skeleton className="w-full h-10 mt-3" />
        </div>
      ) : (
        <>
          <h2 className="text-2xl font-semibold mb-4">Приемы</h2>
          {data === undefined ? (
            <div>Нет записей</div>
          ) : (
            <table className="w-full">
              <thead className="">
                <tr className="bg-neutral-50">
                  {receptionTableHeader.map((header) => (
                    <th
                      key={header}
                      className="px-6 py-3 text-left text-sm font-medium"
                    >
                      {header}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-neutral-200">
                {receptionTransformDto(data).map((reception) => (
                  <tr
                    key={reception.id}
                    className="hover:bg-neutral-50 transition-colors"
                  >
                    <td className="px-6 py-2 text-sm">
                      {reception.profile.full_name}
                    </td>
                    <td className="px-6 py-2 text-sm">
                      {reception.profile.phone}
                    </td>
                    <td className="px-6 py-2 text-sm">{reception.time}</td>
                    <td className="px-6 py-2">
                      <span className="px-2 py-1 text-xs rounded-full bg-primary-100">
                        {reception.status.name}
                      </span>
                    </td>
                    <td className="px-6 py-2 space-x-2">
                      {reception.status.id === Statuses.DONE && (
                        <ReceptionDetail id={reception.id} />
                      )}
                      {reception.status.id === Statuses.CANCELED && (
                        <ReceptionDetail id={reception.id} />
                      )}
                      {reception.status.id === Statuses.PENDING && (
                        <>
                          <ChangeReceptiontionStatusButton
                            id={reception.id}
                            status={Statuses.WORKING}
                          >
                            Принять
                          </ChangeReceptiontionStatusButton>
                          <ChangeReceptiontionStatusButton
                            id={reception.id}
                            status={Statuses.CANCELED}
                          >
                            Отменить
                          </ChangeReceptiontionStatusButton>
                        </>
                      )}
                      {reception.status.id === Statuses.WORKING && (
                        <ChangeReceptiontionStatusButton
                          id={reception.id}
                          status={Statuses.DONE}
                        >
                          Завершить
                        </ChangeReceptiontionStatusButton>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </>
      )}
    </div>
  );
};
