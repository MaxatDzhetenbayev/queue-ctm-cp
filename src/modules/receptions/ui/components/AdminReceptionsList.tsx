"use client";

import { Calendar, Clock, FileText, Phone, Search, User } from "lucide-react";
import React, { useCallback, useMemo, useState } from "react";

import { useGetAllReceptions } from "@/modules/receptions/application/use-cases";
import { ClientDetail } from "@/modules/users/ui/client/widgets/ClientDetail";
import { Input } from "@/shared/components/ui/input";
import { useSearchQuery } from "@/shared/hooks";
import {
  getStatusColor,
  normalizeAuthVariant,
  normalizeStatus,
} from "@/shared/lib";
import { CustomPagination } from "@/widgets/pagination/Pagination";

import { AdminReceptionsFilter } from "./AdminReceptionsFilter";

export const AdminReceptionsList = () => {
  // Состояние для фильтров
  const [selectedDate, setSelectedDate] = useState<string>("");
  const [selectedStatus, setSelectedStatus] = useState<string>("");
  const [selectedAuthType, setSelectedAuthType] = useState<string>("");
  const [currentPage, setCurrentPage] = useState(1);

  // Состояние для модального окна
  const [openModal, setOpenModal] = useState(false);
  const [client, setClient] = useState<{
    centerId: string;
    clientId: string;
  } | null>(null);

  // Поиск
  const { inputValue, setInputValue, debouncedQuery } = useSearchQuery({
    searchKey: "receptionQuery",
  });

  // Константы
  const limit = 6;

  // Параметры для API
  const queryParams = useMemo(
    () => ({
      search: debouncedQuery || undefined,
      status:
        selectedStatus === "all" || !selectedStatus
          ? undefined
          : (selectedStatus as
              | "PENDING"
              | "CALLED"
              | "WORKING"
              | "DONE"
              | "NO_SHOW"
              | "CANCELED"),
      date: selectedDate || undefined,
      type:
        selectedAuthType === "all" || !selectedAuthType
          ? undefined
          : (selectedAuthType as "TELEGRAM" | "OFFLINE"),
      page: currentPage,
      limit,
    }),
    [
      debouncedQuery,
      selectedStatus,
      selectedDate,
      selectedAuthType,
      currentPage,
    ]
  );

  // Получение данных
  const { data, isLoading, error } = useGetAllReceptions(queryParams);

  // Сброс страницы, если текущая страница больше общего количества страниц
  React.useEffect(() => {
    if (data?.totalPages && currentPage > data.totalPages) {
      setCurrentPage(1);
    }
  }, [data?.totalPages, currentPage]);

  // Обработчики
  const handleDateChange = useCallback((date: string) => {
    setSelectedDate(date);
    setCurrentPage(1);
  }, []);

  const handleStatusChange = useCallback((status: string) => {
    setSelectedStatus(status);
    setCurrentPage(1);
  }, []);

  const handleAuthTypeChange = useCallback((type: string) => {
    setSelectedAuthType(type);
    setCurrentPage(1);
  }, []);

  const handlePageChange = useCallback((page: string) => {
    setCurrentPage(Number(page));
  }, []);

  const handleClientClick = useCallback(
    (centerId: string, clientId: string) => {
      setClient({ centerId, clientId });
      setOpenModal(true);
    },
    []
  );

  // Получаем данные из новой структуры ответа
  const receptions = data?.receptions || [];
  const totalPages = data?.totalPages || 1;
  const total = data?.total || 0;

  return (
    <div className="flex px-4 flex-col gap-4">
      {/* Фильтры и поиск - всегда видны */}
      <div className="pt-6">
        <div className="flex flex-col lg:flex-row lg:items-center space-y-4 lg:space-y-0 lg:space-x-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
            <Input
              type="text"
              placeholder="Поиск посетителя по ФИО..."
              className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
            />
          </div>
          <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-3">
            <AdminReceptionsFilter
              selectedReceptionDate={selectedDate}
              selectedReceptionStatus={selectedStatus}
              selectedAuthType={selectedAuthType}
              setPathParams={{
                receptionDate: handleDateChange,
                receptionStatus: handleStatusChange,
                authType: handleAuthTypeChange,
              }}
            />
          </div>
        </div>
      </div>

      {/* Состояния загрузки и ошибок */}
      {isLoading && (
        <div className="flex justify-center items-center p-8">Loading...</div>
      )}

      {error && (
        <div className="flex justify-center items-center p-8 text-red-600">
          Error loading receptions: {error.message}
        </div>
      )}

      {!isLoading && !error && !data && (
        <div className="flex justify-center items-center p-8 text-gray-500">
          No data received
        </div>
      )}

      {!isLoading &&
        !error &&
        data &&
        (!receptions || receptions.length === 0) && (
          <div className="flex justify-center items-center p-8 text-gray-500">
            No receptions found
          </div>
        )}

      {/* Список записей */}
      {!isLoading && !error && data && receptions && receptions.length > 0 && (
        <>
          {receptions.map((appointment) => (
            <div
              key={appointment.id}
              className="bg-white border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow"
            >
              <div className="flex items-start justify-between mb-2">
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-2">
                    <button
                      onClick={() => {
                        if (appointment.center) {
                          handleClientClick(
                            appointment.center.id,
                            appointment.user.id
                          );
                        }
                      }}
                      className="text-lg font-semibold text-blue-600 hover:text-blue-800 transition-colors cursor-pointer"
                    >
                      {appointment.user.profile.fullName || "Имя не указано"}
                    </button>
                    <span className="px-2 py-1 text-xs font-medium rounded-full bg-black text-white">
                      {appointment.user.authType
                        ? normalizeAuthVariant(appointment.user.authType)
                        : "Не указан"}
                    </span>
                    <span
                      className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(
                        appointment.status
                      )}`}
                    >
                      {appointment.status
                        ? normalizeStatus(appointment.status)
                        : "Статус не указан"}
                    </span>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mb-4">
                <div className="flex items-center space-x-2 text-gray-600">
                  <User className="h-4 w-4" />
                  <span>
                    ИИН\БИН: {appointment.user.profile.iin || "Не указан"}
                  </span>
                </div>
                <div className="flex items-center space-x-2 text-gray-600">
                  <Phone className="h-4 w-4" />
                  <span>
                    Телефон: {appointment.user.profile.phone || "Не указан"}
                  </span>
                </div>
                <div className="flex items-center space-x-2 col-span-2 text-gray-600">
                  <FileText className="h-4 w-4" />
                  <span>
                    Услуга:{" "}
                    {appointment.service.name.ru ||
                      appointment.service.name.kz ||
                      "Название не указано"}
                  </span>
                </div>
                <div className="flex items-center space-x-2 text-sm text-gray-600">
                  <Calendar className="h-4 w-4" />
                  <span>
                    Дата:{" "}
                    {appointment.date
                      ? new Date(appointment.date).toLocaleDateString("ru-RU")
                      : "Не указана"}
                  </span>
                </div>
                <div className="flex items-center space-x-2 text-sm text-gray-600">
                  <Clock className="h-4 w-4" />
                  <span>
                    Время:{" "}
                    {appointment.time
                      ? new Date(appointment.time).toLocaleTimeString("ru-RU", {
                          hour: "2-digit",
                          minute: "2-digit",
                        })
                      : "Не указано"}
                  </span>
                </div>
              </div>
            </div>
          ))}

          {/* Пагинация */}
          {totalPages > 1 && (
            <div className="flex justify-center py-4">
              <CustomPagination
                page={currentPage}
                totalPages={totalPages}
                handlePageChange={handlePageChange}
              />
            </div>
          )}

          {/* Информация о странице */}
          <div className="text-center text-sm text-gray-500 pb-4">
            Страница {currentPage} из {totalPages} • Записей на странице:{" "}
            {limit} • Всего записей: {total}
            {receptions.length < limit && " • Последняя страница"}
          </div>
        </>
      )}

      {/* Модальное окно клиента */}
      {client && client.centerId && (
        <ClientDetail
          key={client.clientId}
          open={openModal}
          params={{
            centerId: client.centerId,
            clientId: client.clientId,
          }}
          onOpenChange={setOpenModal}
          onClientUpdate={() => {}}
        />
      )}
    </div>
  );
};
