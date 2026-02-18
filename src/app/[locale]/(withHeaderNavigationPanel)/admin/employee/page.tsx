"use client";

import React, { Suspense } from "react";

import { EmployeeList } from "@/modules/users/ui/employee";

const EmployeePage = () => {
  return (
    <Suspense fallback={<div className="animate-pulse rounded-lg bg-gray-200 h-64" />}>
      <EmployeeList />
    </Suspense>
  );
};

export default EmployeePage;
