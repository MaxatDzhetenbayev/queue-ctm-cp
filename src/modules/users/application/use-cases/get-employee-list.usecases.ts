import { EmployeeType } from "../../domain/schemas";
import { fetchEmployeeList } from "../../infrastructure/api/employee.api";
import { useQuery } from "@tanstack/react-query";

export const useGetEmployeeList = ({
  departmentId,
  serviceId,
  query,
}: {
  departmentId: string | null;
  serviceId: string | null;
  query: string | null;
}) => {
  return useQuery<EmployeeType>({
    queryKey: ["employee-list", departmentId, serviceId, query],
    queryFn: () => fetchEmployeeList(departmentId, serviceId, query),
  });
};
