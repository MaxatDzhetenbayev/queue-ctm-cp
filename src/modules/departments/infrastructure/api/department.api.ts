import { axiosApi } from "@/shared/lib/client";

import { CreateDepartmentType, DepartmentType } from "../../domain/schemas";

const DEPARTMENTS_ENDPOINT = "/departments";

/**
 * API для получения списка отделов.
 * @param centerId — ID центра (для суперадмина: департаменты этого центра; для админа центр из контекста).
 * @returns {Promise<DepartmentType[]>} Список отделов (при centerId — связи центр–департамент с id = centerDepartment.id).
 */
export async function fetchDepartmentList(
  centerId?: string | null
): Promise<DepartmentType[]> {
  const response = await axiosApi.get<DepartmentType[]>(
    DEPARTMENTS_ENDPOINT,
    centerId ? { params: { centerId } } : undefined
  );
  return response.data;
}

/**
 * API для получения справочника отделов (глобальные Department, id = Department.id).
 * Использовать при добавлении отдела к центру. Эндпоинт /departments/catalog всегда возвращает каталог.
 * @returns {Promise<DepartmentType[]>} Справочник отделов с id из таблицы Department.
 */
export async function fetchDepartmentCatalog(): Promise<DepartmentType[]> {
  const response = await axiosApi.get<DepartmentType[]>(
    `${DEPARTMENTS_ENDPOINT}/catalog`
  );
  return response.data;
}

/**
 * API для создания отдела.
 *
 * @param {CreateDepartmentType} data - Данные для создания отдела.
 * @returns {Promise<DepartmentType>} Созданный отдел.
 */
export async function createDepartment(
  data: CreateDepartmentType
): Promise<DepartmentType> {
  const response = await axiosApi.post<DepartmentType>(
    DEPARTMENTS_ENDPOINT,
    data
  );
  return response.data;
}

/**
 * API для обновления отдела.
 *
 * @param id - ID отдела.
 * @param data - Данные для обновления отдела.
 * @returns {Promise<DepartmentType>} Обновленный отдел.
 */
export async function updateDepartment(
  id: string,
  data: Partial<CreateDepartmentType>
): Promise<DepartmentType> {
  const response = await axiosApi.patch<DepartmentType>(
    `${DEPARTMENTS_ENDPOINT}/${id}`,
    data
  );
  return response.data;
}
