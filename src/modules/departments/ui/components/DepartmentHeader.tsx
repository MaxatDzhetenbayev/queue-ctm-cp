import React from "react";

interface DepartmentHeaderProps {
  total: number;
}

export const DepartmentHeader = ({ total }: DepartmentHeaderProps) => {
  return (
    <div className="flex  items-center justify-between mb-8">
      <div className="flex items-center space-x-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">
            Управление отделами
          </h1>
          <p className="text-gray-500">
            {total} {total === 1 ? "отдел" : total < 5 ? "отдела" : "отделов"}
          </p>
        </div>
      </div>
    </div>
  );
};
