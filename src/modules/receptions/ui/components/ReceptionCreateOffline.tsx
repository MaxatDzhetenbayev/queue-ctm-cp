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

  // Используем ref для отслеживания, были ли поля заполнены пользователем
  const userFilledFields = React.useRef({
    full_name: false,
    phone: false,
  });
  const createOfflineMutation = useCreateOfflineReception();
  const isSubmitting = createOfflineMutation.isPending;
  const { data: services, isLoading: servicesLoading } =
    useGetManagerServices();

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    watch,
    formState: { errors },
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
  // Очищаем ИИН от пробелов для проверки
  const cleanIin = watchedIin?.replace(/\s/g, "") || "";

  const {
    data: userByIin,
    isLoading: userLoading,
    error: userError,
  } = useGetUserByIin(cleanIin.length === 12 ? cleanIin : null);

  // Автозаполнение полей при нахождении пользователя
  React.useEffect(() => {
    if (userByIin) {
      setValue("full_name", userByIin.fullName);
      setValue("phone", userByIin.phone);
      // Сбрасываем флаги, так как поля заполнены автоматически
      userFilledFields.current.full_name = false;
      userFilledFields.current.phone = false;
      setShowAdditionalFields(true);
    } else if (
      cleanIin.length === 12 &&
      !userLoading &&
      (userError || !userByIin)
    ) {
      // Пользователь не найден (ошибка 404 или нет данных), показываем поля для заполнения
      // НЕ очищаем поля, если они уже заполнены пользователем
      const currentFullName = watch("full_name");
      const currentPhone = watch("phone");

      if (!currentFullName && !userFilledFields.current.full_name) {
        setValue("full_name", "");
      }
      if (!currentPhone && !userFilledFields.current.phone) {
        setValue("phone", "");
      }
      setValue("serviceId", "");
      setShowAdditionalFields(true);
    } else if (cleanIin.length !== 12) {
      // ИИН не равен 12 символам, скрываем дополнительные поля и сбрасываем значения
      setShowAdditionalFields(false);
      setValue("full_name", "");
      setValue("phone", "");
      setValue("serviceId", "");
      // Сбрасываем флаги
      userFilledFields.current.full_name = false;
      userFilledFields.current.phone = false;
    }
  }, [userByIin, cleanIin, userLoading, userError, setValue, watch]);

  const onSubmit = (data: CreateOfflineReceptionType) => {
    createOfflineMutation.mutate(data, {
      onSuccess: () => {
        reset();
        setOpen(false);
      },
    });
  };

  const handleClose = () => {
    if (!isSubmitting) {
      setOpen(false);
      reset();
      setShowAdditionalFields(false);
      setClientModalOpen(false);
      setClientData(null);
      // Сбрасываем флаги заполнения полей
      userFilledFields.current.full_name = false;
      userFilledFields.current.phone = false;
    }
  };

  const handleOpenChange = (newOpen: boolean) => {
    if (!newOpen && !isSubmitting) {
      // Полная очистка формы при закрытии
      reset();
      setShowAdditionalFields(false);
      setClientModalOpen(false);
      setClientData(null);
      // Сбрасываем флаги заполнения полей
      userFilledFields.current.full_name = false;
      userFilledFields.current.phone = false;
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

        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSubmit(onSubmit)(e);
          }}
          className="space-y-4"
        >
          <div className="space-y-2">
            <Label htmlFor="iin">ИИН/БИН *</Label>
            <Input
              id="iin"
              placeholder="Введите ИИН (12 цифр)"
              disabled={isSubmitting}
              maxLength={12}
              {...register("iin", {
                onChange: (e) => {
                  // Убираем пробелы при вводе
                  const value = e.target.value.replace(/\s/g, "");
                  e.target.value = value;
                },
              })}
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
                    Найден существующий клиент:
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

            {/* Информация о том, что пользователь не найден */}
            {cleanIin.length === 12 &&
              !userLoading &&
              (userError || !userByIin) && (
                <div className="mt-2 p-3 bg-blue-50 border border-blue-200 rounded-lg">
                  <div className="flex items-center space-x-2 text-blue-800">
                    <User className="h-4 w-4" />
                    <span className="font-medium">
                      Пользователь не найден в базе данных
                    </span>
                  </div>
                  <div className="mt-1 text-sm text-blue-700">
                    Заполните данные для создания нового клиента
                  </div>
                </div>
              )}
          </div>

          {/* Дополнительные поля показываются только после ввода ИИН */}
          {showAdditionalFields && (
            <>
              <div className="space-y-2">
                <Label htmlFor="full_name">ФИО клиента/Наименование *</Label>
                <Input
                  id="full_name"
                  placeholder="Введите ФИО клиента/Наименование"
                  disabled={isSubmitting || !!userByIin}
                  {...register("full_name", {
                    onChange: (e) => {
                      // Отмечаем, что поле было заполнено пользователем
                      if (e.target.value.trim()) {
                        userFilledFields.current.full_name = true;
                      }
                    },
                  })}
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
                  {...register("phone", {
                    onChange: (e) => {
                      // Отмечаем, что поле было заполнено пользователем
                      if (e.target.value.trim()) {
                        userFilledFields.current.phone = true;
                      }
                    },
                  })}
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
                !cleanIin ||
                cleanIin.length !== 12 ||
                userLoading
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
