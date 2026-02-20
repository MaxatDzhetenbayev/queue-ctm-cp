import { DepartmentType } from "../../domain/schemas";
import { fetchDepartmentList } from "../../infrastructure/api/department.api";
import { useQuery } from "@tanstack/react-query";

export const useGetDepartmentList = (centerId?: string | null) => {
  return useQuery<DepartmentType[]>({
    queryKey: ["department-list", centerId],
    queryFn: () => fetchDepartmentList(centerId),
  });
};
