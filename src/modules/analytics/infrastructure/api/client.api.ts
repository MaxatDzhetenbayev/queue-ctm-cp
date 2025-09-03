import {
  ActivityAnalyticsSchemaType,
  DepartmentLoadAnalyticsSchemaType,
  KeyStatsSchemaType,
  ReceptionsAuthTypeData,
  ServiceTypeCountsSchemaType,
} from "@/modules/analytics/domain/schemas/analytics";
import { axiosApi } from "@/shared/lib/client";

/**
 * Получение ключевых статистических данных.
 *
 * @param date - Дата в ISO формате (опционально)
 * @returns {Promise<KeyStatsSchemaType>}  Ключевые статистические данные.
 *
 */
export async function fetchKeyStats(
  date?: string
): Promise<KeyStatsSchemaType> {
  const url = date
    ? `/analytics/key-stats?date=${date}`
    : `/analytics/key-stats`;
  const response = await axiosApi.get<KeyStatsSchemaType>(url);
  return response.data;
}
/**
 * Получение статистики по типам услуг.
 *
 * @param date - Дата в ISO формате (опционально)
 * @returns {Promise<ServiceTypeCountsSchemaType>} - Статистика по типам услуг.
 *
 */
export async function fetchGetServiceTypeCounts(
  date?: string
): Promise<ServiceTypeCountsSchemaType> {
  const url = date
    ? `/analytics/service-types?date=${date}`
    : `/analytics/service-types`;
  const response = await axiosApi.get<ServiceTypeCountsSchemaType>(url);
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
 * @param date - Дата в ISO формате (опционально)
 * @returns {Promise<DepartmentLoadAnalyticsSchemaType>} - Статистика по загруженности департаментов.
 *
 */
export async function fetchGetDepartmentLoad(
  date?: string
): Promise<DepartmentLoadAnalyticsSchemaType> {
  const url = date
    ? `/analytics/department-load?date=${date}`
    : `/analytics/department-load`;
  const response = await axiosApi.get<DepartmentLoadAnalyticsSchemaType>(url);
  return response.data;
}

/**
 * Получение статистики по типам авторизации.
 *
 * @param date - Дата в ISO формате (опционально)
 * @returns {Promise<ReceptionsAuthTypeData[]>} - Статистика по типам авторизации.
 *
 */
export const getReceptionsAuthType = async (
  date?: string
): Promise<ReceptionsAuthTypeData[]> => {
  const url = date
    ? `/analytics/receptions-user-registration-type?date=${date}`
    : "/analytics/receptions-user-registration-type";
  const response = await axiosApi.get(url);
  return response.data;
};
