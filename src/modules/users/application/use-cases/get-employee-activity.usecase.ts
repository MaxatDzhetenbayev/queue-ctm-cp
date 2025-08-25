import { EmployeeActivityResponse } from "../../domain/schemas";
import { getEmployeeActivity } from "../../infrastructure/api";
import { useQuery } from "@tanstack/react-query";

export const useGetEmployeeActivity = (employeeId: string) => {
  return useQuery<EmployeeActivityResponse>({
    queryKey: ["employee-activity", employeeId],
    queryFn: () => getEmployeeActivity(employeeId),
    enabled: !!employeeId,
  });
};
