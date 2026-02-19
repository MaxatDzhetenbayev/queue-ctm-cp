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
 * @param centerId - ID центра (опционально)
 * @returns {Promise<KeyStatsSchemaType>}  Ключевые статистические данные.
 *
 */
export async function fetchKeyStats(
  date?: string,
  centerId?: string
): Promise<KeyStatsSchemaType> {
  const params = new URLSearchParams();
  if (date) params.set("date", date);
  if (centerId) params.set("centerId", centerId);
  const q = params.toString();
  const url = q ? `/analytics/key-stats?${q}` : `/analytics/key-stats`;
  const response = await axiosApi.get<KeyStatsSchemaType>(url);
  return response.data;
}
/**
 * Получение статистики по типам услуг.
 *
 * @param date - Дата в ISO формате (опционально)
 * @param centerId - ID центра (опционально)
 * @returns {Promise<ServiceTypeCountsSchemaType>} - Статистика по типам услуг.
 *
 */
export async function fetchGetServiceTypeCounts(
  date?: string,
  centerId?: string
): Promise<ServiceTypeCountsSchemaType> {
  const params = new URLSearchParams();
  if (date) params.set("date", date);
  if (centerId) params.set("centerId", centerId);
  const q = params.toString();
  const url = q ? `/analytics/service-types?${q}` : `/analytics/service-types`;
  const response = await axiosApi.get<ServiceTypeCountsSchemaType>(url);
  return response.data;
}
/**
 * Получение статистики по активности центра.
 *
 * @param centerId - ID центра (опционально)
 * @returns {Promise<ActivityAnalyticsSchemaType>} - Статистика по активности центра.
 *
 */
export async function fetchGetActivityAnalytics(
  centerId?: string
): Promise<ActivityAnalyticsSchemaType> {
  const url = centerId
    ? `/analytics/activity?centerId=${centerId}`
    : `/analytics/activity`;
  const response = await axiosApi.get<ActivityAnalyticsSchemaType>(url);
  return response.data;
}
/**
 * Получение статистики по загруженности департаментов.
 *
 * @param date - Дата в ISO формате (опционально)
 * @param centerId - ID центра (опционально)
 * @returns {Promise<DepartmentLoadAnalyticsSchemaType>} - Статистика по загруженности департаментов.
 *
 */
export async function fetchGetDepartmentLoad(
  date?: string,
  centerId?: string
): Promise<DepartmentLoadAnalyticsSchemaType> {
  const params = new URLSearchParams();
  if (date) params.set("date", date);
  if (centerId) params.set("centerId", centerId);
  const q = params.toString();
  const url = q
    ? `/analytics/department-load?${q}`
    : `/analytics/department-load`;
  const response = await axiosApi.get<DepartmentLoadAnalyticsSchemaType>(url);
  return response.data;
}

/**
 * Получение статистики по типам авторизации.
 *
 * @param date - Дата в ISO формате (опционально)
 * @param centerId - ID центра (опционально)
 * @returns {Promise<ReceptionsAuthTypeData[]>} - Статистика по типам авторизации.
 *
 */
export const getReceptionsAuthType = async (
  date?: string,
  centerId?: string
): Promise<ReceptionsAuthTypeData[]> => {
  const params = new URLSearchParams();
  if (date) params.set("date", date);
  if (centerId) params.set("centerId", centerId);
  const q = params.toString();
  const url = q
    ? `/analytics/receptions-user-registration-type?${q}`
    : "/analytics/receptions-user-registration-type";
  const response = await axiosApi.get(url);
  return response.data;
};
