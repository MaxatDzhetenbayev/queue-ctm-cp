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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/shared/components/ui/select";

import {
  useCreateOfflineReception,
  useGetManagerServices,
} from "../../application/use-cases";
import { zodResolver } from "@hookform/resolvers/zod";

export const ReceptionCreateOffline: React.FC = () => {
  const [open, setOpen] = React.useState(false);
  const createOfflineMutation = useCreateOfflineReception();
  const { data: services, isLoading: servicesLoading } =
    useGetManagerServices();

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<CreateOfflineReceptionType>({
    resolver: zodResolver(CreateOfflineReceptionSchema),
    defaultValues: {
      full_name: "",
      iin: "",
      phone: "",
      serviceId: "",
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
            <Label htmlFor="full_name">ФИО клиента *</Label>
            <Input
              id="full_name"
              placeholder="Введите ФИО клиента"
              disabled={isSubmitting}
              {...register("full_name")}
            />
            {errors.full_name && (
              <p className="text-sm text-red-500">{errors.full_name.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="iin">ИИН *</Label>
            <Input
              id="iin"
              placeholder="Введите ИИН (12 цифр)"
              disabled={isSubmitting}
              maxLength={12}
              {...register("iin")}
            />
            {errors.iin && (
              <p className="text-sm text-red-500">{errors.iin.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="phone">Телефон *</Label>
            <Input
              id="phone"
              type="tel"
              placeholder="Введите номер телефона"
              disabled={isSubmitting}
              {...register("phone")}
            />
            {errors.phone && (
              <p className="text-sm text-red-500">{errors.phone.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="serviceId">Сервис *</Label>
            <Select
              disabled={isSubmitting || servicesLoading}
              onValueChange={(value) => setValue("serviceId", value)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Выберите сервис" />
              </SelectTrigger>
              <SelectContent className="w-full">
                {services?.map((service) => (
                  <SelectItem key={service.id} value={service.id}>
                    {service.name.ru}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {errors.serviceId && (
              <p className="text-sm text-red-500">{errors.serviceId.message}</p>
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
