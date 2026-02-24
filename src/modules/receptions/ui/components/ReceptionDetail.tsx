"use client";

import { Eye } from "lucide-react";
import React from "react";

import { ReceptionStatusType } from "@/modules/receptions/domain/schemas/reception.schemas";
import { Button } from "@/shared/components/ui/button";
import { formatDateTimeAlmaty, formatTimeAlmaty } from "@/shared/lib";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/shared/components/ui/dialog";

import { useGetReceptionById } from "../../application/use-cases";
import {
  STATUS_COLORS,
  STATUS_LABELS,
} from "../../domain/constants/status.constants";

interface ReceptionDetailProps {
  id: string;
}

// Функция для нормализации статуса
const normalizeStatus = (status: ReceptionStatusType): string => {
  return STATUS_LABELS[status] || status;
};

// Функция для получения цвета статуса
const getStatusColor = (status: ReceptionStatusType): string => {
  return STATUS_COLORS[status] || "bg-gray-100 text-gray-800";
};

export const ReceptionDetail: React.FC<ReceptionDetailProps> = ({ id }) => {
  const [open, setOpen] = React.useState(false);
  const { data: reception, isLoading, error } = useGetReceptionById(id);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm">
          <Eye className="h-4 w-4" />
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Детали приема</DialogTitle>
          <DialogDescription>
            Подробная информация о приеме клиента.
          </DialogDescription>
        </DialogHeader>

        {isLoading ? (
          <div className="space-y-4">
            <div className="h-4 bg-gray-200 rounded animate-pulse"></div>
            <div className="h-4 bg-gray-200 rounded animate-pulse"></div>
            <div className="h-4 bg-gray-200 rounded animate-pulse"></div>
          </div>
        ) : error ? (
          <div className="text-red-500">Ошибка при загрузке данных</div>
        ) : reception ? (
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <h4 className="font-medium text-sm text-gray-500">
                  ФИО клиента
                </h4>
                <p className="text-sm">{reception.user.profile.fullName}</p>
              </div>
              <div>
                <h4 className="font-medium text-sm text-gray-500">Телефон</h4>
                <p className="text-sm">{reception.user.profile.phone}</p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <h4 className="font-medium text-sm text-gray-500">
                  Время приема
                </h4>
                <p className="text-sm">
                  {formatDateTimeAlmaty(reception.time)}
                </p>
              </div>
              <div>
                <h4 className="font-medium text-sm text-gray-500">Статус</h4>
                <span
                  className={`inline-flex px-2 py-1 text-xs rounded-full ${getStatusColor(
                    reception.status
                  )}`}
                >
                  {normalizeStatus(reception.status)}
                </span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <h4 className="font-medium text-sm text-gray-500">
                  Дата приема
                </h4>
                <p className="text-sm">
                  {new Date(reception.date).toLocaleDateString("ru-RU")}
                </p>
              </div>
              <div>
                <h4 className="font-medium text-sm text-gray-500">
                  Время приема
                </h4>
                <p className="text-sm">
                  {formatTimeAlmaty(reception.time)}
                </p>
              </div>
            </div>
            {reception.comment && (
              <div>
                <h4 className="font-medium text-sm text-gray-500">
                  Комментарий
                </h4>
                <p className="text-sm">{reception.comment}</p>
              </div>
            )}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <h4 className="font-medium text-sm text-gray-500">Сервис</h4>
                <p className="text-sm">{reception?.service?.name.ru}</p>
              </div>
              <div>
                <h4 className="font-medium text-sm text-gray-500">Центр</h4>
                <p className="text-sm">{reception?.center?.name.ru}</p>
              </div>
            </div>
            <div>
              <h4 className="font-medium text-sm text-gray-500">Департамент</h4>
              <p className="text-sm">{reception?.department?.name.ru}</p>
            </div>
          </div>
        ) : (
          <div className="text-gray-500">Прием не найден</div>
        )}
      </DialogContent>
    </Dialog>
  );
};
