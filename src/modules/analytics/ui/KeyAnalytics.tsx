"use client";

import { Calendar, Target, Users } from "lucide-react";
import React from "react";

export const KeyAnalytics = () => {
  const stats = {
    totalEmployees: 100,
    activeEmployees: 80,
    totalAppointments: 200,
    completedAppointments: 150,
    completionRate: 75,
  };

  return (
    <div className="grid grid-cols-1  md:grid-cols-3 gap-6">
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-gray-600">
              Всего сотрудников
            </p>
            <p className="text-3xl font-bold text-gray-900">
              {stats.totalEmployees}
            </p>
          </div>
          <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
            <Users className="h-6 w-6 text-blue-600" />
          </div>
        </div>
        <div className="mt-4 flex items-center text-sm">
          <span className="text-green-600 font-medium">
            {stats.activeEmployees} активных
          </span>
          <span className="text-gray-500 ml-2">в выбранном периоде</span>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-gray-600">Всего записей</p>
            <p className="text-3xl font-bold text-gray-900">
              {stats.totalAppointments}
            </p>
          </div>
          <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
            <Calendar className="h-6 w-6 text-green-600" />
          </div>
        </div>
        <div className="mt-4 flex items-center text-sm">
          <span className="text-green-600 font-medium">
            {stats.completedAppointments} завершено
          </span>
          <span className="text-gray-500 ml-2">за период</span>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-gray-600">
              Процент завершения
            </p>
            <p className="text-3xl font-bold text-gray-900">
              {stats.completionRate.toFixed(1)}%
            </p>
          </div>
          <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
            <Target className="h-6 w-6 text-purple-600" />
          </div>
        </div>
        <div className="mt-4">
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className="bg-purple-600 h-2 rounded-full transition-all duration-300"
              style={{ width: `${stats.completionRate}%` }}
            ></div>
          </div>
        </div>
      </div>
    </div>
  );
};
