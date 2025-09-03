import {
  CreateOfflineReceptionType,
  GetAllReceptionsQueryType,
  ManagerServicesType,
  PaginatedReceptionsType,
  ReceptionsListType,
  ReceptionType,
  UpdateReceptionStatusType,
  UserByIinType,
} from "@/modules/receptions/domain/schemas/reception.schemas";
import { axiosApi } from "@/shared/lib/client";

/**
 * Получение списка приемов для менеджера
 * @param params - Параметры для фильтрации
 * @param params.search - Поиск по ФИО, ИИН, БИН
 * @param params.status - Статус приема
 * @param params.date - Дата приема
 * @returns Promise<ReceptionsListType> - Список приемов
 */
export async function fetchManagerReceptions(params?: {
  search?: string;
  status?: string;
  date?: string;
}): Promise<ReceptionsListType> {
  const queryParams = new URLSearchParams();

  if (params?.search) {
    queryParams.append("search", params.search);
  }
  if (params?.status) {
    queryParams.append("status", params.status);
  }
  if (params?.date) {
    queryParams.append("date", params.date);
  }

  const url = queryParams.toString()
    ? `/receptions/managers/me?${queryParams.toString()}`
    : "/receptions/managers/me";

  const response = await axiosApi.get(url);
  return response.data;
}

/**
 * Обновление статуса приема
 * @param data - Данные для обновления статуса
 * @returns Promise<ReceptionType> - Данные записи
 */
export async function updateReceptionStatus(
  data: UpdateReceptionStatusType
): Promise<ReceptionType> {
  const response = await axiosApi.patch(
    `/receptions/${data.id}/status?status=${data.status}`,
    {
      comment: data.comment,
    }
  );
  return response.data;
}

/**
 * Создание оффлайн записи
 * @param data - Данные для создания оффлайн записи
 * @returns Promise<ReceptionType> - Данные записи
 */
export async function createOfflineReception(
  data: CreateOfflineReceptionType
): Promise<ReceptionType> {
  const response = await axiosApi.post("/receptions/offline", data);
  return response.data;
}

/**
 * Получение деталей приема
 * @param id - ID приема
 * @returns Promise<ReceptionType> - Данные записи
 */
export async function fetchReceptionById(id: string): Promise<ReceptionType> {
  const response = await axiosApi.get(`/receptions/${id}`);
  return response.data;
}

/**
 * Получение сервисов менеджера
 * @returns Promise<ManagerServicesType> - Данные сервисов
 */
export async function fetchManagerServices(): Promise<ManagerServicesType> {
  const response = await axiosApi.get("/services/manager");
  return response.data;
}

/**
 * Поиск пользователя по ИИН
 * @param iin - ИИН пользователя
 * @returns Promise<UserByIinType> - Данные пользователя
 */
export async function fetchUserByIin(iin: string): Promise<UserByIinType> {
  const response = await axiosApi.get(`/users/iin/${iin}`);
  return response.data;
}

/**
 * Получение всех записей (для админа)
 * @param params - Параметры для фильтрации
 * @param params.search - Поиск по ФИО
 * @param params.status - Статус приема
 * @param params.date - Дата приема
 * @param params.type - Тип авторизации
 * @returns Promise<PaginatedReceptionsType> - Пагинированный список приемов
 */
export async function fetchAllReceptions(
  params?: GetAllReceptionsQueryType
): Promise<PaginatedReceptionsType> {
  const queryParams = new URLSearchParams();

  if (params?.search) {
    queryParams.append("search", params.search);
  }
  if (params?.status) {
    queryParams.append("status", params.status);
  }
  if (params?.date) {
    queryParams.append("date", params.date);
  }
  if (params?.type) {
    queryParams.append("type", params.type);
  }
  if (params?.page) {
    queryParams.append("page", params.page.toString());
  }
  if (params?.limit) {
    queryParams.append("limit", params.limit.toString());
  }

  const url = queryParams.toString()
    ? `/receptions?${queryParams.toString()}`
    : "/receptions";

  const response = await axiosApi.get(url);
  return response.data;
}
