"use client";

import { Search } from "lucide-react";
import React from "react";

import { Input } from "@/shared/components/ui/input";

import { useReceptionFiltersStore } from "../../domain/stores";

interface ReceptionSearchProps {
  value: string;
}

export const ReceptionSearch: React.FC<ReceptionSearchProps> = ({ value }) => {
  const setSearchValue = useReceptionFiltersStore(
    (state) => state.setSearchValue
  );

  const handleChange = (newValue: string) => {
    setSearchValue(newValue);
  };

  return (
    <div className="relative">
      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
      <Input
        type="text"
        placeholder="Поиск по ФИО..."
        value={value}
        onChange={(e) => handleChange(e.target.value)}
        className="pl-10 w-full sm:w-64"
      />
    </div>
  );
};
