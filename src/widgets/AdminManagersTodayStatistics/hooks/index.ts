import { api } from "@/shared";
import { useQuery } from "@tanstack/react-query";

interface IManagerTodaySummary {
  completedReceptionsCount: string;
  problematicRate: string;
  averageRating: string;
  managerLoad: string;
}

export const useManagerTodaySummary = () => {
  return useQuery<IManagerTodaySummary>({
    queryKey: ["manager-total-today-summary"],
    queryFn: async () =>
      (await api.get("/kpi/centers/managers/today/summary")).data,
  });
};
