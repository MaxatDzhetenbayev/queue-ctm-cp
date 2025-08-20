import { Users } from "lucide-react";
import React from "react";

interface EmployeeHeaderTitleProps {
  total?: number | null;
}

export const EmployeeHeaderTitle = ({ total }: EmployeeHeaderTitleProps) => {
  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center space-x-3">
        <Users className="h-8 w-8 text-blue-600" />
        <h1 className="text-3xl font-bold text-gray-900">
          Управление персоналом
        </h1>
      </div>
      <div className="text-sm text-gray-500">
        Всего сотрудников: {total || 0}
      </div>
    </div>
  );
};
