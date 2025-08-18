"use client";

import { Search, Users } from "lucide-react";
import React from "react";

import {
  useEmployeeFilter,
  useEmployeeQuery,
  useGetDepartmentList,
  useGetEmployeeList,
  useGetServiceList,
} from "@/modules/users/application/use-cases";

import { EmployeeCards } from "./employee-cards/EmployeeCards";

export const EmployeeList = () => {
  const { selectedDepartment, selectedService, setPathParams } =
    useEmployeeFilter();

  const { data: departments } = useGetDepartmentList();
  const { data: services } = useGetServiceList();
  const { inputValue, setInputValue, debouncedQuery } = useEmployeeQuery();

  const {
    data: employeeList,
    isLoading: employeeListLoading,
    isError: employeeListError,
  } = useGetEmployeeList({
    departmentId: selectedDepartment,
    serviceId: selectedService,
    query: debouncedQuery,
  });

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

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div className="flex flex-col lg:flex-row lg:items-center space-y-4 lg:space-y-0 lg:space-x-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
            <input
              type="text"
              placeholder="Поиск по ФИО сотрудника..."
              className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
            />
          </div>

          <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-3">
            {/* <select
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
            </select> */}

            <select
              className="px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              value={selectedDepartment ?? ""}
              onChange={(e) => setPathParams("department", e.target.value)}
            >
              <option value="">Все отделы</option>
              {departments?.map((dept) => (
                <option key={dept.id} value={dept.id}>
                  {dept.name.ru}
                </option>
              ))}
            </select>

            <select
              className="px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              value={selectedService ?? ""}
              onChange={(e) => setPathParams("service", e.target.value)}
            >
              <option value="">Все услуги</option>
              {services?.map((service) => (
                <option key={service.id} value={service.id}>
                  {service.name.ru}
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

// const centers = [
//   {
//     id: 1,
//     name: "Центр 1",
//   },
//   {
//     id: 2,
//     name: "Центр 2",
//   },
//   {
//     id: 3,
//     name: "Центр 3",
//   },
// ];
