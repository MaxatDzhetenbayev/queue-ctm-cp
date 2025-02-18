import { api } from "@/shared";
import { queryClient } from "@/shared/providers/query-providers";
import { useMutation } from "@tanstack/react-query";

export enum Statuses {
  ASSIGMENT = 1,
  PENDING = 2,
  WORKING = 3,
  DONE = 4,
  CANCELED = 5,
  CHOICE = 6,
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
      queryClient.invalidateQueries({
        queryKey: ["receptions-list"],
      });
    },
  });
};
