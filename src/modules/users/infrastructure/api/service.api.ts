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

/**
 * API для получения услуги по ID.
 *
 * @param id - ID услуги.
 * @returns {Promise<ServiceType>} Данные услуги.
 */
export async function fetchService(id: string): Promise<ServiceType> {
  const response = await axiosApi.get<ServiceType>(`/services/${id}`);
  return response.data;
}

/**
 * API для создания услуги.
 *
 * @param data - Данные для создания услуги.
 * @param data.name - Название услуги.
 * @param data.parentId - ID родительской услуги (опционально).
 * @returns {Promise<ServiceType>} Созданная услуга.
 */
export async function createService(data: {
  name: Record<string, string>;
  parentId?: string;
}): Promise<ServiceType> {
  const response = await axiosApi.post<ServiceType>("/services", data);
  return response.data;
}

/**
 * API для обновления услуги.
 *
 * @param id - ID услуги.
 * @param data - Данные для обновления услуги.
 * @param data.name - Название услуги (опционально).
 * @param data.parentId - ID родительской услуги (опционально).
 * @returns {Promise<ServiceType>} Обновленная услуга.
 */
export async function updateService(
  id: string,
  data: { name?: Record<string, string>; parentId?: string }
): Promise<ServiceType> {
  const response = await axiosApi.patch<ServiceType>(`/services/${id}`, data);
  return response.data;
}


/**
 * API для удаления услуги.
 *
 * @param id - ID услуги.
 * @returns {Promise<void>} Результат удаления.
 */
export async function deleteService(id: string): Promise<void> {
  await axiosApi.delete(`/services/${id}`);
}
