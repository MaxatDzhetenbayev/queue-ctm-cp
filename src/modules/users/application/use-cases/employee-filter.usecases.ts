"use client";

import { useRouter, useSearchParams } from "next/navigation";

type EmployeeFilterReturnType = {
  selectedDepartment: string | null;
  selectedService: string | null;
  setPathParams: (key: "department" | "service", value: string) => void;
};

export const useEmployeeFilter = (): EmployeeFilterReturnType => {
  const searchParams = useSearchParams();
  const router = useRouter();

  const selectedDepartment = searchParams.get("department");
  const selectedService = searchParams.get("service");

  const setPathParams = (key: "department" | "service", value: string) => {
    const params = new URLSearchParams(searchParams.toString());

    if (value && value.trim() !== "" && value.trim() !== "all") {
      params.set(key, value);
    } else {
      params.delete(key);
    }

    router.replace(`?${params.toString()}`);
  };

  return {
    selectedDepartment,
    selectedService,
    setPathParams,
  };
};
