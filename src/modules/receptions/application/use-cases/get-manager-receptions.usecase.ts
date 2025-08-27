import { fetchManagerReceptions } from "@/modules/receptions/infrastructure/api/reception.api";

import { useQuery } from "@tanstack/react-query";

export const useGetManagerReceptions = () => {
  return useQuery({
    queryKey: ["manager-receptions"],
    queryFn: fetchManagerReceptions,
    refetchInterval: 5000, // Обновляем каждые 5 секунд для реального времени
  });
};
