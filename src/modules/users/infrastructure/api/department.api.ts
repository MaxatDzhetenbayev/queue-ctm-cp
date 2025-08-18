import { axiosApi } from "@/shared/lib/client";

import { DepartmentType } from "../../domain/schemas";

/**
 * API для работы с пользователями.
 *
 * @returns {Promise<EmployeeType>} Данные пользователей.
 */
export async function fetchDepartmentList(): Promise<DepartmentType[]> {
  const response = await axiosApi.get<DepartmentType[]>("/departments");
  return response.data;
}
