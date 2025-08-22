import { axiosApi } from "@/shared/lib/client";

import {
  ClientInfoType,
  UpdateClientType,
} from "../../domain/schemas/client.shemas";

/**
 * Получение  записей сотрудника по id.
 *
 * @param centerId - ID центра
 * @param clientId - ID клиента
 *
 * @returns {Promise<ClientInfoType>} - Данные клиента с его историей посещения.
 *
 */
export async function fetchClientInfo(
  centerId: string,
  clientId: string
): Promise<ClientInfoType> {
  const response = await axiosApi.get<ClientInfoType>(
    `/users/centers/${centerId}/clients/${clientId}`
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
