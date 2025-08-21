"use client";

import { Archive, Filter, Plus } from "lucide-react";
import React, { useState } from "react";

import { Button } from "@/shared/components/ui/button";

import { AbsenceFilters } from "./components/AbsenceFilters";
import { CreateAbsenceModal } from "./components/CreateAbsenceModal";
import { AbsencesList } from "./widgets/AbsencesList";
import { AbsencesStatistics } from "./widgets/AbsencesStatistics";
import { UpcomingAbsences } from "./widgets/UpcomingAbsences";

// Моковые данные
const mockAbsences = [
  {
    id: "1",
    employeeName: "Иванов Иван Иванович",
    employeeId: "emp1",
    type: "vacation",
    typeLabel: "Отпуск",
    startDate: "2024-08-25",
    endDate: "2024-09-05",
    status: "active",
    comment: "Летний отпуск",
    createdAt: "2024-08-20",
  },
  {
    id: "2",
    employeeName: "Петрова Анна Сергеевна",
    employeeId: "emp2",
    type: "sick_leave",
    typeLabel: "Больничный",
    startDate: "2024-08-22",
    endDate: "2024-08-28",
    status: "active",
    comment: "ОРВИ",
    createdAt: "2024-08-21",
  },
  {
    id: "3",
    employeeName: "Сидоров Алексей Петрович",
    employeeId: "emp3",
    type: "personal",
    typeLabel: "Личное",
    startDate: "2024-08-30",
    endDate: "2024-08-30",
    status: "active",
    comment: "Семейные дела",
    createdAt: "2024-08-22",
  },
  {
    id: "4",
    employeeName: "Козлова Мария Дмитриевна",
    employeeId: "emp4",
    type: "vacation",
    typeLabel: "Отпуск",
    startDate: "2024-09-10",
    endDate: "2024-09-20",
    status: "active",
    comment: "Осенний отпуск",
    createdAt: "2024-08-23",
  },
];

const mockEmployees = [
  { id: "emp1", name: "Иванов Иван Иванович" },
  { id: "emp2", name: "Петрова Анна Сергеевна" },
  { id: "emp3", name: "Сидоров Алексей Петрович" },
  { id: "emp4", name: "Козлова Мария Дмитриевна" },
  { id: "emp5", name: "Новиков Дмитрий Александрович" },
  { id: "emp6", name: "Смирнова Елена Владимировна" },
];

const mockAbsenceTypes = [
  { id: "vacation", label: "Отпуск", color: "bg-blue-500" },
  { id: "sick_leave", label: "Больничный", color: "bg-red-500" },
  { id: "personal", label: "Личное", color: "bg-yellow-500" },
];

const mockStatistics = [
  { type: "vacation", label: "Отпуск", count: 15, percentage: 45 },
  { type: "sick_leave", label: "Больничный", count: 8, percentage: 24 },
  { type: "personal", label: "Личное", count: 10, percentage: 31 },
];

const mockUpcomingAbsences = [
  {
    id: "1",
    employeeName: "Иванов Иван Иванович",
    type: "vacation",
    typeLabel: "Отпуск",
    startDate: "2024-08-25",
    endDate: "2024-09-05",
  },
  {
    id: "2",
    employeeName: "Петрова Анна Сергеевна",
    type: "sick_leave",
    typeLabel: "Больничный",
    startDate: "2024-08-22",
    endDate: "2024-08-28",
  },
  {
    id: "3",
    employeeName: "Сидоров Алексей Петрович",
    type: "personal",
    typeLabel: "Личное",
    startDate: "2024-08-30",
    endDate: "2024-08-30",
  },
];

export const AbsencesPage = () => {
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isFiltersOpen, setIsFiltersOpen] = useState(false);
  const [selectedType, setSelectedType] = useState<string>("all");
  const [absences, setAbsences] = useState(mockAbsences);

  const filteredAbsences =
    selectedType === "all"
      ? absences
      : absences.filter((absence) => absence.type === selectedType);

  const handleCreateAbsence = (absenceData: any) => {
    const newAbsence = {
      id: Date.now().toString(),
      ...absenceData,
      status: "active",
      createdAt: new Date().toISOString().split("T")[0],
    };
    setAbsences([newAbsence, ...absences]);
    setIsCreateModalOpen(false);
  };

  const handleCancelAbsence = (absenceId: string) => {
    if (confirm("Вы уверены, что хотите отменить это отсутствие?")) {
      setAbsences(absences.filter((absence) => absence.id !== absenceId));
    }
  };

  const handleEditAbsence = (absenceId: string) => {
    // Логика редактирования
    console.log("Редактирование отсутствия:", absenceId);
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
          <Button variant="outline" className="flex items-center space-x-2">
            <Archive className="h-4 w-4" />
            <span>Архив</span>
          </Button>
          <Button
            onClick={() => setIsCreateModalOpen(true)}
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
          absenceTypes={mockAbsenceTypes}
        />
      )}

      {/* Основной контент */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Список отсутствий */}
        <div className="lg:col-span-2">
          <AbsencesList
            absences={filteredAbsences}
            onCancel={handleCancelAbsence}
            onEdit={handleEditAbsence}
          />
        </div>

        {/* Статистика */}
        <div className="space-y-6">
          <AbsencesStatistics statistics={mockStatistics} />
          <UpcomingAbsences absences={mockUpcomingAbsences} />
        </div>
      </div>

      {/* Модальное окно создания */}
      <CreateAbsenceModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        onSubmit={handleCreateAbsence}
        employees={mockEmployees}
        absenceTypes={mockAbsenceTypes}
      />
    </div>
  );
};
