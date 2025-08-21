import { getReceptionsAuthType } from "../../infrastructure/api/client.api";
import { useQuery } from "@tanstack/react-query";

export const useGetReceptionsAuthType = () => {
  return useQuery({
    queryKey: ["receptions-auth-type"],
    queryFn: getReceptionsAuthType,
  });
};
