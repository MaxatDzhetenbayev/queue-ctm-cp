"use client";

import React, { useMemo, useState } from "react";

import { AbsenceDetailsModal } from "./AbsenceDetailsModal";

import { useGetAbsences } from "../../application/use-cases";
import { transformAbsenceData } from "../../domain/utils/absence.utils";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import FullCalendar from "@fullcalendar/react";

interface AbsencesCalendarProps {
  selectedType?: string;
}

export const AbsencesCalendar = ({
  selectedType = "all",
}: AbsencesCalendarProps) => {
  const [selectedLeaveId, setSelectedLeaveId] = useState<string | null>(null);
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);

  const {
    data: absencesResponse,
    isLoading,
    isError,
  } = useGetAbsences({
    sort: "desc",
  });

  // Функция для получения читаемого названия типа отсутствия
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const getAbsenceTypeLabel = (type: string) => {
    const labels: Record<string, string> = {
      holiday: "Отпуск",
      sick_leave: "Больничный",
      personal: "Отгул",
    };
    return labels[type] || type;
  };

  // Функция для форматирования даты в читаемый вид
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const formatDateRange = (startDate: string, endDate: string) => {
    // Парсим UTC даты и создаем локальные даты без учета времени
    // eslint-disable-next-line sonarjs/no-duplicate-string
    const start = new Date(startDate + "T00:00:00.000Z");
    const end = new Date(endDate + "T00:00:00.000Z");

    // Получаем локальные даты (без времени)
    const startLocal = new Date(
      start.getFullYear(),
      start.getMonth(),
      start.getDate()
    );
    const endLocal = new Date(end.getFullYear(), end.getMonth(), end.getDate());

    // Если даты одинаковые, показываем только одну дату
    if (startLocal.getTime() === endLocal.getTime()) {
      return startLocal.toLocaleDateString("ru-RU", {
        day: "numeric",
        month: "long",
      });
    }

    // Если разные месяцы
    if (startLocal.getMonth() !== endLocal.getMonth()) {
      const startFormatted = startLocal.toLocaleDateString("ru-RU", {
        day: "numeric",
        month: "long",
      });
      const endFormatted = endLocal.toLocaleDateString("ru-RU", {
        day: "numeric",
        month: "long",
      });
      return `${startFormatted} - ${endFormatted}`;
    }

    // Если один месяц, но разные дни
    const startDay = startLocal.getDate();
    const endDay = endLocal.getDate();
    const month = startLocal.toLocaleDateString("ru-RU", { month: "long" });

    return `${startDay}-${endDay} ${month}`;
  };

  // Преобразуем данные в нужный формат
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const absences = absencesResponse?.data?.map(transformAbsenceData) || [];

  // Фильтруем отсутствия по типу
  const filteredAbsences = useMemo(() => {
    if (selectedType === "all") return absences;

    const typeMapping: Record<string, string> = {
      HOLIDAY: "holiday",
      SICK_LEAVE: "sick_leave",
      PERSONAL: "personal",
    };
    const mappedType = typeMapping[selectedType];
    return absences.filter((absence) => absence.type === mappedType);
  }, [absences, selectedType]);

  // Преобразуем отсутствия в события для календаря
  const calendarEvents = useMemo(() => {
    return filteredAbsences.map((absence) => {
      // Определяем цвет в зависимости от типа отсутствия
      let backgroundColor = "#3b82f6"; // синий по умолчанию
      let borderColor = "#2563eb";

      switch (absence.type) {
        case "holiday":
          backgroundColor = "#10b981"; // зеленый для отпуска
          borderColor = "#059669";
          break;
        case "sick_leave":
          backgroundColor = "#ef4444"; // красный для больничного
          borderColor = "#dc2626";
          break;
        case "personal":
          backgroundColor = "#f59e0b"; // желтый для отгула
          borderColor = "#d97706";
          break;
      }

      // Обрабатываем UTC даты для FullCalendar
      const startDate = new Date(absence.startDate + "T00:00:00.000Z");
      const endDate = new Date(absence.endDate + "T00:00:00.000Z");

      // Для FullCalendar нужно добавить один день к endDate, так как он не включает последний день
      const endDateForCalendar = new Date(endDate);
      endDateForCalendar.setDate(endDateForCalendar.getDate() + 1);

      return {
        id: absence.id,
        title: `${absence.employeeName} - ${getAbsenceTypeLabel(
          absence.type
        )} (${formatDateRange(absence.startDate, absence.endDate)})`,
        start: startDate.toISOString().split("T")[0], // Формат YYYY-MM-DD
        end: endDateForCalendar.toISOString().split("T")[0], // Формат YYYY-MM-DD
        backgroundColor,
        borderColor,
        textColor: "#ffffff",
        extendedProps: {
          type: absence.type,
          employeeName: absence.employeeName,
          comment: absence.comment,
          status: absence.status,
          dateRange: formatDateRange(absence.startDate, absence.endDate),
        },
      };
    });
  }, [filteredAbsences, getAbsenceTypeLabel, formatDateRange]);

  // Обработчик клика по событию
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleEventClick = (clickInfo: any) => {
    const event = clickInfo.event;
    // const extendedProps = event.extendedProps;

    // Открываем модальное окно с деталями отсутствия
    setSelectedLeaveId(event.id);
    setIsDetailsModalOpen(true);
  };

  // Обработчик закрытия модального окна
  const handleCloseDetailsModal = () => {
    setIsDetailsModalOpen(false);
    setSelectedLeaveId(null);
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Загрузка календаря...</p>
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="text-center">
          <p className="text-red-600 mb-2">Ошибка загрузки календаря</p>
          <p className="text-gray-600">Попробуйте обновить страницу</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-sm border p-6">
      <div className="mb-4">
        <h2 className="text-xl font-semibold text-gray-900 mb-2">
          Календарь отсутствий
        </h2>
        <p className="text-sm text-gray-600">
          Просмотр отпусков, больничных и отгулов сотрудников
        </p>
      </div>

      {/* Легенда */}
      <div className="flex flex-wrap gap-4 mb-4 text-sm">
        <div className="flex items-center space-x-2">
          <div
            className="w-3 h-3 rounded"
            style={{ backgroundColor: "#10b981" }}
          ></div>
          <span>Отпуск</span>
        </div>
        <div className="flex items-center space-x-2">
          <div
            className="w-3 h-3 rounded"
            style={{ backgroundColor: "#ef4444" }}
          ></div>
          <span>Больничный</span>
        </div>
        <div className="flex items-center space-x-2">
          <div
            className="w-3 h-3 rounded"
            style={{ backgroundColor: "#f59e0b" }}
          ></div>
          <span>Отгул</span>
        </div>
      </div>

      {/* Календарь */}
      <div className="calendar-container">
        <FullCalendar
          plugins={[dayGridPlugin, interactionPlugin]}
          initialView="dayGridMonth"
          headerToolbar={{
            left: "prev,next today",
            center: "title",
            right: "dayGridMonth,dayGridWeek",
          }}
          events={calendarEvents}
          eventClick={handleEventClick}
          height="auto"
          locale="ru"
          buttonText={{
            today: "Сегодня",
            month: "Месяц",
            week: "Неделя",
          }}
          dayMaxEvents={3}
          moreLinkClick="popover"
          eventDisplay="block"
          weekends={true}
          firstDay={1} // Понедельник как первый день недели
        />
      </div>

      <style jsx global>{`
        .calendar-container .fc {
          font-family: inherit;
        }

        .calendar-container .fc-toolbar-title {
          font-size: 1.25rem;
          font-weight: 600;
          color: #111827;
        }

        .calendar-container .fc-button {
          background-color: #f3f4f6;
          border-color: #d1d5db;
          color: #374151;
          font-weight: 500;
          padding: 0.375rem 0.75rem;
          border-radius: 0.375rem;
        }

        .calendar-container .fc-button:hover {
          background-color: #e5e7eb;
        }

        .calendar-container .fc-button:focus {
          box-shadow: 0 0 0 2px #3b82f6;
        }

        .calendar-container .fc-button-primary:not(:disabled):active,
        .calendar-container .fc-button-primary:not(:disabled).fc-button-active {
          background-color: #3b82f6;
          border-color: #3b82f6;
          color: white;
        }

        .calendar-container .fc-daygrid-day-number {
          color: #374151;
          font-weight: 500;
        }

        .calendar-container .fc-day-today {
          background-color: #fef3c7;
        }

        .calendar-container .fc-daygrid-event {
          border-radius: 0.25rem;
          font-size: 0.75rem;
          padding: 0.125rem 0.25rem;
        }

        .calendar-container .fc-event-title {
          font-weight: 500;
        }

        .calendar-container .fc-more-link {
          color: #6b7280;
          font-size: 0.75rem;
        }
      `}</style>

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
