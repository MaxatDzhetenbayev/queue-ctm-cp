import { api } from "@/shared";
import { queryClient } from "@/shared/providers/query-providers";
import { useMutation } from "@tanstack/react-query";

export enum Statuses {
  ASSIGMENT = 1,
  PENDING = "PENDING",
  WORKING = "WORKING",
  DONE = "DONE",
  CANCELED = "CANCELED",
  NO_SHOW = "NOSHOW",
  CALLED = "CALLED",
}

export interface ChangeReceptionStatusProps {
  id: number;
  status: Statuses;
}

export const useChangeReceptionStatus = () => {
  return useMutation({
    mutationFn: async ({ id, status }: ChangeReceptionStatusProps) => {
      return await api.patch(
        `/receptions/${id}/status`,
        {},
        {
          params: {
            status,
          },
        }
      );
    },
    onSuccess: () => {
      const queryKeys = [
        "receptions-list",
        "manager-today-summary",
        "manager-weekday-statistics",
        "kpi-weekday-completed",
      ];
      queryKeys.forEach((key) => {
        queryClient.invalidateQueries({ queryKey: [key] });
      });
    },
  });
};
