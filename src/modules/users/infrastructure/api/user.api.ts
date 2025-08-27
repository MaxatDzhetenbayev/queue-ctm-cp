import { axiosApi } from "@/shared/lib/client";

import {
  ClientInfoType,
 UpdateClientType,
  UserProfileType,
} from "../../domain/schemas";

/**
 * Получение профиля пользователя.
 *
 * @returns {Promise<UserProfileType>} - Данные профиля пользователя.
 *
 */
export async function fetchUserProfile(): Promise<UserProfileType> {
  const response = await axiosApi.get<UserProfileType>("/users/profile");
  return response.data;
}

/**
 * Получение информации о клиенте по id.
 *
 * @param clientId - ID клиента
 *
 * @returns {Promise<ClientInfoType>} - Данные клиента с его историей посещения.
 *
 */
export async function fetchClientInfo(
  clientId: string
): Promise<ClientInfoType> {
  const response = await axiosApi.get<ClientInfoType>(
    `/users/clients/${clientId}`
  );
  return response.data;
}

/**
 * Обновление информации клиента.
 *
 * @param clientId - ID клиента
 * @param data - Данные для обновления
 *
 * @returns {Promise<{ id: string; profile: any }>} Результат обновления.
 *
 */
export async function updateClient(
  clientId: string,
  data: UpdateClientType
): Promise<{ id: string; profile: any }> {
  const response = await axiosApi.put<{ id: string; profile: any }>(
    `/users/visitors/${clientId}`,
    data
  );
  return response.data;
}
