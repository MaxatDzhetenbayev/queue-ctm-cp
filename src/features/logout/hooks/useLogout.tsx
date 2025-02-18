import { api } from "@/shared";
import { useMutation } from "@tanstack/react-query";
import { useParams } from "next/navigation";

export const useLogout = () => {
  const locale = useParams().locale;

  return useMutation({
    mutationFn: async () => await api.post("/auth/logout"),
    onSuccess: () => {
      window.location.href = `/${locale}/login`;
    },
  });
};
