import { IReception } from "@/entities";

import { api } from "@/shared";
import { useQuery } from "@tanstack/react-query";

export const useReceptionDetail = (id: number) => {
  return useQuery<IReception>({
    queryKey: ["reception-detail", id],
    queryFn: async () => (await api.get(`/receptions/${id}`)).data,
  });
};
