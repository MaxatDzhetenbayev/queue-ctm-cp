import { IReception } from "@/entities";
import { api } from "@/shared";
import { useQuery } from "@tanstack/react-query";

export const useManagerReceptions = () => {
  return useQuery<IReception[]>({
    queryKey: ["receptions-list"],
    queryFn: async () =>
      (
        await api.get("/receptions/managers/me", {
          params: {
            date: new Date().toISOString(),
          },
        })
      ).data,
    refetchInterval: 15000,
  });
};
