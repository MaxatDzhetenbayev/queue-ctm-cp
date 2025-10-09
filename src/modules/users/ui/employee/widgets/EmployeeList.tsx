"use client";

import React, { useState } from "react";

import { useGetDepartmentList } from "@/modules/departments/application/use-cases";
import {
  useEmployeePagination,
  useGetEmployeeList,
  useGetServiceList,
} from "@/modules/users/application/use-cases";
import { useSearchQuery, useUrlFilter } from "@/shared/hooks";
import { CustomPagination } from "@/widgets";

import { CreateEmployeeModal } from "./CreateEmployeeModal";
import { EmployeeDetail } from "./EmployeeDetail";
import { EmployeeFilters } from "./EmployeeFilters";
import { EmployeeQuery } from "./EmployeeQuery";

import { EmployeeCards } from "../components/cards/EmployeeCards";
import { EmployeeHeaderTitle } from "../components/EmployeeHeaderTitle";

export const EmployeeList = () => {
  const {
    selectedDepartment,
    selectedService,
    selectedStatus,
    selectedPage,
    setPathParams,
  } = useUrlFilter(["department", "service", "status", "page"]);
  const { inputValue, setInputValue, debouncedQuery } = useSearchQuery({
    searchKey: "query",
    deleteKeys: ["page"],
  });

  const { data: departments } = useGetDepartmentList();
  const { data: services } = useGetServiceList();
  const {
    data: employeeList,
    isLoading: employeeListLoading,
    isError: employeeListError,
  } = useGetEmployeeList({
    departmentId: selectedDepartment,
    serviceId: selectedService,
    query: debouncedQuery,
    limit: 9,
    page: Number(selectedPage) || 1,
    status: selectedStatus,
  });

  const { currentPage, totalPages, goToPage } = useEmployeePagination(
    Number(selectedPage),
    (page: string) => setPathParams("page", page),
    employeeList?.totalPages
  );

  const [selectedEmployee, setSelectedEmployee] = useState<string | null>(null);
  const [openModal, setOpenModal] = useState(false);

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
              selectedStatus={selectedStatus}
              setPathParams={setPathParams}
              departments={departments}
              services={services}
            />

            {/* Кнопка создания работника */}
            <CreateEmployeeModal />
          </div>
        </div>
      </div>

      <EmployeeCards
        employeeList={employeeList!}
        onOpen={setOpenModal}
        selectedEmployee={setSelectedEmployee}
        employeeListLoading={employeeListLoading}
        employeeListError={employeeListError}
      />
      <CustomPagination
        page={currentPage}
        totalPages={totalPages}
        handlePageChange={(page: string) => goToPage(page)}
      />
      <EmployeeDetail
        open={openModal}
        selectedEmployee={selectedEmployee}
        onOpenChange={() => setOpenModal(false)}
      />
    </div>
  );
};
