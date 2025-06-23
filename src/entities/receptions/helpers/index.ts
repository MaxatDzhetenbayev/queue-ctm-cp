import { IReception } from "@/entities";
import { IReceptionFormated } from "@/entities/receptions";

export const receptionTransformDto = (
  data: IReception[]
): IReceptionFormated[] => {
  return data.map((item) => ({
    ...item,
    time: new Date(item.time).toLocaleTimeString("ru-RU", {
      hour: "2-digit",
      minute: "2-digit",
    }),
    profile: item.user.profile,
    user: { id: item.user.id },
  }));
};
