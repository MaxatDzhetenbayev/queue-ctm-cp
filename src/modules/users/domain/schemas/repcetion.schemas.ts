import { z } from "zod";

import { CenterSchema } from "./center.shemas";
import { DepartmentSchema } from "./department.shemas";
import { ServiceSchema } from "./service.shemas";
import { UserProfileSchema } from "./user.shemas";

export const ReceptionStatusSchema = z.enum([
  "PENDING",
  "WORKING",
  "DONE",
  "CANCELED",
  "NO_SHOW",
  "CALLED",
  "TRANSFERRED",
]);

export const ReceptionSchema = z.object({
  id: z.string(),
  date: z.date(),
  time: z.string(),
  status: ReceptionStatusSchema,
  comment: z.string().optional(),
  service: ServiceSchema,
  department: DepartmentSchema,
  center: CenterSchema,
  user: z.object({
    authType: z.enum(["OFFLINE", "TELEGRAM"]),
    ...UserProfileSchema.shape,
  }),
  employee: UserProfileSchema.optional(),
});

export type StatusesType = z.infer<typeof ReceptionStatusSchema>;
export type ReceptionType = z.infer<typeof ReceptionSchema>;
