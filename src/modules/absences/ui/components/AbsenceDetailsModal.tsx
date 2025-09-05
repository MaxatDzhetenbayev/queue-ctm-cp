"use client";

import { Calendar, Clock, FileText, MapPin, User } from "lucide-react";
import React from "react";

import { Badge } from "@/shared/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/shared/components/ui/dialog";

import { useGetAbsenceDetails } from "../../application/use-cases";
import { mapAbsenceType } from "../../domain/utils/absence.utils";

interface AbsenceDetailsModalProps {
  isOpen: boolean;
  onClose: () => void;
  leaveId: string;
}

const getTypeColor = (type: string) => {
  switch (type) {
    case "HOLIDAY":
      return "bg-blue-100 text-blue-800 border-blue-200";
    case "SICK_LEAVE":
      return "bg-red-100 text-red-800 border-red-200";
    case "PERSONAL":
      return "bg-yellow-100 text-yellow-800 border-yellow-200";
    default:
      return "bg-gray-100 text-gray-800 border-gray-200";
  }
};

const getStatusColor = (status: string) => {
  switch (status) {
    case "WORKING":
      return "bg-green-100 text-green-800 border-green-200";
    case "CANCELLED":
      return "bg-red-100 text-red-800 border-red-200";
    case "COMPLETED":
      return "bg-gray-100 text-gray-800 border-gray-200";
    case "PLANNED":
      return "bg-blue-100 text-blue-800 border-blue-200";
    default:
      return "bg-gray-100 text-gray-800 border-gray-200";
  }
};

const getStatusLabel = (status: string) => {
  switch (status) {
    case "WORKING":
      return "Активно";
    case "CANCELLED":
      return "Отменено";
    case "COMPLETED":
      return "Завершено";
    case "PLANNED":
      return "Запланировано";
    default:
      return status;
  }
};

const formatDate = (dateString: string) => {
  // Извлекаем только дату из ISO строки (YYYY-MM-DD)
  let dateOnly: string;

  if (dateString.includes("T")) {
    // Извлекаем дату до символа T
    dateOnly = dateString.split("T")[0];
  } else {
    // Дата уже в формате YYYY-MM-DD
    dateOnly = dateString;
  }

  // Парсим только дату без времени
  const [year, month, day] = dateOnly.split("-").map(Number);
  const localDate = new Date(year, month - 1, day); // month - 1, так как месяцы в JS начинаются с 0

  return localDate.toLocaleDateString("ru-RU", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });
};

// Проверяем, прошла ли дата
const isDatePassed = (dateString: string) => {
  const today = new Date();

  // Извлекаем только дату из ISO строки
  let dateOnly: string;
  if (dateString.includes("T")) {
    dateOnly = dateString.split("T")[0];
  } else {
    dateOnly = dateString;
  }

  // Парсим только дату без времени
  const [year, month, day] = dateOnly.split("-").map(Number);
  const targetDate = new Date(year, month - 1, day);

  const todayLocal = new Date(
    today.getFullYear(),
    today.getMonth(),
    today.getDate()
  );
  return targetDate < todayLocal;
};

// Проверяем, является ли отсутствие завершенным
const isAbsenceCompleted = (absenceDetails: any) => {
  return (
    absenceDetails.remainingDays === 0 &&
    isDatePassed(absenceDetails.endDate) &&
    absenceDetails.status === "COMPLETED"
  );
};

