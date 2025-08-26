import { DepartmentType } from "../../domain/schemas";
import { fetchDepartmentList } from "../../infrastructure/api/department.api";
import { useQuery } from "@tanstack/react-query";

export const useGetDepartmentList = () => {
  return useQuery<DepartmentType[]>({
    queryKey: ["department-list"],
    queryFn: fetchDepartmentList,
  });
};
