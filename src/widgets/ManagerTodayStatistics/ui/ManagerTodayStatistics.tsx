import React from "react";
import { useManagerTodaySummary } from "./hooks";

export const ManagerTodayStatistics = () => {
  const { data, isLoading } = useManagerTodaySummary();

  return isLoading ? (
    <div>loading...</div>
  ) : (
    <>
      <h2 className="text-2xl font-semibold mb-4">Дневная статистика</h2>
      <div className="grid grid-cols-2 gap-4 ">
        <div className="bg-purple-100 p-3  rounded-lg">
          <p className="text-sm font-medium">Обслуженные клиенты</p>
          <p className="text-2xl font-bold">{data?.totalReceptions}</p>
        </div>
        <div className="bg-red-50 p-3 rounded-lg">
          <p className="text-sm font-medium">Доля проблемных записей</p>
          <p className="text-2xl font-bold">{data?.problematicRate}</p>
        </div>
        <div className="bg-green-50 p-3 rounded-lg">
          <p className="text-sm font-medium">
            Средний рейтинг удовлетворенности
          </p>
          <p className="text-2xl font-bold">{data?.averageRating}</p>
        </div>
        <div className="bg-blue-50 p-3 rounded-lg">
          <p className="text-sm font-medium">Средняя загруженность</p>
          <p className="text-2xl font-bold">
            {data?.managerLoad.toPrecision(2)}%
          </p>
        </div>
      </div>
    </>
  );
};
