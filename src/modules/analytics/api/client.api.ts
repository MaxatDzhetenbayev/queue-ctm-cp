import { KeyStatsSchemaType } from "@/modules/analytics/schemas/analytics";
import { axiosApi } from "@/shared/lib/client";

/**
 * Получение ключевых статистических данных.
 *
 * @returns {Promise<KeyStatsSchemaType>} - Ключевые статистические данные.
 *
 */
export async function fetchKeyStats(): Promise<KeyStatsSchemaType> {
  const response = await axiosApi.get<KeyStatsSchemaType>(
    `/analytics/key-stats`
  );
  return response.data;
}
