import { z } from "zod";

export const UserProfileSchema = z.object({
  id: z.string(),
  role: z.enum(["SUPERADMIN", "ADMIN", "USER"]).optional(),
  profile: z.object({
    id: z.string(),
    fullName: z.string(),
    phone: z.string(),
    iin: z.string(),
  }),
});

export const AuthVariantSchema = z.enum(["CREDENTIALS", "TELEGRAM", "OFFLINE"]);

export type UserProfileType = z.infer<typeof UserProfileSchema>;
export type AuthVariantType = z.infer<typeof AuthVariantSchema>;
