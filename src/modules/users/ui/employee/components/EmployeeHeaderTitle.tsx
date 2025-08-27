import React from "react";

interface EmployeeHeaderTitleProps {
  total?: number | null;
}

export const EmployeeHeaderTitle = ({ total }: EmployeeHeaderTitleProps) => {
  return (
    <div className="flex items-center justify-between">
      <h1 className="text-3xl font-bold text-gray-900">
        Управление персоналом
      </h1>
      <div className="text-sm text-gray-500">
        Всего сотрудников: {total || 0}
      </div>
    </div>
  );
};
