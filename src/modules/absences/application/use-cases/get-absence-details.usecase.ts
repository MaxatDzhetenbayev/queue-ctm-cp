import { getAbsenceDetails } from "../../infrastructure/api/absences.api";
import { useQuery } from "@tanstack/react-query";

export const useGetAbsenceDetails = (leaveId: string) => {
  return useQuery({
    queryKey: ["absence-details", leaveId],
    queryFn: () => getAbsenceDetails(leaveId),
    enabled: !!leaveId,
  });
};
