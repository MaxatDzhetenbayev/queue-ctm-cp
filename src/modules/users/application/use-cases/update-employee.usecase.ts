import { UpdateEmployeeType } from "@/modules/users/domain/schemas";
import { updateEmployee } from "@/modules/users/infrastructure/api/employee.api";
import { useCustomMutation } from "@/shared/lib/client";

/**
 * Хук для обновления информации сотрудника
 * @param employeeId - ID сотрудника
 * @returns Мутация для обновления сотрудника
 */
export const useUpdateEmployee = (employeeId: string) => {
  return useCustomMutation({
    mutationFn: (data: UpdateEmployeeType) => updateEmployee(employeeId, data),
    customConfig: {
      invalidateQueries: [["employee-list", employeeId], ["employee-list"]],
    },
    toastConfig: {
      successMessage: "Информация сотрудника успешно обновлена",
      errorMessage: "Ошибка при обновлении информации сотрудника",
    },
  });
};
