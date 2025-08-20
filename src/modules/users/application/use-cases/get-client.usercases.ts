import { ClientInfoType } from "../../domain/schemas/client.shemas";
import { fetchClientInfo } from "../../infrastructure/api/client.api";
import { useQuery } from "@tanstack/react-query";

export const useGetClientInfo = ({
  centerId,
  clientId,
}: {
  centerId?: string;
  clientId: string;
}) => {
  return useQuery<ClientInfoType>({
    queryKey: ["client-info", centerId, clientId],
    queryFn: () => fetchClientInfo(centerId!, clientId),
    enabled: !!centerId && !!clientId,
  });
};
