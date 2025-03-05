import { api } from "@/shared";
import { useQuery } from "@tanstack/react-query";

export const useManagerDetail = (id: number) => {
  return useQuery({
    queryKey: ["manager", id],
    queryFn: async () => (await api.get(`/users/managers/${id}`)).data,
    enabled: !!id,
  });
};

export const useManagerDetailCompleted = (id: number) => {
  return useQuery({
    queryKey: ["manager-detail-completed", id],
    queryFn: async () =>
      (await api.get(`/kpi/id/${id}/weekday/completed`)).data,
  });
};

export const useManagerDetailStats = (id: number) => {
  return useQuery({
    queryKey: ["manager-detail-stats", id],
    queryFn: async () => (await api.get(`/kpi/id/${id}/weekday/stats`)).data,
  });
};
export const useManagerDetailToday = (id: number) => {
  return useQuery({
    queryKey: ["manager-detail-today", id],
    queryFn: async () => (await api.get(`/kpi/id/${id}/today/summary`)).data,
  });
};
