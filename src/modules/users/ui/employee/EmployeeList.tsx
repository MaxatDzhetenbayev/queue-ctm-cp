"use client";

import React from "react";

import {
  useEmployeeFilter,
  useEmployeeQuery,
  useGetDepartmentList,
  useGetEmployeeList,
  useGetServiceList,
} from "@/modules/users/application/use-cases";

import { EmployeeCards } from "./employee-cards/EmployeeCards";
import { EmployeeFilters } from "./EmployeeFilters";
import { EmployeeHeaderTitle } from "./EmployeeHeaderTitle";
import { EmployeeQuery } from "./EmployeeQuery";

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
      <EmployeeHeaderTitle total={employeeList?.total} />
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div className="flex flex-col lg:flex-row lg:items-center space-y-4 lg:space-y-0 lg:space-x-4">
          <EmployeeQuery
            inputValue={inputValue}
            setInputValue={setInputValue}
          />

          <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-3">
            <EmployeeFilters
              selectedDepartment={selectedDepartment}
              selectedService={selectedService}
              setPathParams={setPathParams}
              departments={departments}
              services={services}
            />
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
