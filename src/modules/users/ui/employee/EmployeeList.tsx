"use client";

import { Search, Users } from "lucide-react";
import React, { useState } from "react";

import { useGetEmployeeList } from "@/modules/users/application/use-cases";

import { EmployeeCards } from "./employee-cards/EmployeeCards";

export const EmployeeList = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCenter, setSelectedCenter] = useState<string>("");
  const [selectedService, setSelectedService] = useState<string>("");
  const [selectedDepartment, setSelectedDepartment] = useState<string>("");

  const {
    data: employeeList,
    isLoading: employeeListLoading,
    isError: employeeListError,
  } = useGetEmployeeList();

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

  return (
    <div className="space-y-6 mt-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <Users className="h-8 w-8 text-blue-600" />
          <h1 className="text-3xl font-bold text-gray-900">
            Управление персоналом
          </h1>
        </div>
        <div className="text-sm text-gray-500">
          Всего сотрудников: {employeeList?.total || 0}
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

      <EmployeeCards
        employeeList={employeeList!}
        employeeListLoading={employeeListLoading}
        employeeListError={employeeListError}
      />
    </div>
  );
};
