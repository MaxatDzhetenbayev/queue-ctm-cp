import { z } from "zod";

export const AbsenceSchema = z.object({
  id: z.string(),
  startDate: z.string(),
  endDate: z.string(),
  status: z.enum(["WORKING", "CANCELLED", "COMPLETED", "PLANNED"]),
  type: z.enum(["HOLIDAY", "SICK_LEAVE", "PERSONAL"]),
  comment: z.string().nullable(),
  employee: z.object({
    id: z.string(),
    fullName: z.string(),
  }),
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

// Схема для детальных данных отсутствия
export const AbsenceDetailsSchema = z.object({
  id: z.string(),
  comment: z.string().nullable(),
  startDate: z.string(),
  endDate: z.string(),
  type: z.enum(["HOLIDAY", "SICK_LEAVE", "PERSONAL"]),
  status: z.enum(["WORKING", "CANCELLED", "COMPLETED", "PLANNED"]),
  totalDays: z.number(),
  remainingDays: z.number(),
  employee: z.object({
    id: z.string(),
    fullName: z.string(),
  }),
});

export type Absence = z.infer<typeof AbsenceSchema>;
export type AbsencesResponse = z.infer<typeof AbsencesResponseSchema>;
export type AbsenceStatistics = z.infer<typeof AbsenceStatisticsSchema>;
export type CreateAbsenceType = z.infer<typeof CreateAbsenceSchema>;
export type AbsenceDetails = z.infer<typeof AbsenceDetailsSchema>;
