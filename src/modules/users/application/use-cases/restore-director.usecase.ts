import { useCustomMutation } from "@/shared/lib/client";
import { restoreEmployee } from "../../infrastructure/api/employee.api";

export const useRestoreDirector = (directorId: string) => {
  return useCustomMutation({
    mutationFn: () => restoreEmployee(directorId),
    customConfig: {
      invalidateQueries: [
        ["director-list"],
        ["employee-list", directorId],
      ],
    },
    toastConfig: {
      successMessage: "Директор восстановлен",
    },
  });
};
