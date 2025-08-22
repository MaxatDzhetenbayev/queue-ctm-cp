import { z } from "zod";

export const AbsenceSchema = z.object({
  id: z.string(),
  startDate: z.string(),
  endDate: z.string(),
  status: z.enum(["WORKING", "CANCELLED", "COMPLETED"]),
  type: z.enum(["VACATION", "SICK_LEAVE", "PERSONAL"]),
  comment: z.string().nullable(),
  employeeName: z.string(),
});

export const AbsencesResponseSchema = z.object({
  total: z.number(),
  data: z.array(AbsenceSchema),
});

export const AbsenceStatisticsSchema = z.object({
  HOLIDAY: z.number(),
  SICK_LEAVE: z.number(),
  PERSONAL: z.number(),
});

// Схема для создания отсутствия
export const CreateAbsenceSchema = z.object({
  startDate: z.string().min(1, "Дата начала обязательна"),
  endDate: z.string().optional(),
  type: z.enum(["HOLIDAY", "SICK_LEAVE", "PERSONAL"]),
  comment: z.string().optional(),
});

export type Absence = z.infer<typeof AbsenceSchema>;
export type AbsencesResponse = z.infer<typeof AbsencesResponseSchema>;
export type AbsenceStatistics = z.infer<typeof AbsenceStatisticsSchema>;
export type CreateAbsenceType = z.infer<typeof CreateAbsenceSchema>;
