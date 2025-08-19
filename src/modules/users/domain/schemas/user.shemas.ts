import { z } from "zod";

export const UserProfileSchema = z.object({
  id: z.string(),
  fullName: z.string(),
  iin: z.string().optional(),
  phone: z.string().optional(),
});

export type UserProfileType = z.infer<typeof UserProfileSchema>;
