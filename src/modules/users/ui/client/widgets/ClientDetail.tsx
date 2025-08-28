"use client";

import {
  Calendar,
  ChevronLeft,
  ChevronRight,
  Edit2,
  User,
  X,
} from "lucide-react";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

import {
  useGetClientInfo,
  useUpdateClient,
} from "@/modules/users/application/use-cases";
import {
  UpdateClientSchema,
  UpdateClientType,
} from "@/modules/users/domain/schemas/client.shemas";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/shared/components/ui/dialog";
import { getStatusColor, normalizeStatus } from "@/shared/lib";

import { zodResolver } from "@hookform/resolvers/zod";

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

  const {
    data: client,
    isLoading,
    isError,
  } = useGetClientInfo({
    clientId: params.clientId,
  });
  const updateClientMutation = useUpdateClient(params.clientId);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting, isDirty },
    reset,
    watch,
  } = useForm<UpdateClientType>({
    resolver: zodResolver(UpdateClientSchema),
    defaultValues: {
      name: client?.profile.fullName || "",
      phone: client?.profile.phone || "",
      iin: client?.profile.iin || "",
    },
  });

  // Отслеживаем текущие значения формы
  const watchedValues = watch();

  // Сброс формы при изменении client
  useEffect(() => {
    if (client) {
      reset({
        name: client.profile.fullName || "",
        phone: client.profile.phone || "",
        iin: client.profile.iin || "",
      });
    }
  }, [client, reset]);

  const onSubmit = async (data: UpdateClientType) => {
    if (!client) return;

    try {
      await updateClientMutation.mutateAsync(data);
      setIsEditing(false);
    } catch (error) {}
  };

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
            <div className="flex items-center space-x-2">
              {!isEditing && (
                <button
                  onClick={() => setIsEditing(true)}
                  className="flex items-center space-x-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                >
                  <Edit2 className="h-4 w-4" />
                  <span>Редактировать</span>
                </button>
              )}
            </div>
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
                      <input
                        type="text"
                        {...register("name")}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                        placeholder="Введите имя"
                      />
                    ) : (
                      <p className="text-gray-900">
                        {client?.profile.fullName}
                      </p>
                    )}
                    {isEditing && errors.name && (
                      <p className="text-sm text-red-500 mt-1">
                        {errors.name.message}
                      </p>
                    )}
                  </div>

                  <div className="flex items-center space-x-3">
                    <div className="flex-1">
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        ИИН
                      </label>
                      {isEditing ? (
                        <input
                          type="text"
                          {...register("iin")}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                          placeholder="Введите ИИН (12 цифр)"
                        />
                      ) : (
                        <p className="text-gray-900">{client?.profile.iin}</p>
                      )}
                      {isEditing && errors.iin && (
                        <p className="text-sm text-red-500 mt-1">
                          {errors.iin.message}
                        </p>
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
                        <input
                          type="text"
                          {...register("phone")}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                          placeholder="+7 (999) 999-99-99"
                        />
                      ) : (
                        <p className="text-gray-900">{client?.profile.phone}</p>
                      )}
                      {isEditing && errors.phone && (
                        <p className="text-sm text-red-500 mt-1">
                          {errors.phone.message}
                        </p>
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

          {/* Кнопки управления для редактирования */}
          {isEditing && (
            <div className="p-6 border-t border-gray-200">
              <div className="flex justify-end space-x-4">
                <button
                  type="button"
                  onClick={() => {
                    setIsEditing(false);
                    reset(); // Сбрасываем форму к исходным значениям
                  }}
                  disabled={isSubmitting || updateClientMutation.isPending}
                  className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors disabled:opacity-50"
                >
                  Отмена
                </button>
                <button
                  onClick={handleSubmit(onSubmit)}
                  disabled={
                    isSubmitting || updateClientMutation.isPending || !isDirty
                  }
                  className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors disabled:opacity-50"
                >
                  {isSubmitting || updateClientMutation.isPending
                    ? "Сохранение..."
                    : "Сохранить"}
                </button>
              </div>
            </div>
          )}
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};
