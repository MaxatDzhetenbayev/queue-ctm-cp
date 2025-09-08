import { useCustomMutation } from "@/shared/lib/client";

import { CreateAbsenceType } from "../../domain/schemas/absences.schemas";
import { createAbsence } from "../../infrastructure/api/absences.api";

/**
 * Хук для создания отсутствия
 * @param employeeId - ID сотрудника
 * @returns Мутация для создания отсутствия
 */
export const useCreateAbsence = (employeeId: string) => {
  return useCustomMutation({
    mutationFn: (data: CreateAbsenceType) => createAbsence(employeeId, data),
    customConfig: {
      invalidateQueries: [
        ["absences"],
        ["absence-statistics"],
        ["upcoming-absences"],
      ],
    },
    toastConfig: {
      successMessage: "Отсутствие успешно создано",
    },
  });
};
