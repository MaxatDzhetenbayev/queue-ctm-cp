import { axiosApi } from "@/shared/lib/client";

import { ReceptionType, StatusesType } from "../../domain/schemas";

/**
 * Получение  записей сотрудника по id.
 *
 * @param id - ID сотрудника
 * @param search - Поисковый запрос
 * @param status - Статус записи
 * @param date - Дата записи
 *
 * @returns {Promise<EmployeeOneType>} Данные записей сотрудника.
 *
 */
export async function fetchEmployeeReceptions(
  id: string,
  search?: string,
  status?: StatusesType,
  date?: string | null
): Promise<ReceptionType[]> {
  const response = await axiosApi.get<ReceptionType[]>(
    `/receptions/managers/${id}`,
    {
      params: {
        search,
        status: status,
        date: date,
      },
    }
  );
  return response.data;
}
