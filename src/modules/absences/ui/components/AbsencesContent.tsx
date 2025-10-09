"use client";

import { FileText, Plus } from "lucide-react";
import React, { useState } from "react";

import { Button } from "@/shared/components/ui/button";

import { AbsenceDetailsModal } from "./AbsenceDetailsModal";

import { useGetAbsences } from "../../application/use-cases";
import { transformAbsenceData } from "../../domain/utils/absence.utils";
import { AbsencesList } from "../widgets/AbsencesList";

interface AbsencesContentProps {
  selectedType: string;
  onCreateAbsence: () => void;
}

export const AbsencesContent = ({
  selectedType,
  onCreateAbsence,
}: AbsencesContentProps) => {
  const [selectedLeaveId, setSelectedLeaveId] = useState<string | null>(null);
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);

  const {
    data: absencesResponse,
    isLoading,
    isError,
  } = useGetAbsences({
    sort: "desc",
  });

  // Преобразуем данные в нужный формат
  const absences = absencesResponse?.data?.map(transformAbsenceData) || [];

  // Проверяем, есть ли данные (даже если массив пустой)
  const hasData = absencesResponse !== undefined;
  const isEmpty = hasData && absences.length === 0;

  const filteredAbsences =
    selectedType === "all"
      ? absences
      : absences.filter((absence) => {
          // Маппинг типов для фильтрации
          const typeMapping: Record<string, string> = {
            HOLIDAY: "holiday",
            SICK_LEAVE: "sick_leave",
            PERSONAL: "personal",
          };
          const mappedType = typeMapping[selectedType];
          return mappedType === absence.type;
        });

  const handleCancelAbsence = () => {};

  const handleEditAbsence = () => {
    // TODO: Реализовать редактирование отсутствия
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
    <>
      {/* Список отсутствий */}
      {isLoading ? (
        <div className="flex items-center justify-center p-8">
          <div className="text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-4"></div>
            <p className="text-gray-600">Загрузка данных...</p>
          </div>
        </div>
      ) : isError ? (
        <div className="flex items-center justify-center p-8">
          <div className="text-center">
            <p className="text-red-600 mb-2">Ошибка загрузки данных</p>
            <p className="text-gray-600">Попробуйте обновить страницу</p>
          </div>
        </div>
      ) : isEmpty ? (
        <div className="flex items-center justify-center p-8">
          <div className="text-center">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <FileText className="h-8 w-8 text-gray-400" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              Нет отсутствий
            </h3>
            <p className="text-gray-600 mb-4">
              В данный момент нет активных отсутствий сотрудников
            </p>
            <Button
              onClick={onCreateAbsence}
              className="flex items-center space-x-2 mx-auto"
            >
              <Plus className="h-4 w-4" />
              <span>Добавить первое отсутствие</span>
            </Button>
          </div>
        </div>
      ) : (
        <AbsencesList
          absences={filteredAbsences}
          onCancel={handleCancelAbsence}
          onEdit={handleEditAbsence}
          onViewDetails={handleViewDetails}
        />
      )}

      {/* Модальное окно с деталями отсутствия */}
      {selectedLeaveId && (
        <AbsenceDetailsModal
          isOpen={isDetailsModalOpen}
          onClose={handleCloseDetailsModal}
          leaveId={selectedLeaveId}
        />
      )}
    </>
  );
};
