"use client";

import { useRouter } from "next/navigation";

import { LoginSchemaType } from "../../domain/schemas/auth.shemas";
import { fetchUserLogin } from "../../infrastructure/api/auth.api";
import { useMutation } from "@tanstack/react-query";

export const useUserLogin = () => {
  const router = useRouter();
  return useMutation({
    mutationFn: (data: LoginSchemaType) => fetchUserLogin(data),
    onSuccess: () => {
      router.refresh();
    },
  });
};
