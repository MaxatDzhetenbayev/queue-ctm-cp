"use client";

import { Filter, Plus } from "lucide-react";
import React, { useState } from "react";

import { Button } from "@/shared/components/ui/button";

import { AbsenceFilters } from "./components/AbsenceFilters";
import { AbsencesContent } from "./components/AbsencesContent";
import { LazyCreateAbsenceModal } from "./components/LazyCreateAbsenceModal";

export const AbsencesPage = () => {
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isFiltersOpen, setIsFiltersOpen] = useState(false);
  const [selectedType, setSelectedType] = useState<string>("all");

  const handleCreateAbsence = () => {
    setIsCreateModalOpen(true);
  };

  return (
    <div className="container mx-auto mt-6 space-y-6">
      {/* Заголовок и кнопки */}
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-gray-900">
          Управление отсутствиями
        </h1>
        <div className="flex items-center space-x-3">
          <Button
            variant="outline"
            onClick={() => setIsFiltersOpen(!isFiltersOpen)}
            className="flex items-center space-x-2"
          >
            <Filter className="h-4 w-4" />
            <span>Фильтры</span>
          </Button>
          <Button
            onClick={handleCreateAbsence}
            className="flex items-center space-x-2"
          >
            <Plus className="h-4 w-4" />
            <span>Добавить отсутствие</span>
          </Button>
        </div>
      </div>

      {/* Фильтры */}
      {isFiltersOpen && (
        <AbsenceFilters
          selectedType={selectedType}
          onTypeChange={setSelectedType}
          absenceTypes={[
            { id: "HOLIDAY", label: "Отпуск", color: "bg-blue-500" },
            { id: "SICK_LEAVE", label: "Больничный", color: "bg-red-500" },
            { id: "PERSONAL", label: "Отгул", color: "bg-yellow-500" },
          ]}
        />
      )}

      {/* Основной контент */}
      <AbsencesContent
        selectedType={selectedType}
        onCreateAbsence={handleCreateAbsence}
      />

      {/* Ленивое модальное окно создания */}
      <LazyCreateAbsenceModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
      />
    </div>
  );
};
