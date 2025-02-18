import { api } from "@/shared";
import { useQuery } from "@tanstack/react-query";

export const useProfile = () => {
  return useQuery({
    queryKey: ["profile"],
    queryFn: async () => {
      const { data, status } = await api.get("/users/profile");

      if (status === 401) {
        window.location.href = "/kz/login";
        return;
      }
      return data;
    },
  });
};
