import {
  CreateOfflineReceptionType,
  ManagerServicesType,
  ReceptionsListType,
  ReceptionType,
  UpdateReceptionStatusType,
  UserByIinType,
} from "@/modules/receptions/domain/schemas/reception.schemas";
import { axiosApi } from "@/shared/lib/client";

// Получение списка приемов для менеджера
export async function fetchManagerReceptions(): Promise<ReceptionsListType> {
  const response = await axiosApi.get("/receptions/managers/me");
  return response.data;
}

// Обновление статуса приема
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

// Создание офлайн приема
export async function createOfflineReception(
  data: CreateOfflineReceptionType
): Promise<ReceptionType> {
  const response = await axiosApi.post("/receptions/offline", data);
  return response.data;
}

// Получение деталей приема
export async function fetchReceptionById(id: string): Promise<ReceptionType> {
  const response = await axiosApi.get(`/receptions/${id}`);
  return response.data;
}

// Получение сервисов менеджера
export async function fetchManagerServices(): Promise<ManagerServicesType> {
  const response = await axiosApi.get("/services/manager");
  return response.data;
}

// Поиск пользователя по ИИН
export async function fetchUserByIin(iin: string): Promise<UserByIinType> {
  const response = await axiosApi.get(`/users/iin/${iin}`);
  return response.data;
}
