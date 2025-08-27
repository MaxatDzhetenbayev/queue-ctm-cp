"use client";

import { Plus } from "lucide-react";
import React from "react";
import { useForm } from "react-hook-form";

import {
  CreateOfflineReceptionSchema,
  CreateOfflineReceptionType,
} from "@/modules/receptions/domain/schemas/reception.schemas";
import { Button } from "@/shared/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/shared/components/ui/dialog";
import { Input } from "@/shared/components/ui/input";
import { Label } from "@/shared/components/ui/label";

import { useCreateOfflineReception } from "../../application/use-cases";
import { zodResolver } from "@hookform/resolvers/zod";

export const ReceptionCreateOffline: React.FC = () => {
  const [open, setOpen] = React.useState(false);
  const createOfflineMutation = useCreateOfflineReception();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<CreateOfflineReceptionType>({
    resolver: zodResolver(CreateOfflineReceptionSchema),
    defaultValues: {
      profile: {
        fullName: "",
        phone: "",
      },
      time: new Date().toISOString().slice(0, 16), // Текущее время в формате datetime-local
    },
  });

  const onSubmit = async (data: CreateOfflineReceptionType) => {
    try {
      await createOfflineMutation.mutateAsync(data);
      reset();
      setOpen(false);
    } catch (error) {
      console.error("Ошибка при создании приема:", error);
    }
  };

  const handleClose = () => {
    if (!isSubmitting) {
      setOpen(false);
      reset();
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="flex items-center gap-2">
          <Plus className="h-4 w-4" />
          Создать прием
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Создать офлайн прием</DialogTitle>
          <DialogDescription>
            Заполните информацию о клиенте для создания приема.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="fullName">ФИО клиента *</Label>
            <Input
              id="fullName"
              placeholder="Введите ФИО клиента"
              disabled={isSubmitting}
              {...register("profile.fullName")}
            />
            {errors.profile?.fullName && (
              <p className="text-sm text-red-500">
                {errors.profile.fullName.message}
              </p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="phone">Телефон *</Label>
            <Input
              id="phone"
              type="tel"
              placeholder="Введите номер телефона"
              disabled={isSubmitting}
              {...register("profile.phone")}
            />
            {errors.profile?.phone && (
              <p className="text-sm text-red-500">
                {errors.profile.phone.message}
              </p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="time">Время приема *</Label>
            <Input
              id="time"
              type="datetime-local"
              disabled={isSubmitting}
              {...register("time")}
            />
            {errors.time && (
              <p className="text-sm text-red-500">{errors.time.message}</p>
            )}
          </div>

          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={handleClose}
              disabled={isSubmitting}
            >
              Отмена
            </Button>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Создание..." : "Создать"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};
