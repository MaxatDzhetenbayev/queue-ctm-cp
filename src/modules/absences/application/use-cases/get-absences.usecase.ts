import { getAbsences } from "../../infrastructure/api/absences.api";
import { useQuery } from "@tanstack/react-query";

interface UseGetAbsencesParams {
  limit?: number;
  upcoming?: boolean;
  sort?: "asc" | "desc";
}

export const useGetAbsences = (params?: UseGetAbsencesParams) => {
  return useQuery({
    queryKey: ["absences", params],
    queryFn: () => getAbsences(params),
  });
};
