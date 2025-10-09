"use client";

import {
  AlertCircle,
  Calendar,
  CheckCircle,
  Clock,
  User,
  XCircle,
} from "lucide-react";

import { mapAbsenceType } from "@/modules/absences/domain/utils/absence.utils";
import { Badge } from "@/shared/components/ui/badge";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/shared/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/shared/components/ui/dialog";

import { ActivityStatus } from "../../../domain/schemas";
import {
  ActivityDay,
  formatDate,
  formatTime,
  getActivityStatusLabel,
  getStatusLabel,
} from "../../../domain/utils";

interface ActivityDetailsModalProps {
  isOpen: boolean;
  onClose: () => void;
  day: ActivityDay;
  employeeName: string;
}

export const ActivityDetailsModal = ({
  isOpen,
  onClose,
  day,
  employeeName,
}: ActivityDetailsModalProps) => {
  const getStatusIcon = (status: ActivityStatus) => {
    switch (status) {
      case "ONLINE":
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      case "OFFLINE":
        return <XCircle className="h-4 w-4 text-red-500" />;
      case "OFFLINE_BY_REASON":
        return <AlertCircle className="h-4 w-4 text-blue-500" />;
      default:
        return null;
    }
  };

  const getStatusBadgeColor = (status: ActivityStatus) => {
    switch (status) {
      case "ONLINE":
        return "bg-green-100 text-green-800";
      case "OFFLINE":
        return "bg-red-100 text-red-800";
      case "OFFLINE_BY_REASON":
        return "bg-blue-100 text-blue-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const calculateDuration = (startDate: string, endDate: string | null) => {
    const start = new Date(startDate);
    const end = endDate ? new Date(endDate) : new Date();
    const diffMs = end.getTime() - start.getTime();
    const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
    const diffMinutes = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60));

    if (diffHours > 0) {
      return `${diffHours}ч ${diffMinutes}м`;
    }
    return `${diffMinutes}м`;
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center space-x-2">
            <Calendar className="h-5 w-5" />
            <span>
              Активность {employeeName} за {formatDate(day.date)}
            </span>
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Общая информация о дне */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center space-x-2">
                <User className="h-5 w-5" />
                <span>Общая информация</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-600">Дата</p>
                  <p className="font-medium">{formatDate(day.date)}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Всего записей</p>
                  <p className="font-medium">{day.activities.length}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">
                    Общее время активности
                  </p>
                  <p className="font-medium">
                    {day.totalHours.toFixed(1)} часов
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Основной статус</p>
                  <div className="flex items-center space-x-2">
                    {day.status && getStatusIcon(day.status)}
                    <Badge className={getStatusBadgeColor(day.status!)}>
                      {day.status
                        ? getStatusLabel(day.status)
                        : "Нет активности"}
                    </Badge>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Детали активности */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center space-x-2">
                <Clock className="h-5 w-5" />
                <span>Детали активности</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              {day.activities.length === 0 ? (
                <p className="text-gray-500 text-center py-8">
                  В этот день не было зафиксировано активности
                </p>
              ) : (
                <div className="space-y-4">
                  {day.activities.map((activity) => (
                    <div
                      key={activity.id}
                      className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50 transition-colors"
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex items-center space-x-3">
                          {getStatusIcon(activity.status)}
                          <div>
                            <div className="flex items-center space-x-2">
                              <Badge
                                className={getStatusBadgeColor(activity.status)}
                              >
                                {getStatusLabel(activity.status)}
                              </Badge>
                              {activity.isActive && (
                                <Badge className="bg-green-100 text-green-800">
                                  Активна
                                </Badge>
                              )}
                            </div>
                            <p className="text-sm text-gray-600 mt-1">
                              Длительность:{" "}
                              {calculateDuration(
                                activity.startDate,
                                activity.endDate
                              )}
                            </p>
                          </div>
                        </div>
                        <div className="text-right text-sm text-gray-500">
                          <p>Начало: {formatTime(activity.startDate)}</p>
                          {activity.endDate && (
                            <p>Конец: {formatTime(activity.endDate)}</p>
                          )}
                        </div>
                      </div>

                      {/* Информация об отсутствии */}
                      {activity.leave && (
                        <div className="mt-3 pt-3 border-t border-gray-100">
                          <div className="bg-blue-50 rounded-lg p-3">
                            <h4 className="font-medium text-blue-900 mb-2">
                              Информация об отсутствии
                            </h4>
                            <div className="grid grid-cols-2 gap-4 text-sm">
                              <div>
                                <p className="text-blue-700">Тип</p>
                                <p className="font-medium">
                                  {mapAbsenceType(activity.leave.type)}
                                </p>
                              </div>
                              <div>
                                <p className="text-blue-700">Статус</p>
                                <p className="font-medium">
                                  {getActivityStatusLabel(
                                    activity.leave.status
                                  )}
                                </p>
                              </div>
                              {activity.leave.comment && (
                                <div className="col-span-2">
                                  <p className="text-blue-700">Комментарий</p>
                                  <p className="font-medium">
                                    {activity.leave.comment}
                                  </p>
                                </div>
                              )}
                            </div>
                          </div>
                        </div>
                      )}

                      {/* Метаданные */}
                      <div className="mt-3 pt-3 border-t border-gray-100">
                        <div className="grid grid-cols-2 gap-4 text-xs text-gray-500">
                          <div>
                            <p>ID записи: {activity.id}</p>
                            <p>Создано: {formatTime(activity.createdAt)}</p>
                          </div>
                          <div>
                            <p>ID сотрудника: {activity.employeeId}</p>
                            <p>Профиль: {activity.profile.fullName}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </DialogContent>
    </Dialog>
  );
};
