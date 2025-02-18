import { IReception } from "@/entities";
import { IReceptionFormated } from "@/entities/receptions";

export const receptionTransformDto = (
  data: IReception[]
): IReceptionFormated[] => {
  return data.map((item) => ({
    ...item,
    profile: item.user.profile,
    user: { id: item.user.id },
  }));
};
