import { fetchManagerServices } from "@/modules/receptions/infrastructure/api/reception.api";

import { useQuery } from "@tanstack/react-query";

export const useGetManagerServices = () => {
  return useQuery({
    queryKey: ["manager-services"],
    queryFn: fetchManagerServices,
  });
};
