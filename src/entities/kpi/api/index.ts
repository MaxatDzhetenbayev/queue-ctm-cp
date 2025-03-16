import { IManagerTodaySummary } from "@/entities/kpi/models";
import { api } from "@/shared";
import { useQuery } from "@tanstack/react-query";

export const useManagerTodaySummaryByCenter = ({
  center_id,
}: {
  center_id?: number;
}) => {
  return useQuery<IManagerTodaySummary>({
    queryKey: ["manager-today-summary-center", center_id],
    queryFn: async () =>
      (
        await api.get(
          `/kpi/centers/${center_id + "/" || ""}managers/today/summary`
        )
      ).data,
  });
};

export const useManagerTodaySummaryOne = ({ id }: { id?: number }) => {
  return useQuery<IManagerTodaySummary>({
    queryKey: ["manager-today-summary-one", id],
    queryFn: async () =>
      (await api.get(`/kpi/managers/${id || "me"}/today/summary`)).data,
  });
};

export const useManagerWeekdayCompletedReceptionsByCenter = ({
  center_id,
}: {
  center_id?: number;
}) => {
  console.log(center_id);
  return useQuery<{ [key: string]: string }[]>({
    queryKey: ["manager-weekday-completed-center", center_id],
    queryFn: async () =>
      (
        await api.get(
          `/kpi/centers/${
            center_id ? center_id + +"/" : ""
          }managers/weekday/receptions/completed`
        )
      ).data,
  });
};

export const useManagerWeekdayCompletedReceptionsByOne = ({
  id,
}: {
  id?: number;
}) => {
  return useQuery<{ [key: string]: string }[]>({
    queryKey: ["manager-weekday-completed-one", id],
    queryFn: async () =>
      (
        await api.get(
          `/kpi/managers/${id + "/" || "me"}weekday/receptions/completed`
        )
      ).data,
  });
};
