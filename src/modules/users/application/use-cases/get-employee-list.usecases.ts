import { EmployeeType } from "../../domain/schemas";
import { fetchEmployeeList } from "../../infrastructure/api/employee.api";
import { useQuery } from "@tanstack/react-query";

export const useGetEmployeeList = ({
  departmentId,
  serviceId,
  query,
  page,
  limit,
  status,
}: {
  departmentId?: string | null;
  serviceId?: string | null;
  query?: string;
  page?: number;
  limit?: number;
  status?: string | null;
}) => {
  return useQuery<EmployeeType>({
    queryKey: [
      "employee-list",
      departmentId,
      serviceId,
      query,
      page,
      limit,
      status,
    ],
    queryFn: () =>
      fetchEmployeeList(page, departmentId, serviceId, query, limit, status),
  });
};
