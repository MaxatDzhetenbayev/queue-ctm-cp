"use client";

import { useCustomMutation } from "@/shared/lib/client";

import { createDepartment } from "../../infrastructure/api/department.api";

export const useCreateDepartment = () => {
  return useCustomMutation({
    mutationFn: createDepartment,
    customConfig: {
      invalidateQueries: [["department-list"]],
    },
    toastConfig: {
      successMessage: "Отдел успешно создан",
      errorMessage: "Ошибка при создании отдела",
    },
  });
};
