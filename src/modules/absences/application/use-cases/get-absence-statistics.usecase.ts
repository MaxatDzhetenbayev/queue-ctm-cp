import { getAbsenceStatistics } from "../../infrastructure/api/absences.api";
import { useQuery } from "@tanstack/react-query";

export const useGetAbsenceStatistics = () => {
  return useQuery({
    queryKey: ["absence-statistics"],
    queryFn: getAbsenceStatistics,
  });
};
