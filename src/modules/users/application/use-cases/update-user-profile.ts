import { useCustomMutation } from "@/shared/lib/client";

import { updateUserProfile } from "../../infrastructure/api/user.api";
import { IUser } from "../../types";

export const useUpdateUserProfile = () => {
  return useCustomMutation({
    mutationFn: (userData: Partial<IUser>) => updateUserProfile("1", userData),
    toastConfig: {
      successMessage: `Ваши данные успешно обновлены!`,
      errorMessage: `Не удалось обновить ваши данные. Пожалуйста, попробуйте еще раз.`,
    },
  });
};
