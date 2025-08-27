"use client";

import { Calendar, Clock, FileText, Phone, User } from "lucide-react";
import React, { useState } from "react";

import { ReceptionStatusType } from "@/modules/receptions/domain/schemas/reception.schemas";
import { ClientDetail } from "@/modules/users/ui/client/widgets/ClientDetail";

import { useGetManagerReceptions } from "../../application/use-cases";
import {
  STATUS_COLORS,
  STATUS_LABELS,
} from "../../domain/constants/status.constants";
import { ChangeReceptionStatusButton } from "../components/ChangeReceptionStatusButton";
import { ReceptionCreateOffline } from "../components/ReceptionCreateOffline";
import { CompleteReceptionModal } from "../components/CompleteReceptionModal";

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
        <div className="space-y-4 max-w-lg">
          {[...Array(9)].map((_, i) => (
            <div
              key={i}
              className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 animate-pulse"
            >
              <div className="h-4 bg-gray-200 rounded mb-3"></div>
              <div className="flex justify-between mb-3">
                <div className="space-y-1.5 flex-1">
                  <div className="h-3 bg-gray-200 rounded w-24"></div>
                  <div className="h-3 bg-gray-200 rounded w-full"></div>
                </div>
                <div className="space-y-1.5 ml-4 text-right">
                  <div className="h-3 bg-gray-200 rounded w-20"></div>
                  <div className="h-3 bg-gray-200 rounded w-28"></div>
                </div>
              </div>
              <div className="h-6 bg-gray-200 rounded w-20"></div>
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
                <div className="p-4 max-w-lg">
                  <div className="flex items-center space-x-2 mb-3">
                    <button
                      onClick={() => {
                        setOpenModal(true);
                        setClient({
                          centerId: reception.center.id,
                          clientId: reception.user.id,
                        });
                      }}
                      className="text-sm font-semibold text-blue-600 hover:text-blue-800 transition-colors cursor-pointer truncate"
                    >
                      {reception.user.profile.fullName}
                    </button>
                    <span
                      className={`px-2 py-1 text-xs font-medium rounded-full bg-black text-white flex-shrink-0`}
                    >
                      {normalizeAuthVariant(reception.user.authType)}
                    </span>
                    <span
                      className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(
                        reception.status
                      )} flex-shrink-0`}
                    >
                      {normalizeStatus(reception.status)}
                    </span>
                  </div>

                  <div className="flex justify-between mb-3">
                    <div className="space-y-1.5 flex-1">
                      <div className="flex items-center space-x-2 text-gray-600">
                        <User className="h-3 w-3 flex-shrink-0" />
                        <span className="text-xs">
                          ИИН: {reception.user.profile.iin || "Не указан"}
                        </span>
                      </div>
                      <div className="flex items-center space-x-2 text-gray-600">
                        <FileText className="h-3 w-3 flex-shrink-0" />
                        <span className="text-xs truncate">
                          {reception.service.name.ru}
                        </span>
                      </div>
                    </div>

                    <div className="space-y-1.5 ml-4 text-right">
                      <div className="flex items-center justify-end space-x-2 text-gray-600">
                        <span className="text-xs">
                          {reception.user.profile.phone}
                        </span>
                        <Phone className="h-3 w-3 flex-shrink-0" />
                      </div>
                      <div className="flex items-center justify-end space-x-2 text-gray-600">
                        <span className="text-xs">
                          {new Date(reception.date).toLocaleDateString("ru-RU")}{" "}
                          {new Date(reception.time).toLocaleTimeString(
                            "ru-RU",
                            {
                              hour: "2-digit",
                              minute: "2-digit",
                            }
                          )}
                        </span>
                        <Calendar className="h-3 w-3 flex-shrink-0" />
                      </div>
                    </div>
                  </div>

                  <div className="flex gap-2 flex-wrap">
                    {reception.status === "DONE" && (
                      <button
                        onClick={() => {
                          setOpenModal(true);
                          setClient({
                            centerId: reception.center.id,
                            clientId: reception.user.id,
                          });
                        }}
                        className="px-3 py-1 text-xs bg-blue-100 text-blue-700 rounded-full hover:bg-blue-200 transition-colors"
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
                          className="px-3 py-1 text-xs bg-blue-100 text-blue-700 rounded-full hover:bg-blue-200 transition-colors"
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
                        className="px-3 py-1 text-xs bg-blue-100 text-blue-700 rounded-full hover:bg-blue-200 transition-colors"
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
                          className="px-3 py-1 text-xs bg-blue-100 text-blue-700 rounded-full hover:bg-blue-200 transition-colors"
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
                          className="px-3 py-1 text-xs bg-green-100 text-green-700 rounded-full hover:bg-green-200 transition-colors"
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
                          className="px-3 py-1 text-xs bg-blue-100 text-blue-700 rounded-full hover:bg-blue-200 transition-colors"
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
