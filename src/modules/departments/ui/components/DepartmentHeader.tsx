import { Building2 } from "lucide-react";
import React from "react";

interface DepartmentHeaderProps {
  total: number;
}

export const DepartmentHeader = ({ total }: DepartmentHeaderProps) => {
  return (
    <div className="flex items-center justify-between mb-8">
      <div className="flex items-center space-x-4">
        <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
          <Building2 className="h-6 w-6 text-blue-600" />
        </div>
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Отделы</h1>
          <p className="text-gray-500">
            {total} {total === 1 ? "отдел" : total < 5 ? "отдела" : "отделов"}
          </p>
        </div>
      </div>
    </div>
  );
};
