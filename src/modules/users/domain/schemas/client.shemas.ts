import { z } from "zod";

import { ReceptionSchema } from "./repcetion.schemas";
import { UserProfileSchema } from "./user.shemas";

export const ClientInfoSchema = z.object({
  id: z.string(),
  profile: UserProfileSchema,
  receptions: z.array(ReceptionSchema),
});

export type ClientInfoType = z.infer<typeof ClientInfoSchema>;
