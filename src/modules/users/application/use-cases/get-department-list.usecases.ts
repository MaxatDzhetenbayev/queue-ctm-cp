import { fetchDepartmentList } from "@/modules/users/infrastructure/api/department.api";

import { DepartmentType } from "../../domain/schemas";
import { useQuery } from "@tanstack/react-query";

export const useGetDepartmentList = () => {
  return useQuery<DepartmentType[]>({
    queryKey: ["department-list"],
    queryFn: fetchDepartmentList,
  });
};
