import { getAbsences } from "../../infrastructure/api/absences.api";
import { useQuery } from "@tanstack/react-query";

export const useGetUpcomingAbsences = () => {
  return useQuery({
    queryKey: ["upcoming-absences"],
    queryFn: () =>
      getAbsences({
        limit: 5,
        upcoming: true,
        sort: "desc",
      }),
  });
};
