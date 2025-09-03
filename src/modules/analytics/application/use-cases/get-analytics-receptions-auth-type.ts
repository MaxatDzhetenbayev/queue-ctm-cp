import { useAnalyticsDateStore } from "@/modules/analytics/domain/stores/analytics-date.store";
import { getReceptionsAuthType } from "@/modules/analytics/infrastructure/api/client.api";

import { useQuery } from "@tanstack/react-query";

export const useGetReceptionsAuthType = () => {
  const { selectedDate } = useAnalyticsDateStore();

  return useQuery({
    queryKey: ["receptions-auth-type", selectedDate],
    queryFn: () => getReceptionsAuthType(selectedDate || undefined),
  });
};
