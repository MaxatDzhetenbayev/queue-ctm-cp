import {
  ActivityAnalyticsSchemaType,
  DepartmentLoadAnalyticsSchemaType,
  KeyStatsSchemaType,
  ServiceTypeCountsSchemaType,
} from "@/modules/analytics/domain/schemas/analytics";
import { axiosApi } from "@/shared/lib/client";

/**
 * Получение ключевых статистических данных.
 *
 * @returns {Promise<KeyStatsSchemaType>}  Ключевые статистические данные.
 *
 */
export async function fetchKeyStats(): Promise<KeyStatsSchemaType> {
  const response = await axiosApi.get<KeyStatsSchemaType>(
    `/analytics/key-stats`
  );
  return response.data;
}
/**
 * Получение статистики по типам услуг.
 *
 * @returns {Promise<ServiceTypeCountsSchemaType>} - Статистика по типам услуг.
 *
 */
export async function fetchGetServiceTypeCounts(): Promise<ServiceTypeCountsSchemaType> {
  const response = await axiosApi.get<ServiceTypeCountsSchemaType>(
    `/analytics/service-types`
  );
  return response.data;
}
/**
 * Получение статистики по активности центра.
 *
 * @returns {Promise<ActivityAnalyticsSchemaType>} - Статистика по активности центра.
 *
 */
export async function fetchGetActivityAnalytics(): Promise<ActivityAnalyticsSchemaType> {
  const response = await axiosApi.get<ActivityAnalyticsSchemaType>(
    `/analytics/activity`
  );
  return response.data;
}
/**
 * Получение статистики по загруженности департаментов.
 *
 * @returns {Promise<DepartmentLoadAnalyticsSchemaType>} - Статистика по загруженности департаментов.
 *
 */
export async function fetchGetDepartmentLoad(): Promise<DepartmentLoadAnalyticsSchemaType> {
  const response = await axiosApi.get<DepartmentLoadAnalyticsSchemaType>(
    `/analytics/department-load`
  );
  return response.data;
}
