import { useCustomMutation } from "@/shared/lib/client";
import { removeEmployee } from "../../infrastructure/api/employee.api";

export const useRemoveDirector = (directorId: string) => {
  return useCustomMutation({
    mutationFn: () => removeEmployee(directorId),
    customConfig: {
      invalidateQueries: [["director-list"]],
    },
    toastConfig: {
      successMessage: "Директор удален",
      errorMessage: "Не удалось удалить директора",
    },
  });
};
