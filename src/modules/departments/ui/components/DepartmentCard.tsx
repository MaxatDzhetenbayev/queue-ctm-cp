"use client";

import { Users } from "lucide-react";
import { useLocale } from "next-intl";
import { useTranslations } from "next-intl";
import React from "react";

import { DepartmentType } from "../../domain/schemas";

interface DepartmentCardProps {
  department: DepartmentType;
}

export const DepartmentCard = ({ department }: DepartmentCardProps) => {
  const locale = useLocale();
  const t = useTranslations("departments.card");
  
  const departmentName = department.name[locale as "ru" | "kz"];
  
  const getEmployeeLabel = () => {
    if (department.employeeCount === 1) return t("employeeOne");
    if (department.employeeCount < 5) return t("employeeFew");
    return t("employeeMany");
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow">
      <div className="flex items-start justify-between h-full">
        <div className="h-full flex flex-col justify-between">
          <h3 className="text-lg  font-semibold text-gray-900 mb-2">
            {departmentName}
          </h3>
          <div className="flex items-center space-x-2 text-gray-600">
            <Users className="h-4 w-4" />
            <span className="text-sm">
              {department.employeeCount} {getEmployeeLabel()}
            </span>
          </div>
        </div>

        <div className="flex items-center justify-center w-12 h-12 bg-blue-50 rounded-lg">
          <Users className="h-6 w-6 text-blue-600" />
        </div>
      </div>
    </div>
  );
};
