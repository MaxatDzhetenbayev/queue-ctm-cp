import { ClientInfoType } from "../../domain/schemas/client.shemas";
import { fetchClientInfo } from "../../infrastructure/api/client.api";
import { useQuery } from "@tanstack/react-query";

export const useGetClientInfo = ({ clientId }: { clientId: string }) => {
  return useQuery<ClientInfoType>({
    queryKey: ["client-info", clientId],
    queryFn: () => fetchClientInfo(clientId),
    enabled: !!clientId,
  });
};
