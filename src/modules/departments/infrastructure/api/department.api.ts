import { axiosApi } from "@/shared/lib/client";

import { CreateDepartmentType, DepartmentType } from "../../domain/schemas";

/**
 * API для получения списка отделов.
 *
 * @returns {Promise<DepartmentType[]>} Список отделов.
 */
export async function fetchDepartmentList(): Promise<DepartmentType[]> {
  const response = await axiosApi.get<DepartmentType[]>("/departments");
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
  const response = await axiosApi.post<DepartmentType>("/departments", data);
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
    `/departments/${id}`,
    data
  );
  return response.data;
}
