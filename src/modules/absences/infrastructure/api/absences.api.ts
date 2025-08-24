import { axiosApi } from "@/shared/lib/client";

import {
  AbsencesResponse,
  AbsenceStatistics,
  CreateAbsenceType,
} from "../../domain/schemas/absences.schemas";

interface GetAbsencesParams {
  limit?: number;
  upcoming?: boolean;
  sort?: "asc" | "desc";
}

export const getAbsences = async (params?: GetAbsencesParams) => {
  const queryParams = new URLSearchParams();

  if (params?.limit) {
    queryParams.append("limit", params.limit.toString());
  }

  if (params?.upcoming !== undefined) {
    queryParams.append("upcoming", params.upcoming.toString());
  }

  if (params?.sort) {
    queryParams.append("sort", params.sort);
  }

  const url = `/leaves/center${
    queryParams.toString() ? `?${queryParams.toString()}` : ""
  }`;
  const response = await axiosApi.get<AbsencesResponse>(url);
  return response.data;
};

export const getAbsenceStatistics = async () => {
  const response = await axiosApi.get<AbsenceStatistics>(
    "/leaves/center/analytics/types"
  );
  return response.data;
};

/**
 * Получение детальных данных отсутствия сотрудника
 * @param employeeId - ID сотрудника
 * @returns Promise с детальными данными отсутствия
 */
export const getAbsenceDetails = async (employeeId: string) => {
  // TODO: Заменить на реальный API запрос
  // const response = await axiosApi.get(`/leaves/employee/${employeeId}`);
  // return response.data;

  // Моковые данные для демонстрации
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        id: employeeId,
        employeeName: "Иванов Иван Иванович",
        employeeId: employeeId,
        type: "HOLIDAY",
        typeLabel: "Отпуск",
        startDate: "2024-01-15",
        endDate: "2024-01-30",
        status: "WORKING",
        comment: "Ежегодный оплачиваемый отпуск",
        createdAt: "2024-01-10",
        department: "IT отдел",
        position: "Старший разработчик",
        totalDays: 16,
        remainingDays: 8,
      });
    }, 500); // Имитация задержки сети
  });
};

/**
 * Создание отсутствия для сотрудника
 * @param employeeId - ID сотрудника
 * @param data - Данные для создания отсутствия
 * @returns Promise с результатом создания
 */
export const createAbsence = async (
  employeeId: string,
  data: CreateAbsenceType
) => {
  const response = await axiosApi.post(`/leaves/employee/${employeeId}`, data);
  return response.data;
};
