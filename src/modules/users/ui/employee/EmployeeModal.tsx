"use client";

import {
  Briefcase,
  Calendar,
  Edit2,
  Mail,
  MapPin,
  Phone,
  Save,
  User,
} from "lucide-react";
import React, { useState } from "react";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/shared/components/ui/dialog";

// import { ActivityCalendar } from "./ActivityCalendar";
// import { AppointmentsList } from "./AppointmentsList";

export const EmployeeModal = ({
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

  const employee = {
    id: 1,
    firstName: "Иван",
    lastName: "Иванов",
    email: "ivan.ivanov@example.com",
    middleName: "Иванович",
    phone: "+7 (999) 123-45-67",
    position: "Должность 1",
    center: "Центр 1",
    hireDate: "2020-01-01",
    department: "Отдел 1",
    services: ["Услуга 1", "Услуга 2"],
  };

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
                {employee.lastName} {employee.firstName}
              </DialogTitle>
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
        <div className="w-full pt-2 px-3 ">
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

          {/* Content */}
          <div className="p-6 max-h-[60vh] overflow-y-auto">
            {activeTab === "info" && (
              <div className="space-y-8">
                {/* Employee Details */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Имя
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
                        <p className="text-gray-900">{employee.firstName}</p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Фамилия
                      </label>
                      {isEditing ? (
                        <input
                          type="text"
                          value={editedEmployee.lastName}
                          onChange={(e) =>
                            setEditedEmployee({
                              ...editedEmployee,
                              lastName: e.target.value,
                            })
                          }
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                      ) : (
                        <p className="text-gray-900">{employee.lastName}</p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Отчество
                      </label>
                      {isEditing ? (
                        <input
                          type="text"
                          value={editedEmployee.middleName}
                          onChange={(e) =>
                            setEditedEmployee({
                              ...editedEmployee,
                              middleName: e.target.value,
                            })
                          }
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                      ) : (
                        <p className="text-gray-900">{employee.middleName}</p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Должность
                      </label>
                      {isEditing ? (
                        <input
                          type="text"
                          value={editedEmployee.position}
                          onChange={(e) =>
                            setEditedEmployee({
                              ...editedEmployee,
                              position: e.target.value,
                            })
                          }
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                      ) : (
                        <p className="text-gray-900">{employee.position}</p>
                      )}
                    </div>
                  </div>

                  <div className="space-y-4">
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
                          <p className="text-gray-900">{employee.phone}</p>
                        )}
                      </div>
                    </div>

                    <div className="flex items-center space-x-3">
                      <Mail className="h-5 w-5 text-gray-400" />
                      <div className="flex-1">
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Email
                        </label>
                        {isEditing ? (
                          <input
                            type="email"
                            value={editedEmployee.email}
                            onChange={(e) =>
                              setEditedEmployee({
                                ...editedEmployee,
                                email: e.target.value,
                              })
                            }
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          />
                        ) : (
                          <p className="text-gray-900">{employee.email}</p>
                        )}
                      </div>
                    </div>

                    <div className="flex items-start space-x-3">
                      <MapPin className="h-5 w-5 text-gray-400 mt-1" />
                      <div className="flex-1">
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Центр
                        </label>
                        <p className="text-gray-900">{employee.center}</p>
                      </div>
                    </div>

                    <div className="flex items-start space-x-3">
                      <Briefcase className="h-5 w-5 text-gray-400 mt-1" />
                      <div className="flex-1">
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Отдел
                        </label>
                        <p className="text-gray-900">{employee.department}</p>
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Дата приема на работу
                      </label>
                      <div className="flex items-center space-x-3">
                        <Calendar className="h-5 w-5 text-gray-400" />
                        <p className="text-gray-900">
                          {new Date(employee.hireDate).toLocaleDateString(
                            "ru-RU"
                          )}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Services */}
                <div>
                  <h4 className="text-lg font-medium text-gray-900 mb-4">
                    Предоставляемые услуги
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {employee.services.map((service, index) => (
                      <span
                        key={index}
                        className="px-3 py-1 text-sm bg-blue-100 text-blue-800 rounded-full"
                      >
                        {service}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Activity Calendar
              <ActivityCalendar activities={employee.activity} /> */}
              </div>
            )}

            {/* {activeTab === "appointments" && (
            <AppointmentsList
              appointments={employeeAppointments}
              clients={clients}
              onClientClick={onClientClick}
            />
          )} */}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
