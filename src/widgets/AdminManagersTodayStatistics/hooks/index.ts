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
    queryKey: ["manager-total-today-summary"],
    queryFn: async () => (await api.get("/kpi/center/today/summary")).data,
  });
};
