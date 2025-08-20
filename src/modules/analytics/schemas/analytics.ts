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

export const ServiceTypeCountsSchema = z.array(
  z.object({
    name: z.object({
      kz: z.string(),
      ru: z.string(),
    }),
    count: z.number(),
  })
);

export type KeyStatsSchemaType = z.infer<typeof KeyStatsSchema>;
export type ServiceTypeCountsSchemaType = z.infer<typeof ServiceTypeCountsSchema>;
