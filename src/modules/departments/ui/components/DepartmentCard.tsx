import { Users } from "lucide-react";
import React from "react";

import { DepartmentType } from "../../domain/schemas";

interface DepartmentCardProps {
  department: DepartmentType;
}

export const DepartmentCard = ({ department }: DepartmentCardProps) => {
  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow">
      <div className="flex items-start justify-between h-full">
        <div className="h-full flex flex-col justify-between">
          <h3 className="text-lg  font-semibold text-gray-900 mb-2">
            {department.name.ru}
          </h3>
          <div className="flex items-center space-x-2 text-gray-600">
            <Users className="h-4 w-4" />
            <span className="text-sm">
              {department.employeeCount}{" "}
              {department.employeeCount === 1
                ? "сотрудник"
                : department.employeeCount < 5
                ? "сотрудника"
                : "сотрудников"}
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
