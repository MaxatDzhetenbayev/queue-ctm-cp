import { axiosApi } from "@/shared/lib/client";

import { EmployeeOneType, EmployeeType } from "../../domain/schemas";

/**
 * API для работы с пользователями.
 *
 * @param page - Номер страницы
 * @param departmentId - ID отдела
 * @param serviceId - ID услуги
 * @param query - Строка запроса для поиска сотрудников по ФИО
 *
 * @returns {Promise<EmployeeType>} Данные пользователей.
 *
 */
export async function fetchEmployeeList(
  page: number,
  departmentId?: string | null,
  serviceId?: string | null,
  query?: string | null
): Promise<EmployeeType> {
  const params: {
    departmentId?: string | null;
    serviceId?: string | null;
    search?: string | null;
    page: number;
    limit: number;
  } = {
    page,
    limit: 9,
  };

  if (departmentId) params.departmentId = departmentId;
  if (serviceId) params.serviceId = serviceId;
  if (query) params.search = query;

  const response = await axiosApi.get<EmployeeType>("/users/managers/center", {
    params,
  });
  return response.data;
}

/**
 * Получение  сотрудников по id.
 *
 * @param id - ID сотрудника
 *
 * @returns {Promise<EmployeeOneType>} Данные пользователей.
 *
 */
export async function fetchEmployeeById(id: string): Promise<EmployeeOneType> {
  const response = await axiosApi.get<EmployeeOneType>(`/users/${id}`);
  return response.data;
}

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
): Promise<EmployeeOneType> {
  const response = await axiosApi.get<EmployeeOneType>(
    `/receptions/managers/${id}`
  );
  return response.data;
}
