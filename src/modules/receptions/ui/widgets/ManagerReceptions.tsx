"use client";

import { Calendar, FileText, Phone, User } from "lucide-react";
import React from "react";

import { ReceptionStatusType } from "@/modules/receptions/domain/schemas/reception.schemas";
import { ClientDetail } from "@/modules/users/ui/client/widgets/ClientDetail";
import { useSearchQuery } from "@/shared/hooks";

import { useGetManagerReceptions } from "../../application/use-cases";
import {
  STATUS_COLORS,
  STATUS_LABELS,
} from "../../domain/constants/status.constants";
import {
  useReceptionFiltersStore,
  useReceptionModalsStore,
} from "../../domain/stores";
import {
  ChangeReceptionStatusButton,
  CompleteReceptionModal,
  ReceptionCreateOffline,
  ReceptionDateFilter,
  ReceptionSearch,
  ReceptionStatusFilter,
} from "../components";

// Функция для нормализации статуса
const normalizeStatus = (status: ReceptionStatusType): string => {
  return STATUS_LABELS[status] || status;
};

// Функция для получения цвета статуса
const getStatusColor = (status: ReceptionStatusType): string => {
  return STATUS_COLORS[status] || "bg-gray-100 text-gray-800";
};

// Функция для нормализации типа авторизации
const normalizeAuthVariant = (authType: string): string => {
  switch (authType) {
    case "TELEGRAM":
      return "Telegram";
    case "OFFLINE":
      return "Офлайн";
    default:
      return authType;
  }
};

