import { z } from "zod";

export const OnlineCheckSchema = z.object({
  isOnline: z.boolean(),
});

export type OnlineCheckType = z.infer<typeof OnlineCheckSchema>;
