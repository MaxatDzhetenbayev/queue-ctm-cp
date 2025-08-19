"use client";

import clsx from "clsx";
import { Briefcase, Edit2, MapPin, Phone, Save, User } from "lucide-react";
import React, { useState } from "react";

import { useGetEmployeeById } from "@/modules/users/application/use-cases";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/shared/components/ui/dialog";

// import { ActivityCalendar } from "./ActivityCalendar";
// import { AppointmentsList } from "./AppointmentsList";

export const EmployeeDetail = ({
  open,
  selectedEmployee,
  onOpenChange,
}: {
  open: boolean;
  selectedEmployee: string | null;
  onOpenChange: (open: boolean) => void;
}) => {
  const [activeTab, setActiveTab] = useState<"info" | "appointments">("info");
  const [isEditing, setIsEditing] = useState(false);
  const [editedEmployee, setEditedEmployee] = useState<any | null>(null);

  const { data: employee } = useGetEmployeeById({ id: selectedEmployee! });

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="min-w-[900px]">
        <DialogHeader>
          <DialogDescription className="hidden">
            Здесь будет описание сотрудника
          </DialogDescription>
          <div className="flex items-center justify-between pt-2 px-3">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                <User className="h-6 w-6 text-blue-600" />
              </div>
              <DialogTitle className="text-xl font-bold text-gray-900">
                {employee?.profile.fullName}
              </DialogTitle>
              <div
                className={clsx("rounded-full p-2 mr-3", {
                  "bg-green-500": employee?.employeeInfo.isOnline,
                  "bg-red-500": employee?.employeeInfo.isOnline,
                })}
              ></div>
            </div>
            <div className="flex items-center space-x-2">
              {activeTab === "info" && (
                <button
                  // onClick={() => (isEditing ? handleSave() : setIsEditing(true))}
                  className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  {isEditing ? (
                    <>
                      <Save className="h-4 w-4" />
                      <span>Сохранить</span>
                    </>
                  ) : (
                    <>
                      <Edit2 className="h-4 w-4" />
                      <span>Редактировать</span>
                    </>
                  )}
                </button>
              )}
              {isEditing && (
                <button
                  // onClick={handleCancel}
                  className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Отмена
                </button>
              )}
            </div>
          </div>
        </DialogHeader>
        {/* Tabs */}
        <div className="flex border-b border-gray-200">
          <button
            onClick={() => setActiveTab("info")}
            className={`px-6 py-3 font-medium transition-colors ${
              activeTab === "info"
                ? "text-blue-600 border-b-2 border-blue-600 bg-blue-50"
                : "text-gray-600 hover:text-gray-900"
            }`}
          >
            Информация
          </button>
          <button
            onClick={() => setActiveTab("appointments")}
            className={`px-6 py-3 font-medium transition-colors ${
              activeTab === "appointments"
                ? "text-blue-600 border-b-2 border-blue-600 bg-blue-50"
                : "text-gray-600 hover:text-gray-900"
            }`}
          >
            Записи клиентов 8
          </button>
        </div>

        <div className="p-6 max-h-[60vh] overflow-y-auto">
          {activeTab === "info" && (
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
                      <p className="text-gray-900">
                        {employee?.profile.fullName}
                      </p>
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
                <div className="flex flex-wrap mt-2">
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
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};
