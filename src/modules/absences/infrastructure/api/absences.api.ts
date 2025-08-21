import { axiosApi } from "@/shared/lib/client";

import { AbsencesResponseSchema } from "../../domain/schemas/absences.schemas";

interface GetAbsencesParams {
  limit?: number;
  upcoming?: boolean;
  sort?: "asc" | "desc";
}

export const getAbsences = async (params?: GetAbsencesParams) => {
  const queryParams = new URLSearchParams();

  if (params?.limit) {
    queryParams.append("limit", params.limit.toString());
  }

  if (params?.upcoming !== undefined) {
    queryParams.append("upcoming", params.upcoming.toString());
  }

  if (params?.sort) {
    queryParams.append("sort", params.sort);
  }

  const url = `/leaves/center${
    queryParams.toString() ? `?${queryParams.toString()}` : ""
  }`;
  const response = await axiosApi.get(url);
  return AbsencesResponseSchema.parse(response.data);
};
