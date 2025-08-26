import { axiosApi } from "@/shared/lib/client";

import { DepartmentType } from "../../domain/schemas";

/**
 * API для получения списка отделов.
 *
 * @returns {Promise<DepartmentType[]>} Список отделов.
 */
export async function fetchDepartmentList(): Promise<DepartmentType[]> {
  const response = await axiosApi.get<DepartmentType[]>("/departments");
  return response.data;
}
