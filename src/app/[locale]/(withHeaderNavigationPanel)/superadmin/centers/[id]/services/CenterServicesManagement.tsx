"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useTranslations } from "next-intl";
import React, { useState } from "react";
import { Trash2, Plus } from "lucide-react";

import { getCenter, attachServiceToCenter, detachServiceFromCenter } from "@/shared/api/centers.api";
import { fetchServiceList } from "@/modules/users/infrastructure/api/service.api";
import { Button } from "@/shared/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/shared/components/ui/select";
import { toast } from "react-toastify";

interface CenterServicesManagementProps {
  centerId: string;
}

export const CenterServicesManagement = ({
  centerId,
}: CenterServicesManagementProps) => {
  const t = useTranslations("superadmin.centers");
  const queryClient = useQueryClient();
  const [selectedServiceId, setSelectedServiceId] = useState<string>("");

  const { data: center, isLoading: centerLoading } = useQuery({
    queryKey: ["center", centerId],
    queryFn: () => getCenter(centerId),
  });

  const { data: allServices, isLoading: servicesLoading } = useQuery({
    queryKey: ["services-list"],
    queryFn: fetchServiceList,
  });

  const attachMutation = useMutation({
    mutationFn: (serviceId: string) => attachServiceToCenter(centerId, serviceId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["center", centerId] });
      queryClient.invalidateQueries({ queryKey: ["services-list"] });
      toast.success("Сервис успешно добавлен к центру");
      setSelectedServiceId("");
    },
    onError: (error: any) => {
      toast.error(error?.response?.data?.message || "Ошибка при добавлении сервиса");
    },
  });

  const detachMutation = useMutation({
    mutationFn: (serviceId: string) => detachServiceFromCenter(centerId, serviceId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["center", centerId] });
      toast.success("Сервис успешно удален из центра");
    },
    onError: (error: any) => {
      const message = error?.response?.data?.message || "Ошибка при удалении сервиса";
      toast.error(message);
    },
  });

  const centerServices = center?.centerServices || [];
  const availableServices = allServices?.filter(
    (service) => !centerServices.some((cs) => cs.serviceId === service.id)
  ) || [];

  const nameOf = (name: Record<string, string> | string) => {
    if (typeof name === "object") {
      return name.ru ?? name.kz ?? Object.values(name)[0] ?? "";
    }
    return String(name);
  };

  const handleAddService = () => {
    if (!selectedServiceId) {
      toast.warning("Выберите сервис для добавления");
      return;
    }
    attachMutation.mutate(selectedServiceId);
  };

  const handleRemoveService = (serviceId: string, serviceName: string) => {
    if (
      !confirm(
        `Вы уверены, что хотите удалить сервис "${serviceName}" из центра? Сервисы с записями нельзя удалить.`
      )
    ) {
      return;
    }
    detachMutation.mutate(serviceId);
  };

  if (centerLoading || servicesLoading) {
    return <p className="text-gray-500">{t("loading")}</p>;
  }

  return (
    <div className="space-y-6">
      {/* Добавление сервиса */}
      <div className="rounded-xl border border-gray-100 bg-white p-4 shadow-sm">
        <h2 className="mb-4 text-lg font-semibold text-gray-900">
          Добавить сервис к центру
        </h2>
        <div className="flex gap-3">
          <Select value={selectedServiceId} onValueChange={setSelectedServiceId}>
            <SelectTrigger className="flex-1">
              <SelectValue placeholder="Выберите сервис" />
            </SelectTrigger>
            <SelectContent>
              {availableServices.length > 0 ? (
                availableServices.map((service) => (
                  <SelectItem key={service.id} value={service.id}>
                    {nameOf(service.name)}
                  </SelectItem>
                ))
              ) : (
                <SelectItem value="no-services" disabled>
                  Нет доступных сервисов
                </SelectItem>
              )}
            </SelectContent>
          </Select>
          <Button
            onClick={handleAddService}
            disabled={!selectedServiceId || attachMutation.isPending}
          >
            <Plus className="mr-2 h-4 w-4" />
            Добавить
          </Button>
        </div>
      </div>

      {/* Список сервисов центра */}
      <div className="rounded-xl border border-gray-100 bg-white shadow-sm">
        <div className="border-b border-gray-100 p-4">
          <h2 className="text-lg font-semibold text-gray-900">
            Сервисы центра ({centerServices.length})
          </h2>
        </div>
        {centerServices.length > 0 ? (
          <ul className="divide-y divide-gray-100">
            {centerServices.map((centerService) => (
              <li
                key={centerService.id}
                className="flex items-center justify-between px-4 py-3 hover:bg-gray-50"
              >
                <span className="font-medium text-gray-900">
                  {nameOf(centerService.service.name)}
                </span>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() =>
                    handleRemoveService(
                      centerService.serviceId,
                      nameOf(centerService.service.name)
                    )
                  }
                  disabled={detachMutation.isPending}
                  className="text-red-600 hover:text-red-700 hover:bg-red-50"
                >
                  <Trash2 className="mr-2 h-4 w-4" />
                  Удалить
                </Button>
              </li>
            ))}
          </ul>
        ) : (
          <div className="px-4 py-8 text-center text-gray-500">
            У центра пока нет сервисов. Добавьте сервисы выше.
          </div>
        )}
      </div>
    </div>
  );
};
