"use client";

import { Filter, Plus } from "lucide-react";
import React, { useState } from "react";

import { Button } from "@/shared/components/ui/button";

import { AbsenceDetailsModal } from "./components/AbsenceDetailsModal";
import { AbsenceFilters } from "./components/AbsenceFilters";
import { AbsencesCalendar } from "./components/AbsencesCalendar";
import { AbsencesContent } from "./components/AbsencesContent";
import { LazyCreateAbsenceModal } from "./components/LazyCreateAbsenceModal";
import { AbsencesStatistics } from "./widgets/AbsencesStatistics";
import { UpcomingAbsences } from "./widgets/UpcomingAbsences";

export const AbsencesPage = () => {
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isFiltersOpen, setIsFiltersOpen] = useState(false);
  const [selectedType, setSelectedType] = useState<string>("all");
  const [selectedLeaveId, setSelectedLeaveId] = useState<string | null>(null);
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);

  const handleCreateAbsence = () => {
    setIsCreateModalOpen(true);
  };

  const handleViewDetails = (leaveId: string) => {
    setSelectedLeaveId(leaveId);
    setIsDetailsModalOpen(true);
  };

  const handleCloseDetailsModal = () => {
    setIsDetailsModalOpen(false);
    setSelectedLeaveId(null);
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

      {/* Календарь и статистика в одном ряду */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Календарь */}
        <div className="lg:col-span-2">
          <AbsencesCalendar selectedType={selectedType} />
        </div>

        {/* Статистика и предстоящие отсутствия */}
        <div className="space-y-6">
          <AbsencesStatistics />
          <UpcomingAbsences onViewDetails={handleViewDetails} />
        </div>
      </div>

      {/* Список отсутствий */}
      <AbsencesContent
        selectedType={selectedType}
        onCreateAbsence={handleCreateAbsence}
      />

      {/* Ленивое модальное окно создания */}
      <LazyCreateAbsenceModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
      />

      {/* Модальное окно с деталями отсутствия */}
      {selectedLeaveId && (
        <AbsenceDetailsModal
          isOpen={isDetailsModalOpen}
          onClose={handleCloseDetailsModal}
          leaveId={selectedLeaveId}
        />
      )}
    </div>
  );
};
