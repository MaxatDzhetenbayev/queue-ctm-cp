import { KeyStatsSchemaType } from "@/modules/analytics/domain/schemas/analytics";
import { useAnalyticsDateStore } from "@/modules/analytics/domain/stores/analytics-date.store";
import { fetchKeyStats } from "@/modules/analytics/infrastructure/api/client.api";

import { useQuery } from "@tanstack/react-query";

export const useGetKeyStats = () => {
  const { selectedDate, centerId } = useAnalyticsDateStore();

  return useQuery<KeyStatsSchemaType>({
    queryFn: () =>
      fetchKeyStats(selectedDate || undefined, centerId || undefined),
    queryKey: ["key-stats", selectedDate, centerId],
  });
};
