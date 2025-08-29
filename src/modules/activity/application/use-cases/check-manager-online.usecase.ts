import { OnlineCheckType } from "@/modules/activity/domain/schemas";
import { checkManagerOnline } from "@/modules/activity/infrastructure/api";

import { useQuery } from "@tanstack/react-query";

export const useCheckManagerOnline = () => {
  return useQuery<OnlineCheckType>({
    queryKey: ["manager-online-check"],
    queryFn: checkManagerOnline,
    retry: false,
  });
};
