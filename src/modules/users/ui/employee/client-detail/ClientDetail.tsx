"use client";

import { Calendar, ChevronLeft, ChevronRight, User } from "lucide-react";
import React, { useState } from "react";

import { useGetClientInfo } from "@/modules/users/application/use-cases";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/shared/components/ui/dialog";
import { getStatusColor, normalizeStatus } from "@/shared/lib";

interface ClientModalProps {
  open: boolean;
  params: {
    centerId?: string;
    clientId: string;
  };
  onOpenChange: (open: boolean) => void;
  onClientUpdate: (client: any) => void;
}

export const ClientDetail: React.FC<ClientModalProps> = ({
  onOpenChange,
  open,
  params,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [currentAppointmentIndex, setCurrentAppointmentIndex] = useState(0);

  const { data: client, isLoading, isError } = useGetClientInfo(params);

  if (isLoading || isError || !client) return;
  const currentAppointment = client.receptions[currentAppointmentIndex];
  const hasAppointments = client.receptions.length > 0;

  const nextAppointment = () => {
    setCurrentAppointmentIndex((prev) =>
      prev < client.receptions.length - 1 ? prev + 1 : prev
    );
  };

  const prevAppointment = () => {
    setCurrentAppointmentIndex((prev) => (prev > 0 ? prev - 1 : prev));
  };

  console.log(currentAppointment);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="min-w-[900px]">
        <DialogHeader>
          <DialogDescription className="hidden">
            Здесь описание клиента
          </DialogDescription>
          <div className="flex items-center justify-between p-6 border-b border-gray-200">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                <User className="h-6 w-6 text-green-600" />
              </div>
              <div>
                <DialogTitle>{client?.profile.fullName}</DialogTitle>
              </div>
            </div>
            {/* <div className="flex items-center space-x-2">
              <button
                onClick={() => (isEditing ? handleSave() : setIsEditing(true))}
                className="flex items-center space-x-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
              >
                {isEditing ? (
                  <>
                    <Save className="h-4 w-4" />
                    <span>Сохранить</span>
                  </>
                ) : (
                  <>
                    <Edit2 className="h-4 w-4" />
                    <span>Редактировать</span>
                  </>
                )}
              </button>
              {isEditing && (
                <button
                  onClick={handleCancel}
                  className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Отмена
                </button>
              )}
              <button
                onClick={onClose}
                className="p-2 text-gray-400 hover:text-gray-600 transition-colors"
              >
                <X className="h-6 w-6" />
              </button>
            </div> */}
          </div>

          <div className="p-6 max-h-[70vh] overflow-y-auto">
            <div className="space-y-8">
              {/* Client Details */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Имя
                    </label>
                    {isEditing ? (
                      <div></div>
                    ) : (
                      // <input
                      //   type="text"
                      //   value={editedClient.firstName}
                      //   onChange={(e) =>
                      //     setEditedClient({
                      //       ...editedClient,
                      //       firstName: e.target.value,
                      //     })
                      //   }
                      //   className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                      // />
                      <p className="text-gray-900">
                        {client?.profile.fullName}
                      </p>
                    )}
                  </div>

                  <div className="flex items-center space-x-3">
                    <div className="flex-1">
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        ИИН
                      </label>
                      {isEditing ? (
                        <div></div>
                      ) : (
                        // <input
                        //   type="text"
                        //   value={editedClient.iin}
                        //   onChange={(e) =>
                        //     setEditedClient({
                        //       ...editedClient,
                        //       iin: e.target.value,
                        //     })
                        //   }
                        //   className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                        // />
                        <p className="text-gray-900">{client?.profile.iin}</p>
                      )}
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <div className="flex-1">
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Телефон
                      </label>
                      {isEditing ? (
                        <div></div>
                      ) : (
                        // <input
                        //   type="text"
                        //   value={editedClient.phone}
                        //   onChange={(e) =>
                        //     setEditedClient({
                        //       ...editedClient,
                        //       phone: e.target.value,
                        //     })
                        //   }
                        //   className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                        // />
                        <p className="text-gray-900">{client?.profile.phone}</p>
                      )}
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Количество записей
                    </label>
                    <p className="text-2xl font-bold text-green-600">
                      {client?.receptions.length}
                    </p>
                  </div>
                </div>
              </div>

              {/* Appointments Carousel */}
              {hasAppointments && (
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <h4 className="text-lg font-medium text-gray-900">
                      История посещений
                    </h4>
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={prevAppointment}
                        disabled={currentAppointmentIndex === 0}
                        className="p-2 text-gray-400 hover:text-gray-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                      >
                        <ChevronLeft className="h-5 w-5" />
                      </button>
                      <span className="text-sm text-gray-600">
                        {currentAppointmentIndex + 1} из{" "}
                        {client.receptions.length}
                      </span>
                      <button
                        onClick={nextAppointment}
                        disabled={
                          currentAppointmentIndex ===
                          client.receptions.length - 1
                        }
                        className="p-2 text-gray-400 hover:text-gray-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                      >
                        <ChevronRight className="h-5 w-5" />
                      </button>
                    </div>
                  </div>

                  {currentAppointment && (
                    <div className="bg-gray-50 rounded-lg p-6">
                      <div className="flex items-start justify-between mb-4">
                        <div>
                          <h5 className="text-lg font-semibold text-gray-900 mb-2">
                            {currentAppointment.service.name.ru}
                          </h5>
                          <span
                            className={`px-3 py-1 text-sm font-medium rounded-full ${getStatusColor(
                              currentAppointment.status
                            )}`}
                          >
                            {normalizeStatus(currentAppointment.status)}
                          </span>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                        <div className="col-span-2 flex items-center space-x-2 text-sm text-gray-600">
                          <User className="h-4 w-4" />
                          <span>
                            Менеджер:{" "}
                            {currentAppointment.employee?.profile.fullName}
                          </span>
                        </div>
                        <div className="flex items-center space-x-2 text-sm text-gray-600">
                          <Calendar className="h-4 w-4" />
                          <span>
                            Дата:{" "}
                            {new Date(
                              currentAppointment.date
                            ).toLocaleDateString("ru-RU")}
                          </span>
                        </div>
                        <div className="flex items-center space-x-2 text-sm text-gray-600">
                          <Calendar className="h-4 w-4" />
                          <span>
                            Время:
                            {new Date(
                              currentAppointment.time
                            ).toLocaleTimeString("ru-RU", {
                              hour: "2-digit",
                              minute: "2-digit",
                            })}
                          </span>
                        </div>
                      </div>

                      {currentAppointment.comment && (
                        <div className="mt-4 p-3 bg-white rounded-lg">
                          <p className="text-sm text-gray-700">
                            <span className="font-medium">Заметки: </span>
                            {currentAppointment.comment}
                          </p>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              )}

              {!hasAppointments && (
                <div className="text-center py-8">
                  <Calendar className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">
                    Нет записей
                  </h3>
                  <p className="text-gray-500">
                    У этого клиента пока нет записей на прием
                  </p>
                </div>
              )}
            </div>
          </div>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};
