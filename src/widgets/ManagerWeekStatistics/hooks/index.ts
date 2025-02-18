import { api } from "@/shared";
import { useQuery } from "@tanstack/react-query";

export const useManagerWeekStatics = () => {
  return useQuery({
    queryKey: ["kpi-weekday-completed"],
    queryFn: async () => (await api.get("/kpi/weekday/completed")).data,
  });
};

interface IManagerTodayStatistics {
  completed: number;
  declined: number;
  total: number;
}

export const useManagerWeekStats = () => {
  return useQuery<IManagerTodayStatistics>({
    queryKey: ["manager-weekday-statistics"],
    queryFn: async () => (await api.get("/kpi/weekday/stats")).data,
  });
};
