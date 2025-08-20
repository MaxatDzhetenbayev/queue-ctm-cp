import { axiosApi } from "@/shared/lib/client";

import { ClientInfoType } from "../../domain/schemas/client.shemas";

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
