import { z } from "zod";

import { ServiceSchema } from "./service.shemas";
import { UserProfileSchema } from "./user.shemas";

export const ReceptionSchema = z.object({
  id: z.string(),
  date: z.date(),
  time: z.date(),
  status: z.enum(["DONE", "PENDING", "CANCELLED"]),
  service: ServiceSchema,
  user: z.object({
    id: z.string(),
    authType: z.enum(["OFFLINE", "TELEGRAM"]),
    profile: UserProfileSchema,
  }),
});

export type ReceptionType = z.infer<typeof ReceptionSchema>;
