import { fetchManagerReceptions } from "@/modules/receptions/infrastructure/api/reception.api";

import { useQuery } from "@tanstack/react-query";

export const useGetManagerReceptions = () => {
  return useQuery({
    queryKey: ["manager-receptions"],
    queryFn: fetchManagerReceptions,
    refetchInterval: 1 * 60 * 1000, // Обновляем каждые 1 минуту для реального времени
  });
};
