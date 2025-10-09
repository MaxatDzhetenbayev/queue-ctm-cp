import { useCustomMutation } from "@/shared/lib/client";

import { archiveEmployee } from "../../infrastructure/api/employee.api";

export const useArchiveEmployee = (employeeId: string) => {
  return useCustomMutation({
    mutationFn: () => archiveEmployee(employeeId),
    customConfig: {
      invalidateQueries: [["employee-list"], ["employee-list", employeeId]],
    },
    toastConfig: {
      successMessage: "Сотрудник перенесен в архив",
    },
  });
};
