import { useAnalyticsDateStore } from "@/modules/analytics/domain/stores/analytics-date.store";
import { getReceptionsAuthType } from "@/modules/analytics/infrastructure/api/client.api";

import { useQuery } from "@tanstack/react-query";

export const useGetReceptionsAuthType = () => {
  const { selectedDate, centerId } = useAnalyticsDateStore();

  return useQuery({
    queryKey: ["receptions-auth-type", selectedDate, centerId],
    queryFn: () =>
      getReceptionsAuthType(selectedDate || undefined, centerId || undefined),
  });
};
