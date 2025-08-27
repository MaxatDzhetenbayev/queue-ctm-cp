"use client";

import { Calendar, FileText, Phone, User } from "lucide-react";
import React, { useState } from "react";

import { ReceptionStatusType } from "@/modules/receptions/domain/schemas/reception.schemas";
import { ClientDetail } from "@/modules/users/ui/client/widgets/ClientDetail";

import { useGetManagerReceptions } from "../../application/use-cases";
import {
  STATUS_COLORS,
  STATUS_LABELS,
} from "../../domain/constants/status.constants";
import { ChangeReceptionStatusButton } from "../components/ChangeReceptionStatusButton";
import { CompleteReceptionModal } from "../components/CompleteReceptionModal";
import { ReceptionCreateOffline } from "../components/ReceptionCreateOffline";

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
  const { data, isLoading, isError } = useGetManagerReceptions();
  const [openModal, setOpenModal] = useState(false);
  const [client, setClient] = useState<{
    centerId: string;
    clientId: string;
  } | null>(null);
  const [completeModalOpen, setCompleteModalOpen] = useState(false);
  const [selectedReceptionId, setSelectedReceptionId] = useState<string | null>(
    null
  );

  if (isLoading) {
    return (
      <div className="h-[85vh] space-y-4">
        <div className="h-8 bg-gray-200 rounded animate-pulse w-32"></div>
        <div className="space-y-4 w-full">
          {[...Array(9)].map((_, i) => (
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
      </div>
    );
  }

  if (isError) {
    return (
      <div className="h-[85vh] flex items-center justify-center">
        <div className="text-red-500">Ошибка при загрузке данных</div>
      </div>
    );
  }

  return (
    <div className="h-[85vh] flex flex-col">
      <div className="flex items-center justify-between mb-6 flex-shrink-0">
        <h2 className="text-2xl font-semibold">Приемы</h2>
        <ReceptionCreateOffline />
      </div>

      <div className="flex-1 overflow-y-auto">
        {!data || data.length === 0 ? (
          <div className="text-center text-gray-500 py-8">Нет записей</div>
        ) : (
          <div className="space-y-4">
            {data.map((reception) => (
              <div
                key={reception.id}
                className="bg-white rounded-xl shadow-sm border border-gray-200 hover:shadow-md transition-shadow"
              >
                <div className="p-6 w-full">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-4">
                    <div className="flex items-center space-x-3 flex-1 min-w-0">
                      <button
                        onClick={() => {
                          setOpenModal(true);
                          setClient({
                            centerId: reception.center.id,
                            clientId: reception.user.id,
                          });
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
                          setOpenModal(true);
                          setClient({
                            centerId: reception.center.id,
                            clientId: reception.user.id,
                          });
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
                            setOpenModal(true);
                            setClient({
                              centerId: reception.center.id,
                              clientId: reception.user.id,
                            });
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
                          setOpenModal(true);
                          setClient({
                            centerId: reception.center.id,
                            clientId: reception.user.id,
                          });
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
                            setOpenModal(true);
                            setClient({
                              centerId: reception.center.id,
                              clientId: reception.user.id,
                            });
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
                            setSelectedReceptionId(reception.id);
                            setCompleteModalOpen(true);
                          }}
                          className="px-4 py-2 text-sm bg-green-100 text-green-700 rounded-lg hover:bg-green-200 transition-colors font-medium"
                        >
                          Завершить
                        </button>
                        <button
                          onClick={() => {
                            setOpenModal(true);
                            setClient({
                              centerId: reception.center.id,
                              clientId: reception.user.id,
                            });
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

      {client && (
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

      {selectedReceptionId && (
        <CompleteReceptionModal
          open={completeModalOpen}
          onOpenChange={setCompleteModalOpen}
          receptionId={selectedReceptionId}
          onSuccess={() => {
            setSelectedReceptionId(null);
          }}
        />
      )}
    </div>
  );
};
