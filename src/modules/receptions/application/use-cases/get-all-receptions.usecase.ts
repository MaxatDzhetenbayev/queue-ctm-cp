import { GetAllReceptionsQueryType } from "../../domain/schemas/reception.schemas";
import { fetchAllReceptions } from "../../infrastructure/api/reception.api";
import { useQuery } from "@tanstack/react-query";

export const useGetAllReceptions = (params?: GetAllReceptionsQueryType) => {
  return useQuery({
    queryKey: ["all-receptions", params],
    queryFn: () => fetchAllReceptions(params),
  });
};
