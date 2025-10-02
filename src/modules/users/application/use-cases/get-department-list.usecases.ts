import { DepartmentType } from "@/modules/departments/domain/schemas";
import { fetchDepartmentList } from "@/modules/departments/infrastructure/api/department.api";

import { useQuery } from "@tanstack/react-query";

export const useGetDepartmentList = () => {
  return useQuery<DepartmentType[]>({
    queryKey: ["department-list"],
    queryFn: fetchDepartmentList,
  });
};
