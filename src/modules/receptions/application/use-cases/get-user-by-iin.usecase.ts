import { fetchUserByIin } from "@/modules/receptions/infrastructure/api/reception.api";

import { useQuery } from "@tanstack/react-query";

export const useGetUserByIin = (iin: string | null) => {
  return useQuery({
    queryKey: ["user-by-iin", iin],
    queryFn: () => fetchUserByIin(iin!),
    enabled: !!iin && iin.length === 12,
    retry: false, // Не повторяем запрос при ошибке 404
  });
};
