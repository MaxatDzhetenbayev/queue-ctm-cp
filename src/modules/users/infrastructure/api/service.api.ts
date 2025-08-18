import { axiosApi } from "@/shared/lib/client";

import { ServiceType } from "../../domain/schemas";

/**
 * API для работы с услугами.
 *
 * @returns {Promise<ServiceType[]>} Данные услуг.
 */
export async function fetchServiceList(): Promise<ServiceType[]> {
  const response = await axiosApi.get<ServiceType[]>("/services");
  return response.data;
}
