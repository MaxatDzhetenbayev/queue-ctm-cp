import { IManagerTodaySummary } from "@/entities/kpi/models";
import { api } from "@/shared";
import { useQuery } from "@tanstack/react-query";

export const useManagerTodaySummary = ({
  id,
  variant
}: {
  id?: number, variant: "manager" | "center"
}) => {
  const option = variant === "manager"
    ? id ? `managers/${id}` : "managers/me"
    : id ? `centers/${id}/managers` : "centers/managers"


  return useQuery<IManagerTodaySummary>({
    queryKey: ["manager-today-summary", id],
    queryFn: async () =>
      (
        await api.get(
          `/kpi/${option}/today/summary`
        )
      ).data,
  });
};

export const useManagerWeekdayCompletedReceptions = ({
  id,
  variant
}: {
  id?: number, variant: "manager" | "center"
}) => {

  const option = variant === "manager"
    ? id ? `managers/${id}` : "managers/me"
    : id ? `centers/${id}/managers` : "centers/managers"

  return useQuery<{ [key: string]: string }[]>({
    queryKey: ["manager-weekday-completed", id],
    queryFn: async () =>
      (
        await api.get(
          `/kpi/${option}/weekday/receptions/completed`
        )
      ).data,
  });
};