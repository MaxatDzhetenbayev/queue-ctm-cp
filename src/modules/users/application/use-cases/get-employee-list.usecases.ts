import { EmployeeType } from "../../domain/schemas";
import { fetchEmployeeList } from "../../infrastructure/api/employee.api";
import { useQuery } from "@tanstack/react-query";

export const useGetEmployeeList = ({
  departmentId,
  serviceId,
  query,
  page,
  limit,
}: {
  departmentId?: string | null;
  serviceId?: string | null;
  query?: string;
  page?: number;
  limit?: number;
}) => {
  return useQuery<EmployeeType>({
    queryKey: ["employee-list", departmentId, serviceId, query, page, limit],
    queryFn: () =>
      fetchEmployeeList(page, departmentId, serviceId, query, limit),
  });
};
