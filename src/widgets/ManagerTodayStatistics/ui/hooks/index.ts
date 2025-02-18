import { api } from "@/shared";
import { useQuery } from "@tanstack/react-query";

interface IManagerTodaySummary {
  totalReceptions: number;
  problematicRate: number;
  averageRating: number;
  managerLoad: number;
}

export const useManagerTodaySummary = () => {
  return useQuery<IManagerTodaySummary>({
    queryKey: ["manager-today-summary"],
    queryFn: async () => (await api.get("/kpi/today/summary")).data,
  });
};
