import { UpdateEmployeeType } from "@/modules/users/domain/schemas";
import { updateEmployee } from "@/modules/users/infrastructure/api/employee.api";
import { useCustomMutation } from "@/shared/lib/client";

export const useUpdateDirector = (directorId: string) => {
  return useCustomMutation({
    mutationFn: (data: UpdateEmployeeType) =>
      updateEmployee(directorId, data),
    customConfig: {
      invalidateQueries: [["director-list"], ["employee-list", directorId]],
    },
    toastConfig: {
      successMessage: "Информация директора обновлена",
      errorMessage: "Ошибка при обновлении информации директора",
    },
  });
};