export const ManagerReceptions: React.FC = () => {
  // Используем Zustand store для фильтров
  const { searchValue, selectedDate, selectedStatus } =
    useReceptionFiltersStore();

  // Используем хук для поиска с debounce
  const { inputValue, setInputValue, debouncedQuery } = useSearchQuery({
    searchKey: "search",
  });

  // Синхронизируем состояние поиска с Zustand store
  React.useEffect(() => {
    setInputValue(searchValue);
  }, [searchValue, setInputValue]);

  // Получаем данные с фильтрами
  const { data, isLoading } = useGetManagerReceptions({
    search: debouncedQuery,
    status: selectedStatus || undefined,
    date: selectedDate || new Date().toISOString().split("T")[0], // По умолчанию сегодня
  });

  // Используем Zustand store для модальных окон
  const {
    isClientDetailOpen,
    isCompleteModalOpen,
    selectedClientId,
    selectedReceptionId,
    openClientDetail,
    closeClientDetail,
    openCompleteModal,
    closeCompleteModal,
  } = useReceptionModalsStore();

  return (
    <div className="h-[85vh] flex flex-col">
      <div className="mb-6 flex-shrink-0">
        <h2 className="text-2xl font-semibold mb-4">Приемы</h2>
        <div className="flex flex-col lg:flex-row lg:items-center space-y-4 lg:space-y-0 lg:space-x-4">
          <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-3 flex-1">
            <ReceptionSearch value={inputValue} />
            <ReceptionDateFilter selectedDate={selectedDate} />
            <ReceptionStatusFilter selectedStatus={selectedStatus} />
          </div>
          <ReceptionCreateOffline />
        </div>
      </div>

      <div className="flex-1 overflow-y-auto">
        {isLoading ? (
          <div className="space-y-4">
            {[...Array(3)].map((_, i) => (
              <div
                key={i}
                className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 animate-pulse"
              >
                <div className="h-6 bg-gray-200 rounded mb-4"></div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6 mb-4">
                  <div className="space-y-2">
                    <div className="h-4 bg-gray-200 rounded w-8"></div>
                    <div className="h-4 bg-gray-200 rounded w-24"></div>
                  </div>
                  <div className="space-y-2">
                    <div className="h-4 bg-gray-200 rounded w-16"></div>
                    <div className="h-4 bg-gray-200 rounded w-20"></div>
                  </div>
                  <div className="space-y-2">
                    <div className="h-4 bg-gray-200 rounded w-12"></div>
                    <div className="h-4 bg-gray-200 rounded w-full"></div>
                  </div>
                  <div className="space-y-2">
                    <div className="h-4 bg-gray-200 rounded w-24"></div>
                    <div className="h-4 bg-gray-200 rounded w-28"></div>
                  </div>
                </div>
                <div className="h-8 bg-gray-200 rounded w-24"></div>
              </div>
            ))}
          </div>
        ) : !data?.length ? (
          <div className="text-center text-gray-500 py-8">Нет записей</div>
        ) : (
          <div className="space-y-4">
            {data?.map((reception) => (
              <div
                key={reception.id}
                className="bg-white rounded-xl shadow-sm border border-gray-200 hover:shadow-md transition-shadow"
              >
                <div className="p-6 w-full">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-4">
                    <div className="flex items-center space-x-3 flex-1 min-w-0">
                      <button
                        onClick={() => {
                          openClientDetail(reception.user.id);
                        }}
                        className="text-lg font-semibold text-blue-600 hover:text-blue-800 transition-colors cursor-pointer truncate"
                      >
                        {reception.user.profile.fullName}
                      </button>
                    </div>
                    <div className="flex items-center space-x-2 flex-shrink-0">
                      <span
                        className={`px-3 py-1 text-sm font-medium rounded-full bg-black text-white`}
                      >
                        {normalizeAuthVariant(reception.user.authType)}
                      </span>
                      <span
                        className={`px-3 py-1 text-sm font-medium rounded-full ${getStatusColor(
                          reception.status
                        )}`}
                      >
                        {normalizeStatus(reception.status)}
                      </span>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6 mb-4">
                    <div className="flex items-center space-x-3 text-gray-600">
                      <User className="h-5 w-5 flex-shrink-0" />
                      <div className="min-w-0 flex-1">
                        <div className="text-sm font-medium text-gray-900">
                          ИИН
                        </div>
                        <div className="text-sm truncate">
                          {reception.user.profile.iin || "Не указан"}
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center space-x-3 text-gray-600">
                      <Phone className="h-5 w-5 flex-shrink-0" />
                      <div className="min-w-0 flex-1">
                        <div className="text-sm font-medium text-gray-900">
                          Телефон
                        </div>
                        <div className="text-sm truncate">
                          {reception.user.profile.phone}
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center space-x-3 text-gray-600">
                      <FileText className="h-5 w-5 flex-shrink-0" />
                      <div className="min-w-0 flex-1">
                        <div className="text-sm font-medium text-gray-900">
                          Услуга
                        </div>
                        <div className="text-sm truncate">
                          {reception.service.name.ru}
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center space-x-3 text-gray-600">
                      <Calendar className="h-5 w-5 flex-shrink-0" />
                      <div className="min-w-0 flex-1">
                        <div className="text-sm font-medium text-gray-900">
                          Дата и время
                        </div>
                        <div className="text-sm truncate">
                          {new Date(reception.date).toLocaleDateString("ru-RU")}{" "}
                          {new Date(reception.time).toLocaleTimeString(
                            "ru-RU",
                            {
                              hour: "2-digit",
                              minute: "2-digit",
                            }
                          )}
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="flex gap-2 sm:gap-3 flex-wrap justify-end">
                    {reception.status === "DONE" && (
                      <button
                        onClick={() => {
                          openClientDetail(reception.user.id);
                        }}
                        className="px-3 sm:px-4 py-2 text-xs sm:text-sm bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200 transition-colors font-medium"
                      >
                        Детали
                      </button>
                    )}
                    {reception.status === "NO_SHOW" && (
                      <>
                        <ChangeReceptionStatusButton
                          id={reception.id}
                          status="WORKING"
                        >
                          Принять
                        </ChangeReceptionStatusButton>
                        <button
                          onClick={() => {
                            openClientDetail(reception.user.id);
                          }}
                          className="px-4 py-2 text-sm bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200 transition-colors font-medium"
                        >
                          Детали
                        </button>
                      </>
                    )}
                    {reception.status === "CANCELED" && (
                      <button
                        onClick={() => {
                          openClientDetail(reception.user.id);
                        }}
                        className="px-4 py-2 text-sm bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200 transition-colors font-medium"
                      >
                        Детали
                      </button>
                    )}
                    {reception.status === "CALLED" && (
                      <>
                        <ChangeReceptionStatusButton
                          id={reception.id}
                          status="WORKING"
                        >
                          Принять
                        </ChangeReceptionStatusButton>
                        <ChangeReceptionStatusButton
                          id={reception.id}
                          status="NO_SHOW"
                          variant="destructive"
                        >
                          Не пришел
                        </ChangeReceptionStatusButton>
                      </>
                    )}
                    {reception.status === "PENDING" && (
                      <>
                        <ChangeReceptionStatusButton
                          id={reception.id}
                          status="CALLED"
                        >
                          Позвать
                        </ChangeReceptionStatusButton>
                        <button
                          onClick={() => {
                            openClientDetail(reception.user.id);
                          }}
                          className="px-4 py-2 text-sm bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200 transition-colors font-medium"
                        >
                          Детали
                        </button>
                      </>
                    )}
                    {reception.status === "WORKING" && (
                      <>
                        <button
                          onClick={() => {
                            openCompleteModal(reception.id);
                          }}
                          className="px-4 py-2 text-sm bg-green-100 text-green-700 rounded-lg hover:bg-green-200 transition-colors font-medium"
                        >
                          Завершить
                        </button>
                        <button
                          onClick={() => {
                            openClientDetail(reception.user.id);
                          }}
                          className="px-4 py-2 text-sm bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200 transition-colors font-medium"
                        >
                          Детали
                        </button>
                      </>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {selectedClientId && (
        <ClientDetail
          key={selectedClientId}
          open={isClientDetailOpen}
          params={{
            clientId: selectedClientId,
          }}
          onOpenChange={closeClientDetail}
          onClientUpdate={() => {}}
        />
      )}

      {selectedReceptionId && (
        <CompleteReceptionModal
          open={isCompleteModalOpen}
          onOpenChange={closeCompleteModal}
          receptionId={selectedReceptionId}
          onSuccess={() => {
            closeCompleteModal();
          }}
        />
      )}
    </div>
  );
};
