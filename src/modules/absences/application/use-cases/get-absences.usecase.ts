import { useQuery } from "@tanstack/react-query";

import { getAbsences } from "../../infrastructure/api/absences.api";

export const useGetAbsences = () => {
  return useQuery({
    queryKey: ["absences"],
    queryFn: getAbsences,
  });
};
