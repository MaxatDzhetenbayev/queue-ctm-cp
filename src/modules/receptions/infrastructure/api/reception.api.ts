import {
  CreateOfflineReceptionType,
  ReceptionsListType,
  ReceptionType,
  UpdateReceptionStatusType,
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
