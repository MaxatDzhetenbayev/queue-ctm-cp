import { KeyStatsSchemaType } from "@/modules/analytics/domain/schemas/analytics";
import { fetchKeyStats } from "@/modules/analytics/infrastructure/api/client.api";

import { useQuery } from "@tanstack/react-query";

export const useGetKeyStats = () => {
  return useQuery<KeyStatsSchemaType>({
    queryFn: () => fetchKeyStats(),
    queryKey: ["key-stats"],
  });
};
