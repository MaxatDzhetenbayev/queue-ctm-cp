import { api } from "@/shared";
import { useMutation } from "@tanstack/react-query";

export const useLogout = () => {
  return useMutation({
    mutationFn: async () => await api.post("/auth/logout"),
    onSuccess: () => {
      window.location.href = `/login`;
    },
  });
};
