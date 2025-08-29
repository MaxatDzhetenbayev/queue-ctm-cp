import { CreateOfflineReceptionType } from "@/modules/receptions/domain/schemas/reception.schemas";
import { createOfflineReception } from "@/modules/receptions/infrastructure/api/reception.api";
import { useCustomMutation } from "@/shared/lib/client";

export const useCreateOfflineReception = () => {
  return useCustomMutation({
    mutationFn: (data: CreateOfflineReceptionType) =>
      createOfflineReception(data),
    customConfig: {
      invalidateQueries: [
        ["manager-receptions"],
        { queryKey: ["client-info"], refetchType: "refetch" },
      ],
    },
    toastConfig: {
      successMessage: "Прием успешно создан",
    },
  });
};
