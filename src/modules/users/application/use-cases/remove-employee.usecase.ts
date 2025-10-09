import { useCustomMutation } from "@/shared/lib/client";

import { removeEmployee } from "../../infrastructure/api/employee.api";

export const useRemoveEmployee = (employeeId: string) => {
  return useCustomMutation({
    mutationFn: () => removeEmployee(employeeId),
    customConfig: {
      invalidateQueries: [["employee-list"], ["employee-list", employeeId]],
    },
    toastConfig: {
      successMessage: "Сотрудник удален",
      errorMessage: "Не удалось удалить сотрудника",
    },
  });
};
