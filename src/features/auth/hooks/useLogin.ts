import { useMutation } from "@tanstack/react-query";
import { api } from "@/shared";

export interface ILoginData {
  login: string;
  password: string;
}

export const useLogin = () => {
  return useMutation({
    mutationKey: ["login"],
    mutationFn: async (data: ILoginData) => api.post("/auth/login", data),
    onSuccess: (res) => {
      const { user } = res.data;
      if (user.role === "ADMIN") {
        window.location.href = "/admin";
      } else {
        window.location.href = "/dashboard";
      }
    },
  });
};
