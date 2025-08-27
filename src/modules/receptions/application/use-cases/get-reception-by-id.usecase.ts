import { fetchReceptionById } from "@/modules/receptions/infrastructure/api/reception.api";

import { useQuery } from "@tanstack/react-query";

export const useGetReceptionById = (id: string) => {
  return useQuery({
    queryKey: ["reception", id],
    queryFn: () => fetchReceptionById(id),
    enabled: !!id,
  });
};
