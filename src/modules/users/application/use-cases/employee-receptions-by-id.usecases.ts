import { fetchEmployeeReceptions } from "@/modules/users/infrastructure/api/receptions.api";

import { ReceptionType } from "../../domain/schemas";
import { useQuery } from "@tanstack/react-query";

export const useGetReceptionsByEmployeeIdList = (managerId: string) => {
  return useQuery<ReceptionType[]>({
    queryKey: ["manager-employee-list", managerId],
    queryFn: () => fetchEmployeeReceptions(managerId),
  });
};
