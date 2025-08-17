import { axiosApi } from "@/shared/lib/client";

import { LoginSchemaType } from "../../domain/schemas/auth.shemas";

/**
 * API для работы с аутентификацией.
 * @param {LoginSchemaType} data - Данные для входа.
 * @returns {Promise<string>} Ответ.
 */
export async function fetchUserLogin(data: LoginSchemaType): Promise<string> {
  console.log(process.env.NEXT_PUBLIC_API_URL + "/auth/login");

  const response = await axiosApi.post<string>("/auth/login", data);
  return response.data;
}

/**
 * API для работы с аутентификацией.
 * @returns {Promise<string>}.
 */
export async function fetchUserLogout(): Promise<string> {
  const response = await axiosApi.post<string>("/auth/logout");
  return response.data;
}
