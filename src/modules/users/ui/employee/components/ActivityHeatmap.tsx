"use client";

import { useState } from "react";

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/shared/components/ui/tooltip";

import { ActivityDetailsModal } from "./ActivityDetailsModal";

import { EmployeeActivity } from "../../../domain/schemas";
import {
  ActivityDay,
  getStatusColor,
  getStatusIntensity,
  processActivityData,
} from "../../../domain/utils";

interface ActivityHeatmapProps {
  activities: EmployeeActivity[];
  employeeName: string;
}

export const ActivityHeatmap = ({
  activities,
  employeeName,
}: ActivityHeatmapProps) => {
  const [selectedDay, setSelectedDay] = useState<ActivityDay | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const heatmapData = processActivityData(activities);

  const handleDayClick = (day: ActivityDay) => {
    if (day.activities.length > 0) {
      setSelectedDay(day);
      setIsModalOpen(true);
    }
  };

  const getDayColor = (day: ActivityDay): string => {
    if (day.status) {
      return getStatusColor(day.status);
    }
    return getStatusIntensity(day.totalHours);
  };

  const getTooltipContent = (day: ActivityDay) => {
    if (day.activities.length === 0) {
      return (
        <div className="text-center">
          <p className="font-medium">{day.date}</p>
          <p className="text-sm text-gray-500">Нет активности</p>
        </div>
      );
    }

    const statusLabel = day.status
      ? day.status === "ONLINE"
        ? "Онлайн"
        : day.status === "OFFLINE"
        ? "Оффлайн"
        : "Отсутствует по причине"
      : "Смешанная активность";

    return (
      <div className="text-center">
        <p className="font-medium">{day.date}</p>
        <p className="text-sm">{statusLabel}</p>
        <p className="text-xs text-gray-500">{day.activities.length} записей</p>
        <p className="text-xs text-gray-500">
          {day.totalHours.toFixed(1)} часов
        </p>
      </div>
    );
  };

  return (
    <div className="mt-8 col-span-2 border-t border-gray-100">
      <h4 className="text-lg font-medium text-gray-900 pt-2 mb-4">
        Активность сотрудника
      </h4>

      <TooltipProvider>
        <div className="bg-white rounded-lg p-4 border border-gray-200">
          {/* Легенда */}
          <div className="flex items-center justify-end mb-4">
            <div className="flex items-center space-x-4 text-sm">
              <div className="flex items-center space-x-2">
                <div className="w-4 h-4 bg-green-500 rounded"></div>
                <span>Онлайн</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-4 h-4 bg-red-500 rounded"></div>
                <span>Оффлайн</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-4 h-4 bg-blue-500 rounded"></div>
                <span>Отсутствует</span>
              </div>
            </div>
          </div>

          {/* Heatmap */}
          <div className="overflow-x-auto">
            <div className="inline-block min-w-full">
              {/* Месяцы */}
              <div className="relative mb-2 h-4">
                {(() => {
                  const monthPositions: {
                    month: string;
                    startCol: number;
                    endCol: number;
                  }[] = [];

                  // Вычисляем позиции для каждого месяца
                  for (let monthIndex = 0; monthIndex < 12; monthIndex++) {
                    const monthStartDate = new Date(
                      new Date().getFullYear(),
                      monthIndex,
                      1
                    );
                    const monthEndDate = new Date(
                      new Date().getFullYear(),
                      monthIndex + 1,
                      0
                    );

                    // Находим позицию первого дня месяца в сетке
                    const firstDayOfYear = new Date(
                      new Date().getFullYear(),
                      0,
                      1
                    );
                    const firstDayOfWeek = firstDayOfYear.getDay();
                    const daysToAdd =
                      firstDayOfWeek === 0 ? 6 : firstDayOfWeek - 1;

                    const daysFromYearStart = Math.floor(
                      (monthStartDate.getTime() - firstDayOfYear.getTime()) /
                        (1000 * 60 * 60 * 24)
                    );

                    // Правильно вычисляем колонку начала месяца
                    const startCol = Math.floor(
                      (daysFromYearStart + daysToAdd) / 7
                    );

                    const daysInMonth = monthEndDate.getDate();
                    const endCol = Math.floor(
                      (daysFromYearStart + daysToAdd + daysInMonth - 1) / 7
                    );

                    const monthName = monthStartDate.toLocaleDateString(
                      "ru-RU",
                      { month: "short" }
                    );
                    monthPositions.push({ month: monthName, startCol, endCol });
                  }

                  return monthPositions.map((pos, index) => (
                    <div
                      key={pos.month}
                      className="text-xs text-gray-500 text-center absolute top-0"
                      style={{
                        left: `${pos.startCol * 16 + 32}px`, // 32px для отступа слева
                        width: `${(pos.endCol - pos.startCol + 1) * 16}px`,
                      }}
                    >
                      {pos.month}
                    </div>
                  ));
                })()}
              </div>

              {/* Дни недели и квадраты */}
              <div className="flex">
                {/* Дни недели */}
                <div className="flex flex-col space-y-1 mr-2">
                  {heatmapData.weekDays.map((day) => (
                    <div
                      key={day}
                      className="text-xs text-gray-500 h-4 flex items-center"
                    >
                      {day}
                    </div>
                  ))}
                </div>

                {/* Квадраты активности */}
                <div className="flex flex-col space-y-1">
                  {Array.from({ length: 7 }, (_, weekDay) => (
                    <div key={weekDay} className="flex space-x-0.5">
                      {heatmapData.days
                        .filter((_, index) => index % 7 === weekDay)
                        .map((day, monthIndex) => (
                          <Tooltip key={`${day.date}-${weekDay}-${monthIndex}`}>
                            <TooltipTrigger asChild>
                              <div
                                className={`w-4 h-4 rounded cursor-pointer transition-all duration-200 hover:scale-125 hover:shadow-md ${
                                  day.activities.length > 0
                                    ? "hover:ring-1 hover:ring-gray-300"
                                    : ""
                                } ${getDayColor(day)}`}
                                onClick={() => handleDayClick(day)}
                              />
                            </TooltipTrigger>
                            <TooltipContent side="top" className="z-50">
                              {getTooltipContent(day)}
                            </TooltipContent>
                          </Tooltip>
                        ))}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Статистика */}
          <div className="mt-4 pt-4 border-t border-gray-200">
            <div className="grid grid-cols-3 gap-4 text-sm">
              <div className="text-center">
                <div className="text-2xl font-bold text-green-600">
                  {activities.filter((a) => a.status === "ONLINE").length}
                </div>
                <div className="text-gray-600">Онлайн сессий</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-red-600">
                  {activities.filter((a) => a.status === "OFFLINE").length}
                </div>
                <div className="text-gray-600">Оффлайн сессий</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-600">
                  {
                    activities.filter((a) => a.status === "OFFLINE_BY_REASON")
                      .length
                  }
                </div>
                <div className="text-gray-600">Отсутствий</div>
              </div>
            </div>
          </div>
        </div>
      </TooltipProvider>

      {/* Модальное окно с деталями */}
      {selectedDay && (
        <ActivityDetailsModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          day={selectedDay}
          employeeName={employeeName}
        />
      )}
    </div>
  );
};
