import { axiosApi } from "@/shared/lib/client";

import { EmployeeType } from "../../domain/schemas";

/**
 * API для работы с пользователями.
 *
 * @returns {Promise<EmployeeType>} Данные пользователей.
 */
export async function fetchEmployeeList(): Promise<EmployeeType> {
  const response = await axiosApi.get<EmployeeType>("/users/managers/center");
  return response.data;
}
