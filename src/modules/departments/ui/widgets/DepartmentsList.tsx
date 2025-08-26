"use client";

import React from "react";

import { useGetDepartmentList } from "../../application/use-cases";
import { CreateDepartmentModal } from "../components/CreateDepartmentModal";
import { DepartmentHeader } from "../components/DepartmentHeader";
import { DepartmentList } from "../components/DepartmentList";

export const DepartmentsList = () => {
  const { data: departments, isLoading, isError } = useGetDepartmentList();

  if (isError) {
    return (
      <div className="text-center py-12">
        <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4"></div>
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
    <div className="space-y-6 mt-6">
      <div className="flex items-center justify-between">
        <DepartmentHeader total={departments?.length || 0} />
        <CreateDepartmentModal />
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <DepartmentList departments={departments || []} isLoading={isLoading} />
      </div>
    </div>
  );
};
