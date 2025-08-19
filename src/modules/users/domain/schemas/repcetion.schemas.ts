import { z } from "zod";

import { ServiceSchema } from "./service.shemas";
import { UserProfileSchema } from "./user.shemas";

export const ReceptionStatusSchema = z.enum([
  "PENDING",
  "WORKING",
  "DONE",
  "CANCELLED",
  "NO_SHOW",
  "CALLED",
  "TRANSFERRED",
]);

export const ReceptionSchema = z.object({
  id: z.string(),
  date: z.date(),
  time: z.date(),
  status: z.enum([
    "PENDING",
		"WORKING",
    "DONE",
    "CANCELLED",
    "NO_SHOW",
    "CALLED",
    "TRANSFERRED",
  ]),
  service: ServiceSchema,
  user: z.object({
    id: z.string(),
    authType: z.enum(["OFFLINE", "TELEGRAM"]),
    profile: UserProfileSchema,
  }),
});

export type StatusesType = z.infer<typeof ReceptionStatusSchema>;
export type ReceptionType = z.infer<typeof ReceptionSchema>;