export const AbsenceDetailsModal = ({
  isOpen,
  onClose,
  leaveId,
}: AbsenceDetailsModalProps) => {
  const {
    data: absenceDetails,
    isLoading,
    isError,
  } = useGetAbsenceDetails(leaveId);

  if (isLoading) {
    return (
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Детали отсутствия</DialogTitle>
          </DialogHeader>
          <div className="flex items-center justify-center py-12">
            <div className="text-center">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-4"></div>
              <p className="text-gray-600">Загрузка данных...</p>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    );
  }

  if (isError) {
    return (
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Детали отсутствия</DialogTitle>
          </DialogHeader>
          <div className="flex items-center justify-center py-12">
            <div className="text-center">
              <p className="text-red-600 mb-2">Ошибка загрузки данных</p>
              <p className="text-gray-600">Попробуйте еще раз</p>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    );
  }

  if (!absenceDetails) {
    return (
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Детали отсутствия</DialogTitle>
          </DialogHeader>
          <div className="flex items-center justify-center py-12">
            <div className="text-center">
              <p className="text-gray-600">Данные не найдены</p>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle className="flex items-center justify-between">
            <span>Детали отсутствия</span>
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Основная информация */}
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <User className="h-5 w-5 text-gray-500" />
              <div>
                <h3 className="text-lg font-semibold text-gray-900">
                  {absenceDetails.employee.fullName}
                </h3>
                <p className="text-sm text-gray-600">
                  ID сотрудника: {absenceDetails.employee.id}
                </p>
              </div>
            </div>
          </div>

          {/* Тип и статус отсутствия */}
          <div className="flex items-center space-x-3">
            <Badge className={getTypeColor(absenceDetails.type)}>
              {mapAbsenceType(absenceDetails.type)}
            </Badge>
            <Badge className={getStatusColor(absenceDetails.status)}>
              {getStatusLabel(absenceDetails.status)}
            </Badge>
          </div>

          {/* Даты */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <Calendar className="h-4 w-4 text-gray-500" />
                <span className="text-sm font-medium text-gray-700">
                  Дата начала
                </span>
              </div>
              <p className="text-lg font-semibold text-gray-900">
                {formatDate(absenceDetails.startDate)}
              </p>
            </div>

            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <Calendar className="h-4 w-4 text-gray-500" />
                <span className="text-sm font-medium text-gray-700">
                  Дата окончания
                </span>
              </div>
              <p className="text-lg font-semibold text-gray-900">
                {formatDate(absenceDetails.endDate)}
              </p>
            </div>
          </div>

          {/* Длительность или статус завершения */}
          <div className="bg-gray-50 rounded-lg p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Clock className="h-4 w-4 text-gray-500" />
                <span className="text-sm font-medium text-gray-700">
                  {isAbsenceCompleted(absenceDetails)
                    ? "Статус"
                    : "Длительность отсутствия"}
                </span>
              </div>
              <span className="text-lg font-semibold text-gray-900">
                {isAbsenceCompleted(absenceDetails)
                  ? "Прошло"
                  : `${absenceDetails.totalDays} дней`}
              </span>
            </div>
          </div>

          {/* Комментарий */}
          <div className="space-y-2">
            <div className="flex items-center space-x-2">
              <FileText className="h-4 w-4 text-gray-500" />
              <span className="text-sm font-medium text-gray-700">
                Комментарий
              </span>
            </div>
            {absenceDetails.comment ? (
              <p className="text-gray-900 bg-gray-50 rounded-lg p-3">
                {absenceDetails.comment}
              </p>
            ) : (
              <p className="text-gray-500 bg-gray-50 rounded-lg p-3 italic">
                Комментарий не указан
              </p>
            )}
          </div>

          {/* Дополнительная информация */}
          <div className="bg-blue-50 rounded-lg p-4">
            <h4 className="text-sm font-medium text-blue-900 mb-2">
              Дополнительная информация
            </h4>
            <div className="grid grid-cols-1 gap-4 text-sm">
              {!isAbsenceCompleted(absenceDetails) && (
                <div>
                  <span className="text-blue-700">Осталось дней:</span>
                  <span className="ml-2 text-blue-900">
                    {absenceDetails.remainingDays}
                  </span>
                </div>
              )}
              {isAbsenceCompleted(absenceDetails) && (
                <div>
                  <span className="text-blue-700">Завершено:</span>
                  <span className="ml-2 text-blue-900">
                    {formatDate(absenceDetails.endDate)}
                  </span>
                </div>
              )}
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
