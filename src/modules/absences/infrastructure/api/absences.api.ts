import { axiosApi } from "@/shared/lib/client";

import {
  AbsenceDetails,
  AbsenceDetailsSchema,
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
 * Получение детальных данных отсутствия
 * @param leaveId - ID отсутствия
 * @returns Promise с детальными данными отсутствия
 */
export const getAbsenceDetails = async (
  leaveId: string
): Promise<AbsenceDetails> => {
  const response = await axiosApi.get(`/leaves/${leaveId}`);
  const data = response.data;

  // Валидация данных с помощью схемы
  const validationResult = AbsenceDetailsSchema.safeParse(data);

  if (!validationResult.success) {
    console.warn(
      "Валидация данных отсутствия не прошла:",
      validationResult.error
    );
    // Возвращаем данные даже если валидация не прошла
    return data as AbsenceDetails;
  } else {
    console.log("Данные отсутствия успешно валидированы");
    return validationResult.data;
  }
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
