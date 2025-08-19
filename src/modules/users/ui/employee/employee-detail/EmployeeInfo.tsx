import { Briefcase, MapPin, Phone, User } from "lucide-react";
import React, { Dispatch } from "react";

import { EmployeeOneType } from "@/modules/users/domain/schemas";

interface EmployeeInfoProps {
  employee: EmployeeOneType | undefined;
  isEditing: boolean;
  editedEmployee: any | null;
  setEditedEmployee: Dispatch<any>;
}

export const EmployeeInfo = ({
  employee,
  isEditing,
  editedEmployee,
  setEditedEmployee,
}: EmployeeInfoProps) => {
  return (
    <div className="grid grid-cols-2">
      <div className="space-y-4">
        <div className="flex items-center space-x-3">
          <User className="h-5 w-5 text-gray-400" />
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              ФИО
            </label>
            {isEditing ? (
              <input
                type="text"
                value={editedEmployee.firstName}
                onChange={(e) =>
                  setEditedEmployee({
                    ...editedEmployee,
                    firstName: e.target.value,
                  })
                }
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            ) : (
              <p className="text-gray-900">{employee?.profile.fullName}</p>
            )}
          </div>
        </div>
        <div className="flex items-center space-x-3">
          <Phone className="h-5 w-5 text-gray-400" />
          <div className="flex-1">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Телефон
            </label>
            {isEditing ? (
              <input
                type="text"
                value={editedEmployee.phone}
                onChange={(e) =>
                  setEditedEmployee({
                    ...editedEmployee,
                    phone: e.target.value,
                  })
                }
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            ) : (
              <p className="text-gray-900">{employee?.profile.phone}</p>
            )}
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <div className="flex  items-start space-x-3">
          <MapPin className="h-5 w-5 text-gray-400 mt-1" />
          <div className="flex-1">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Центр
            </label>
            <p className="text-gray-900">
              {employee?.employeeInfo.center.name.ru}
            </p>
          </div>
        </div>

        <div className="flex items-start space-x-3">
          <Briefcase className="h-5 w-5 text-gray-400 mt-1" />
          <div className="flex-1">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Отдел
            </label>
            <p className="text-gray-900">
              {employee?.employeeInfo.department.name.ru}
            </p>
          </div>
        </div>
      </div>

      <div className="mt-8 col-span-2 border-t border-gray-100">
        <h4 className="text-lg font-medium text-gray-900 pt-2">
          Предоставляемые услуги
        </h4>
        <div className="flex flex-wrap mt-2 gap-2">
          {employee?.employeeServices.map(({ service }, index) => (
            <span
              key={index}
              className="px-2 py-1 text-xs bg-blue-50 text-blue-700 rounded-full"
            >
              {service.name.ru}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};
