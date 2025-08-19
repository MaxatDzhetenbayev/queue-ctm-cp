import { EmployeeOneType } from "../../domain/schemas";
import { fetchEmployeeById } from "../../infrastructure/api/employee.api";
import { useQuery } from "@tanstack/react-query";

export const useGetEmployeeById = ({ id }: { id: string }) => {
  return useQuery<EmployeeOneType>({
    queryFn: () => fetchEmployeeById(id),
    queryKey: ["employee-list", id],
    enabled: !!id,
  });
};
