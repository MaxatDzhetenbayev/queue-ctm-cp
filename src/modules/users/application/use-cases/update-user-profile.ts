import { UseFormReset } from "react-hook-form";

import { useCustomMutation } from "@/shared/lib/client";

import { updateUserProfile } from "../../infrastructure/api/user.api";
import { IUser } from "../../types";

export const useUpdateUserProfile = ({
  reset,
}: {
  reset: UseFormReset<IUser>;
}) => {
  return useCustomMutation({
    mutationFn: (userData: Partial<IUser>) => updateUserProfile("1", userData),
    toastConfig: {
      successMessage: `Ваши данные успешно обновлены!`,
      errorMessage: `Не удалось обновить ваши данные. Пожалуйста, попробуйте еще раз.`,
    },
    customConfig: {
      invalidateQueries: [["user-profile"]],
      onSuccess: () => {
        reset();
      },
    },
    mutationConfig: {},
  });
};
