"use client";

import { Phone, Plus, User } from "lucide-react";
import React from "react";
import { useForm } from "react-hook-form";

import {
  CreateOfflineReceptionSchema,
  CreateOfflineReceptionType,
} from "@/modules/receptions/domain/schemas/reception.schemas";
import { ClientDetail } from "@/modules/users/ui/client/widgets/ClientDetail";
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
  useGetUserByIin,
} from "../../application/use-cases";
import { zodResolver } from "@hookform/resolvers/zod";

export const ReceptionCreateOffline: React.FC = () => {
  const [open, setOpen] = React.useState(false);
  const [showAdditionalFields, setShowAdditionalFields] = React.useState(false);
  const [clientModalOpen, setClientModalOpen] = React.useState(false);
  const [clientData, setClientData] = React.useState<{
    clientId: string;
  } | null>(null);
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

  const watchedIin = watch("iin");
  const {
    data: userByIin,
    isLoading: userLoading,
    error: userError,
  } = useGetUserByIin(watchedIin?.length === 12 ? watchedIin : null);

  // Автозаполнение полей при нахождении пользователя
  React.useEffect(() => {
    if (userByIin) {
      setValue("full_name", userByIin.fullName);
      setValue("phone", userByIin.phone);
      setShowAdditionalFields(true);
    } else if (watchedIin?.length === 12 && !userLoading && !userError) {
      // Пользователь не найден, показываем поля для заполнения
      setShowAdditionalFields(true);
    }
  }, [userByIin, watchedIin, userLoading, userError, setValue]);

  const onSubmit = async (data: CreateOfflineReceptionType) => {
    try {
      await createOfflineMutation.mutateAsync(data);
      // Закрываем модалку, очистка произойдет в handleOpenChange
      setOpen(false);
    } catch (error) {
      console.error("Ошибка при создании приема:", error);
    }
  };

  const handleClose = () => {
    if (!isSubmitting) {
      setOpen(false);
      reset();
      setShowAdditionalFields(false);
      setClientModalOpen(false);
      setClientData(null);
    }
  };

  const handleOpenChange = (newOpen: boolean) => {
    if (!newOpen && !isSubmitting) {
      // Полная очистка формы при закрытии
      reset();
      setShowAdditionalFields(false);
      setClientModalOpen(false);
      setClientData(null);
    }
    setOpen(newOpen);
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
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

            {/* Индикатор загрузки */}
            {userLoading && (
              <p className="text-sm text-blue-500">Поиск пользователя...</p>
            )}

            {/* Информация о найденном пользователе */}
            {userByIin && (
              <div className="mt-2 p-3 bg-green-50 border border-green-200 rounded-lg">
                <div className="flex items-center space-x-2 text-green-800">
                  <User className="h-4 w-4" />
                  <span className="font-medium">
                    Найден существующий пользователь:
                  </span>
                </div>
                <div className="mt-2 space-y-1 text-sm text-green-700">
                  <div className="flex items-center space-x-2">
                    <User className="h-3 w-3" />
                    <button
                      type="button"
                      onClick={() => {
                        setClientData({
                          clientId: userByIin.id,
                        });
                        setClientModalOpen(true);
                      }}
                      className="text-blue-600 hover:text-blue-800 underline cursor-pointer"
                    >
                      {userByIin.fullName}
                    </button>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Phone className="h-3 w-3" />
                    <span>{userByIin.phone}</span>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Дополнительные поля показываются только после ввода ИИН */}
          {showAdditionalFields && (
            <>
              <div className="space-y-2">
                <Label htmlFor="full_name">ФИО клиента *</Label>
                <Input
                  id="full_name"
                  placeholder="Введите ФИО клиента"
                  disabled={isSubmitting || !!userByIin}
                  {...register("full_name")}
                />
                {errors.full_name && (
                  <p className="text-sm text-red-500">
                    {errors.full_name.message}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="phone">Телефон *</Label>
                <Input
                  id="phone"
                  type="tel"
                  placeholder="Введите номер телефона"
                  disabled={isSubmitting || !!userByIin}
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
                  <p className="text-sm text-red-500">
                    {errors.serviceId.message}
                  </p>
                )}
              </div>
            </>
          )}

          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={handleClose}
              disabled={isSubmitting}
            >
              Отмена
            </Button>
            <Button
              type="submit"
              disabled={
                isSubmitting ||
                !showAdditionalFields ||
                !watchedIin ||
                watchedIin.length !== 12
              }
            >
              {isSubmitting ? "Создание..." : "Создать"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>

      {/* ClientDetail модалка */}
      {clientData && (
        <ClientDetail
          key={clientData.clientId}
          open={clientModalOpen}
          params={{
            clientId: clientData.clientId,
          }}
          onOpenChange={setClientModalOpen}
          onClientUpdate={() => {}}
        />
      )}
    </Dialog>
  );
};
