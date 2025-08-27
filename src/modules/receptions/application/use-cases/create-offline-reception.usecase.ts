import { CreateOfflineReceptionType } from "@/modules/receptions/domain/schemas/reception.schemas";
import { createOfflineReception } from "@/modules/receptions/infrastructure/api/reception.api";

import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useCreateOfflineReception = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreateOfflineReceptionType) =>
      createOfflineReception(data),
    onSuccess: () => {
      // Инвалидируем кеш приемов для обновления списка
      queryClient.invalidateQueries({ queryKey: ["manager-receptions"] });
    },
  });
};
