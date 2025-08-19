import { fetchEmployeeReceptions } from "@/modules/users/infrastructure/api/receptions.api";

import { ReceptionType, StatusesType } from "../../domain/schemas";
import { useQuery } from "@tanstack/react-query";

export const useGetReceptionsByEmployeeIdList = (
  managerId: string,
  search?: string,
  status?: StatusesType,
  date?: string | null
) => {
  return useQuery<ReceptionType[]>({
    queryKey: ["manager-employee-list", managerId, date, status, search],
    queryFn: () => fetchEmployeeReceptions(managerId, search, status, date),
  });
};
