import { getAbsenceDetails } from "../../infrastructure/api/absences.api";
import { useQuery } from "@tanstack/react-query";

export const useGetAbsenceDetails = (employeeId: string) => {
  return useQuery({
    queryKey: ["absence-details", employeeId],
    queryFn: () => getAbsenceDetails(employeeId),
    enabled: !!employeeId,
  });
};
