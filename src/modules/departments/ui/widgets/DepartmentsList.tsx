"use client";

import React from "react";

import { useGetDepartmentList } from "../../application/use-cases";
import { DepartmentHeader } from "../components/DepartmentHeader";
import { DepartmentList } from "../components/DepartmentList";

export const DepartmentsList = () => {
  const { data: departments, isLoading, isError } = useGetDepartmentList();

  if (isError) {
    return (
      <div className="text-center py-12">
        <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <svg
            className="w-8 h-8 text-red-600"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z"
            />
          </svg>
        </div>
        <h3 className="text-lg font-medium text-gray-900 mb-2">
          Ошибка загрузки
        </h3>
        <p className="text-gray-500">
          Не удалось загрузить список отделов. Попробуйте обновить страницу.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <DepartmentHeader total={departments?.length || 0} />

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <DepartmentList departments={departments || []} isLoading={isLoading} />
      </div>
    </div>
  );
};
