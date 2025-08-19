import { axiosApi } from "@/shared/lib/client";

import { ReceptionType } from "../../domain/schemas";

/**
 * Получение  записей сотрудника по id.
 *
 * @param id - ID сотрудника
 *
 * @returns {Promise<EmployeeOneType>} Данные записей сотрудника.
 *
 */
export async function fetchEmployeeReceptions(
  id: string
): Promise<ReceptionType[]> {
  const response = await axiosApi.get<ReceptionType[]>(
    `/receptions/managers/${id}`
  );
  return response.data;
}
