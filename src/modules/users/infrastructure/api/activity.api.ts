import { axiosApi } from "@/shared/lib/client";

import {
  EmployeeActivityResponse,
  EmployeeActivityResponseSchema,
} from "../../domain/schemas";

export const getEmployeeActivity = async (
  employeeId: string
): Promise<EmployeeActivityResponse> => {
  const response = await axiosApi.get(`/activity/employee/${employeeId}`);
  return EmployeeActivityResponseSchema.parse(response.data);
};
