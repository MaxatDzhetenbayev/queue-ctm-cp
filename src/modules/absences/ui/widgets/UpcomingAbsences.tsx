"use client";

import { Calendar, Clock, User } from "lucide-react";
import React from "react";

import { Badge } from "@/shared/components/ui/badge";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/shared/components/ui/card";

import { useGetUpcomingAbsences } from "../../application/use-cases";
import { transformAbsenceData } from "../../domain/utils/absence.utils";

interface UpcomingAbsence {
  id: string;
  employeeName: string;
  type: string;
  typeLabel: string;
  startDate: string;
  endDate: string;
}

interface UpcomingAbsencesProps {
  absences?: UpcomingAbsence[];
}

const getTypeColor = (type: string) => {
  switch (type) {
    case "vacation":
      return "bg-blue-100 text-blue-800 border-blue-200";
    case "sick_leave":
      return "bg-red-100 text-red-800 border-red-200";
    case "personal":
      return "bg-yellow-100 text-yellow-800 border-yellow-200";
    default:
      return "bg-gray-100 text-gray-800 border-gray-200";
  }
};

const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleDateString("ru-RU", {
    day: "2-digit",
    month: "2-digit",
  });
};

const getDaysUntil = (dateString: string) => {
  const today = new Date();
  const targetDate = new Date(dateString);
  const diffTime = targetDate.getTime() - today.getTime();
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

  if (diffDays === 0) return "Сегодня";
  if (diffDays === 1) return "Завтра";
  if (diffDays < 0) return "Уже началось";
  return `Через ${diffDays} дн.`;
};

export const UpcomingAbsences = ({
  absences: propAbsences,
}: UpcomingAbsencesProps) => {
  const {
    data: upcomingResponse,
    isLoading,
    isError,
  } = useGetUpcomingAbsences();

  const absences =
    propAbsences || upcomingResponse?.data?.map(transformAbsenceData) || [];

  if (isLoading) {
    return (
      <Card>
        <CardContent className="flex flex-col items-center justify-center py-8">
          <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-600 mb-2"></div>
          <p className="text-xs text-gray-600">Загрузка...</p>
        </CardContent>
      </Card>
    );
  }

  if (isError) {
    return (
      <Card>
        <CardContent className="flex flex-col items-center justify-center py-8">
          <p className="text-xs text-red-600 mb-1">Ошибка загрузки</p>
          <p className="text-xs text-gray-600">Не удалось загрузить данные</p>
        </CardContent>
      </Card>
    );
  }

  if (absences.length === 0) {
    return (
      <Card>
        <CardContent className="flex flex-col items-center justify-center py-8">
          <Calendar className="h-8 w-8 text-gray-400 mb-2" />
          <h3 className="text-sm font-medium text-gray-900 mb-1">
            Нет предстоящих отсутствий
          </h3>
          <p className="text-xs text-gray-600 text-center">
            На ближайшую неделю отсутствий не запланировано
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <Clock className="h-5 w-5" />
          <span>Ближайшие отсутствия</span>
          <Badge variant="secondary" className="ml-auto">
            {absences.length}
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {absences.map((absence) => (
            <div
              key={absence.id}
              className="flex items-start space-x-3 p-3 border rounded-lg hover:bg-gray-50 transition-colors"
            >
              <div className="flex-shrink-0">
                <User className="h-4 w-4 text-gray-500 mt-0.5" />
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex items-center space-x-2 mb-1">
                  <span className="text-sm font-medium text-gray-900 truncate">
                    {absence.employeeName}
                  </span>
                  <Badge className={`text-xs ${getTypeColor(absence.type)}`}>
                    {absence.typeLabel}
                  </Badge>
                </div>

                <div className="flex items-center space-x-2 text-xs text-gray-600">
                  <Calendar className="h-3 w-3" />
                  <span>
                    {formatDate(absence.startDate)} -{" "}
                    {formatDate(absence.endDate)}
                  </span>
                </div>

                <div className="mt-1">
                  <span className="text-xs font-medium text-blue-600">
                    {getDaysUntil(absence.startDate)}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};
