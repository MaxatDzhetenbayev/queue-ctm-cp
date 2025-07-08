import { api } from "@/shared";
import { queryClient } from "@/shared/providers/query-providers";
import { Button } from "@mantine/core";
import { useMutation } from "@tanstack/react-query";
import React from "react";
import { toast } from "react-toastify";

export enum AbsenceStatus {
  WORKING = "WORKING", // Работает
  ARCHIVED = "ARCHIVED", // Архивирован
}

interface UpdateStatusButtonProps {
  leaveId: string;
  status: AbsenceStatus;
}

type UpdateStatusParams = UpdateStatusButtonProps;

export const AbsencesUpdateStatusButton = ({
  leaveId,
  status,
}: UpdateStatusButtonProps) => {
  const { mutate } = useMutation({
    mutationKey: ["absences-update-status"],
    mutationFn: async ({ leaveId, status }: UpdateStatusParams) => {
      const response = await api.patch(
        `/leaves/employee/${leaveId}/status/${status}`,
        {
          id: leaveId,
          status: status,
        }
      );
      return response.data;
    },

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["absences"],
      });
      toast.success(`Статус отсутствия успешно обновлен.`);
    },
  });

  return (
    <Button
      onClick={() =>
        mutate({
          leaveId,
          status:
            status === AbsenceStatus.ARCHIVED
              ? AbsenceStatus.WORKING
              : AbsenceStatus.ARCHIVED,
        })
      }
      p={5}
      variant="outline"
      color={status === AbsenceStatus.ARCHIVED ? "green" : "red"}
    >
      {status === AbsenceStatus.ARCHIVED ? "Восстановить" : "В архив"}
    </Button>
  );
};
