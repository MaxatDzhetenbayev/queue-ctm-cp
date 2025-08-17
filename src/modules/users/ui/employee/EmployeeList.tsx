"use client"

import { Briefcase, MapPin, Phone, Search, Users } from "lucide-react";
import React, { useState } from "react";

export const EmployeeList = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCenter, setSelectedCenter] = useState<string>("");
  const [selectedService, setSelectedService] = useState<string>("");
  const [selectedDepartment, setSelectedDepartment] = useState<string>("");

  const centers = [
    {
      id: 1,
      name: "Центр 1",
    },
    {
      id: 2,
      name: "Центр 2",
    },
    {
      id: 3,
      name: "Центр 3",
    },
  ];

  const departments = [
    {
      id: 1,
      name: "Отдел 1",
    },
    {
      id: 2,
      name: "Отдел 2",
    },
    {
      id: 3,
      name: "Отдел 3",
    },
  ];

  const services = [
    {
      id: 1,
      name: "Услуга 1",
    },
    {
      id: 2,
      name: "Услуга 2",
    },
    {
      id: 3,
      name: "Услуга 3",
    },
  ];

  const filteredEmployees = [
    {
      id: 1,
      firstName: "Иван",
      lastName: "Иванов",
      middleName: "Иванович",
      phone: "+7 (999) 123-45-67",
      position: "Должность 1",
      center: "Центр 1",
      department: "Отдел 1",
      services: ["Услуга 1", "Услуга 2"],
    },
    {
      id: 2,
      firstName: "Петр",
      lastName: "Петров",
      phone: "+7 (999) 123-45-67",
      position: "Должность 1",
      middleName: "Петрович",
      center: "Центр 2",
      department: "Отдел 2",
      services: ["Услуга 2", "Услуга 3"],
    },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <Users className="h-8 w-8 text-blue-600" />
          <h1 className="text-3xl font-bold text-gray-900">
            Управление персоналом
          </h1>
        </div>
        <div className="text-sm text-gray-500">
          Всего сотрудников: {filteredEmployees.length}
        </div>
      </div>

      {/* Filters and Search */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div className="flex flex-col lg:flex-row lg:items-center space-y-4 lg:space-y-0 lg:space-x-4">
          {/* Search */}
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
            <input
              type="text"
              placeholder="Поиск по ФИО сотрудника..."
              className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          {/* Filters */}
          <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-3">
            <select
              className="px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              value={selectedCenter}
              onChange={(e) => setSelectedCenter(e.target.value)}
            >
              <option value="">Все центры</option>
              {centers.map((center) => (
                <option key={center.id} value={center.name}>
                  {center.name}
                </option>
              ))}
            </select>

            <select
              className="px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              value={selectedDepartment}
              onChange={(e) => setSelectedDepartment(e.target.value)}
            >
              <option value="">Все отделы</option>
              {departments.map((dept) => (
                <option key={dept.id} value={dept.name}>
                  {dept.name}
                </option>
              ))}
            </select>

            <select
              className="px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              value={selectedService}
              onChange={(e) => setSelectedService(e.target.value)}
            >
              <option value="">Все услуги</option>
              {services.map((service) => (
                <option key={service.id} value={service.name}>
                  {service.name}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Employee Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredEmployees.map((employee) => (
          <div
            key={employee.id}
            className="bg-white rounded-xl shadow-sm border border-gray-200 hover:shadow-md transition-shadow cursor-pointer"
          >
            <div className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-gray-900 mb-1">
                    {employee.lastName} {employee.firstName}
                  </h3>
                  <p className="text-sm text-gray-600 mb-2">
                    {employee.middleName}
                  </p>
                  <p className="text-sm font-medium text-blue-600">
                    {employee.position}
                  </p>
                </div>
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                  <span className="text-blue-600 font-medium text-lg">
                    {employee.firstName.charAt(0)}
                  </span>
                </div>
              </div>

              <div className="space-y-3">
                <div className="flex items-center text-sm text-gray-600">
                  <Phone className="h-4 w-4 mr-2 flex-shrink-0" />
                  <span>{employee.phone}</span>
                </div>

                <div className="flex items-start text-sm text-gray-600">
                  <MapPin className="h-4 w-4 mr-2 flex-shrink-0 mt-0.5" />
                  <span>{employee.center}</span>
                </div>

                <div className="flex items-start text-sm text-gray-600">
                  <Briefcase className="h-4 w-4 mr-2 flex-shrink-0 mt-0.5" />
                  <span>{employee.department}</span>
                </div>
              </div>

              {/* Services */}
              <div className="mt-4 pt-4 border-t border-gray-100">
                <p className="text-xs font-medium text-gray-500 mb-2">
                  Услуги:
                </p>
                <div className="flex flex-wrap gap-1">
                  {employee.services.map((service, index) => (
                    <span
                      key={index}
                      className="px-2 py-1 text-xs bg-blue-50 text-blue-700 rounded-full"
                    >
                      {service}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredEmployees.length === 0 && (
        <div className="text-center py-12">
          <Users className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            Сотрудники не найдены
          </h3>
          <p className="text-gray-500">
            Попробуйте изменить параметры поиска или фильтрации
          </p>
        </div>
      )}
    </div>
  );
};
