"use client";

import { BarChart3, Users } from "lucide-react";
import React from "react";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/shared/components/ui/card";

interface Statistic {
  type: string;
  label: string;
  count: number;
  percentage: number;
}

interface AbsencesStatisticsProps {
  statistics: Statistic[];
}

const getTypeColor = (type: string) => {
  switch (type) {
    case "vacation":
      return "bg-blue-500";
    case "sick_leave":
      return "bg-red-500";
    case "personal":
      return "bg-yellow-500";
    default:
      return "bg-gray-500";
  }
};

export const AbsencesStatistics = ({ statistics }: AbsencesStatisticsProps) => {
  const totalAbsences = statistics.reduce((sum, stat) => sum + stat.count, 0);

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <BarChart3 className="h-5 w-5" />
          <span>Статистика отсутствий</span>
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
            {statistics.map((stat) => (
              <div key={stat.type} className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <div
                      className={`w-3 h-3 rounded-full ${getTypeColor(
                        stat.type
                      )}`}
                    />
                    <span className="text-sm font-medium text-gray-700">
                      {stat.label}
                    </span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <span className="text-sm text-gray-600">{stat.count}</span>
                    <span className="text-sm font-semibold text-gray-900">
                      {stat.percentage}%
                    </span>
                  </div>
                </div>

                {/* Прогресс бар */}
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className={`h-2 rounded-full ${getTypeColor(stat.type)}`}
                    style={{ width: `${stat.percentage}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
