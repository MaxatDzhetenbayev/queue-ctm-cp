"use client";

import { BarChart3, Calendar, UserCheck, Users, UserX } from "lucide-react";
import React from "react";

import { Badge } from "@/shared/components/ui/badge";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/shared/components/ui/card";

import { useGetAbsenceStatistics } from "../../application/use-cases";

const getTypeInfo = (type: string) => {
  switch (type) {
    case "HOLIDAY":
      return {
        label: "Отпуск",
        icon: Calendar,
        color: "bg-blue-500",
        bgColor: "bg-blue-50",
        textColor: "text-blue-700",
      };
    case "SICK_LEAVE":
      return {
        label: "Больничный",
        icon: UserX,
        color: "bg-red-500",
        bgColor: "bg-red-50",
        textColor: "text-red-700",
      };
    case "PERSONAL":
      return {
        label: "Личные дела",
        icon: UserCheck,
        color: "bg-yellow-500",
        bgColor: "bg-yellow-50",
        textColor: "text-yellow-700",
      };
    default:
      return {
        label: type,
        icon: Calendar,
        color: "bg-gray-500",
        bgColor: "bg-gray-50",
        textColor: "text-gray-700",
      };
  }
};

export const AbsencesStatistics = () => {
  const { data: statistics, isLoading, isError } = useGetAbsenceStatistics();

  if (isLoading) {
    return (
      <Card>
        <CardContent className="flex flex-col items-center justify-center py-8">
          <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-600 mb-2"></div>
          <p className="text-xs text-gray-600">Загрузка статистики...</p>
        </CardContent>
      </Card>
    );
  }

  if (isError) {
    return (
      <Card>
        <CardContent className="flex flex-col items-center justify-center py-8">
          <p className="text-xs text-red-600 mb-1">Ошибка загрузки</p>
          <p className="text-xs text-gray-600">
            Не удалось загрузить статистику
          </p>
        </CardContent>
      </Card>
    );
  }

  if (!statistics) {
    return (
      <Card>
        <CardContent className="flex flex-col items-center justify-center py-8">
          <p className="text-xs text-gray-600">Нет данных для отображения</p>
        </CardContent>
      </Card>
    );
  }

  const totalAbsences =
    statistics.HOLIDAY + statistics.SICK_LEAVE + statistics.PERSONAL;

  // Преобразуем данные в формат для отображения
  const statisticsData = Object.entries(statistics || {}).map(
    ([type, count]) => {
      const typeInfo = getTypeInfo(type);
      const percentage =
        totalAbsences > 0 ? Math.round((count / totalAbsences) * 100) : 0;

      return {
        type,
        label: typeInfo.label,
        count,
        percentage,
        color: typeInfo.color,
        bgColor: typeInfo.bgColor,
        textColor: typeInfo.textColor,
        icon: typeInfo.icon,
      };
    }
  );

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <BarChart3 className="h-5 w-5" />
          <span>Статистика отсутствий</span>
          <Badge variant="secondary" className="ml-auto">
            {totalAbsences}
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {/* Общая статистика */}
          <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
            <div className="flex items-center space-x-2">
              <Users className="h-4 w-4 text-gray-600" />
              <span className="text-sm font-medium text-gray-700">
                Всего отсутствий
              </span>
            </div>
            <span className="text-lg font-bold text-gray-900">
              {totalAbsences}
            </span>
          </div>

          {/* Детальная статистика по типам */}
          <div className="space-y-3">
            {statisticsData.map((stat) => {
              const IconComponent = stat.icon;

              return (
                <div key={stat.type} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <div className={`p-1 rounded-full ${stat.bgColor}`}>
                        <IconComponent className="h-3 w-3" />
                      </div>
                      <span className="text-sm font-medium text-gray-700">
                        {stat.label}
                      </span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <span className="text-sm text-gray-600">
                        {stat.count}
                      </span>
                      <span className="text-sm font-semibold text-gray-900">
                        {stat.percentage}%
                      </span>
                    </div>
                  </div>

                  {/* Прогресс бар */}
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className={`h-2 rounded-full ${stat.color}`}
                      style={{ width: `${stat.percentage}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
