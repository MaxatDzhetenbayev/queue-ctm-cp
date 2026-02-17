"use client";

import { Calendar, Target, Users } from "lucide-react";
import { useTranslations } from "next-intl";
import React from "react";

import { useGetKeyStats } from "@/modules/analytics/application/use-cases";

export const KeyAnalytics = () => {
  const { data: stats } = useGetKeyStats();
  const t = useTranslations("analytics.key");

  return (
    <div className="grid grid-cols-1  md:grid-cols-3 gap-6">
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-gray-600">
              {t("totalEmployees")}
            </p>
            <p className="text-3xl font-bold text-gray-900">
              {stats?.totalManagers.value || 0}
            </p>
          </div>
          <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
            <Users className="h-6 w-6 text-blue-600" />
          </div>
        </div>
        <div className="mt-4 flex items-center text-sm">
          <span className="text-green-600 font-medium">
            {stats?.totalManagers.activeManagers || 0} {t("active")}
          </span>
          <span className="text-gray-500 ml-2">{t("today")}</span>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-gray-600">
              {t("totalReceptions")}
            </p>
            <p className="text-3xl font-bold text-gray-900">
              {stats?.totalReceptions.value || 0}
            </p>
          </div>
          <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
            <Calendar className="h-6 w-6 text-green-600" />
          </div>
        </div>
        <div className="mt-4 flex items-center text-sm">
          <span className="text-green-600 font-medium">
            {stats?.totalReceptions.doneReceptions || 0} {t("done")}
          </span>
          <span className="text-gray-500 ml-2">{t("period")}</span>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-gray-600">
              {t("completionRate")}
            </p>
            <p className="text-3xl font-bold text-gray-900">
              {stats?.receptionsDonePercentage || 0}%
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
              style={{ width: `${stats?.receptionsDonePercentage || 0}%` }}
            ></div>
          </div>
        </div>
      </div>
    </div>
  );
};
