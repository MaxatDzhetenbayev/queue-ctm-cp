import { z } from "zod";

export const ActivityStatusSchema = z.enum([
  "ONLINE",
  "OFFLINE",
  "OFFLINE_BY_REASON",
]);

export const LeaveSchema = z.object({
  id: z.string(),
  type: z.string(),
  status: z.string(),
  comment: z.string().nullable(),
});

export const ProfileSchema = z.object({
  id: z.string(),
  fullName: z.string(),
});

export const EmployeeActivitySchema = z.object({
  id: z.string(),
  employeeId: z.string(),
  status: ActivityStatusSchema,
  startDate: z.string(),
  endDate: z.string().nullable(),
  createdAt: z.string(),
  profile: ProfileSchema,
  leave: LeaveSchema.optional(),
  isActive: z.boolean(),
  employee: z.object({
    id: z.string(),
    fullName: z.string(),
  }),
});

export const EmployeeActivityResponseSchema = z.array(EmployeeActivitySchema);

export type ActivityStatus = z.infer<typeof ActivityStatusSchema>;
export type EmployeeActivity = z.infer<typeof EmployeeActivitySchema>;
export type EmployeeActivityResponse = z.infer<
  typeof EmployeeActivityResponseSchema
>;
