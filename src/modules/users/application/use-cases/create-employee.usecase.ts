import { axiosApi, useCustomMutation } from "@/shared/lib/client";

import { CreateEmployeeType } from "../../domain/schemas";

export const useCreateEmployee = () => {
  return useCustomMutation({
    mutationFn: async (data: CreateEmployeeType) => {
      const response = await axiosApi.post("/users", data);
      return response.data;
    },
    customConfig: {
      invalidateQueries: [["employee-list"]],
    },
    toastConfig: {
      successMessage: "Сотрудник успешно создан",
      errorMessage: "Ошибка при создании сотрудника",
    },
  });
};
