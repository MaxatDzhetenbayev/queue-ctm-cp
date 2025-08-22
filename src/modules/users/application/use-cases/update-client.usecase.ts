import { UpdateClientType } from "@/modules/users/domain/schemas/client.shemas";
import { updateClient } from "@/modules/users/infrastructure/api/client.api";
import { useCustomMutation } from "@/shared/lib/client";

/**
 * Хук для обновления информации клиента
 * @param clientId - ID клиента
 * @returns Мутация для обновления клиента
 */
export const useUpdateClient = (clientId: string) => {
  return useCustomMutation({
    mutationFn: (data: UpdateClientType) => updateClient(clientId, data),
    customConfig: {
      invalidateQueries: [
        ["client-info"], // Инвалидируем всех клиентов (включая конкретного)
      ],
    },
    toastConfig: {
      successMessage: "Информация клиента успешно обновлена",
      errorMessage: "Ошибка при обновлении информации клиента",
    },
  });
};
