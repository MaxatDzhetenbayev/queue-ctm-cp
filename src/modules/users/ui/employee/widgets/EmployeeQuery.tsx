"use client";

import { Search } from "lucide-react";
import { useTranslations } from "next-intl";
import React from "react";

import { Input } from "@/shared/components/ui/input";

interface EmployeeQueryProps {
  inputValue: string;
  setInputValue: (value: string) => void;
}

export const EmployeeQuery = ({
  inputValue,
  setInputValue,
}: EmployeeQueryProps) => {
  const t = useTranslations("employee.search");
  
  return (
    <div className="flex-1 relative">
      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
      <Input
        type="text"
        placeholder={t("placeholder")}
        className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
      />
    </div>
  );
};
