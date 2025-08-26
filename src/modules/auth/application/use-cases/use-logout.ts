"use client";

import { useRouter } from "next/navigation";

import { useCustomMutation } from "@/shared/lib/client";

import { fetchUserLogout } from "../../infrastructure/api/auth.api";

export const useLogout = () => {
  const router = useRouter();
  return useCustomMutation({
    mutationFn: fetchUserLogout,
    customConfig: {
      onSuccess: () => {
        router.refresh();
      },
    },
    toastConfig: {
      successMessage: "Вы успешно вышли из системы",
      errorMessage: "Ошибка при выходе из системы",
    },
  });
};
