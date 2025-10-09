import { useCustomMutation } from "@/shared/lib/client";

import { restoreEmployee } from "../../infrastructure/api/employee.api";

export const useRestoreEmployee = (employeeId: string) => {
  return useCustomMutation({
    mutationFn: () => restoreEmployee(employeeId),
    customConfig: {
      invalidateQueries: [["employee-list"], ["employee-list", employeeId]],
    },
    toastConfig: {
      successMessage: "Сотрудник восстановлен",
      errorMessage: "Не удалось восстановить сотрудника",
    },
  });
};
