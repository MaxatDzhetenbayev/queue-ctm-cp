import { UpdateReceptionStatusType } from "@/modules/receptions/domain/schemas/reception.schemas";
import { updateReceptionStatus } from "@/modules/receptions/infrastructure/api/reception.api";

import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useUpdateReceptionStatus = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: UpdateReceptionStatusType) =>
      updateReceptionStatus(data),
    onSuccess: () => {
      // Инвалидируем кеш приемов для обновления списка
      queryClient.invalidateQueries({ queryKey: ["manager-receptions"] });
    },
  });
};
