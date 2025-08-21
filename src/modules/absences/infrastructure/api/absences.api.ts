import { axiosApi } from "@/shared/lib/client";

import { AbsencesResponseSchema } from "../../domain/schemas/absences.schemas";

export const getAbsences = async () => {
  const response = await axiosApi.get("/leaves/center");
  return AbsencesResponseSchema.parse(response.data);
};
