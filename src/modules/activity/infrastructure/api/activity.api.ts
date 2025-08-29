import { OnlineCheckType } from "@/modules/activity/domain/schemas";
import { axiosApi } from "@/shared/lib/client";

export const checkManagerOnline = async (): Promise<OnlineCheckType> => {
  const response = await axiosApi.get("/users/managers/online-check");
  return response.data;
};

export const startManagerWork = async (): Promise<void> => {
  await axiosApi.patch("/users/managers/start-work");
};
