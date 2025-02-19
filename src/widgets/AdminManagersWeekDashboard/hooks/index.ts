import { api } from "@/shared";
import { useQuery } from "@tanstack/react-query";

export const useCenterManagersWeekStatics = () => {
  return useQuery({
    queryKey: ["kpi-admin-weekday-completed"],
    queryFn: async () => (await api.get("/kpi/center/weekday/completed")).data,
  });
};

interface IManagerTodayStatistics {
  completed: number;
  declined: number;
  total: number;
}

export const useCenterManagersWeekStats = () => {
  return useQuery<IManagerTodayStatistics>({
    queryKey: ["kpi-admin-weekday-stats"],
    queryFn: async () => (await api.get("/kpi/center/weekday/stats")).data,
  });
};
