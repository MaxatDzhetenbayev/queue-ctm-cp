import { Absence } from "../schemas/absences.schemas";

export const mapAbsenceType = (type: string): string => {
  switch (type) {
    case "VACATION":
      return "Отпуск";
    case "SICK_LEAVE":
      return "Больничный";
    case "PERSONAL":
      return "Личное";
    default:
      return type;
  }
};

export const mapAbsenceTypeToId = (type: string): string => {
  switch (type) {
    case "VACATION":
      return "vacation";
    case "SICK_LEAVE":
      return "sick_leave";
    case "PERSONAL":
      return "personal";
    default:
      return type.toLowerCase();
  }
};

export const transformAbsenceData = (absence: Absence) => {
  return {
    id: absence.id,
    employeeName: absence.employeeName,
    employeeId: absence.id, // Используем id как employeeId для совместимости
    type: mapAbsenceTypeToId(absence.type),
    typeLabel: mapAbsenceType(absence.type),
    startDate: absence.startDate.split("T")[0],
    endDate: absence.endDate.split("T")[0],
    status: absence.status.toLowerCase(),
    comment: absence.comment || undefined,
    createdAt: absence.startDate.split("T")[0], // Используем startDate как createdAt
  };
};
