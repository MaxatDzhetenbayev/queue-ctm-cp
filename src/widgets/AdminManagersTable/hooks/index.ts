import { api } from "@/shared";
import { useQuery } from "@tanstack/react-query";

export const useManagersList = () => {
  return useQuery({
    queryKey: ["managers"],
    queryFn: async () => (await api.get("/users/managers/center")).data,
  });
};
