import { fetchServiceList } from "@/modules/users/infrastructure/api/service.api";

import { ServiceType } from "../../domain/schemas";
import { useQuery } from "@tanstack/react-query";

export const useGetServiceList = () => {
  return useQuery<ServiceType[]>({
    queryKey: ["service-list"],
    queryFn: fetchServiceList,
  });
};
