import { z } from "zod";

export const KeyStatsSchema = z.object({
  totalManagers: z.object({
    value: z.number(),
    activeManagers: z.number(),
  }),
  totalReceptions: z.object({
    value: z.number(),
    doneReceptions: z.number(),
  }),
  receptionsDonePercentage: z.number(),
});

export type KeyStatsSchemaType = z.infer<typeof KeyStatsSchema>;
