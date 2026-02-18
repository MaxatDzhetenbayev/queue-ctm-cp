import { axiosApi } from "@/shared/lib/client";

import {
  EmployeeOneType,
  EmployeeType,
  UpdateEmployeeType,
} from "../../domain/schemas";

/**
 * API для работы с пользователями.
 *
 * @param page - Номер страницы
 * @param departmentId - ID отдела
 * @param serviceId - ID услуги
 * @param query - Строка запроса для поиска сотрудников по ФИО
 * @param limit - Количество сотрудников на странице
 * @param status - Статус сотрудника
 *
 * @returns {Promise<EmployeeType>} Данные пользователей.
 *
 */
export async function fetchEmployeeList(
  page?: number,
  departmentId?: string | null,
  serviceId?: string | null,
  query?: string,
  limit?: number,
  status?: string | null
): Promise<EmployeeType> {
  const params: {
    departmentId?: string | null;
    serviceId?: string | null;
    search?: string | null;
    page?: number;
    limit?: number;
    status?: string | null;
  } = {};
  if (limit) params.limit = limit;
  if (page) params.page = page;
  if (departmentId) params.departmentId = departmentId;
  if (serviceId) params.serviceId = serviceId;
  if (query) params.search = query;
  if (status) params.status = status;

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

/**
 * Обновление информации сотрудника.
 *
 * @param id - ID сотрудника
 * @param data - Данные для обновления
 *
 * @returns {Promise<{ id: string }>} Результат обновления.
 *
 */
export async function updateEmployee(
  id: string,
  data: UpdateEmployeeType
): Promise<{ id: string }> {
  const response = await axiosApi.put<{ id: string }>(
    `/users/managers/${id}`,
    data
  );
  return response.data;
}

/**
 * Отправить сотрудника в архив
 * @param id - ID сотрудника
 * @returns {Promise<{ id: string }>} Результат архивирования сотрудника.
 */
export async function archiveEmployee(id: string): Promise<{ id: string }> {
  const response = await axiosApi.post<{ id: string }>(
    `/employee/${id}/archive`
  );
  return response.data;
}

/**
 * Восстановить сотрудника из архива
 * @param id - ID сотрудника
 * @returns {Promise<{ id: string }>} Результат восстановления сотрудника.
 */
export async function restoreEmployee(id: string): Promise<{ id: string }> {
  const response = await axiosApi.post<{ id: string }>(
    `/employee/${id}/restore`
  );
  return response.data;
}

/**
 * Удалить сотрудника (NO_CONTENT)
 * @param id - ID сотрудника
 */
export async function removeEmployee(id: string): Promise<void> {
  await axiosApi.post(`/employee/${id}/remove`);
}
