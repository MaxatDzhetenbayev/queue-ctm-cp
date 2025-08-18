import { EmployeeType } from "../../domain/schemas";
import { fetchEmployeeList } from "../../infrastructure/api/employee.api";
import { useQuery } from "@tanstack/react-query";

export const useGetEmployeeList = () => {
  return useQuery<EmployeeType>({
    queryKey: ["employee-list"],
    queryFn: fetchEmployeeList,
  });
};
