"use client";

import { Phone, Plus, User } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
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
  const t = useTranslations("receptions.create.offline");
  const locale = useLocale();
  const [open, setOpen] = React.useState(false);
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

  const iin = watch("iin")?.replace(/\s/g, "") || "";
  const isIinComplete = iin.length === 12;

  const { data: userByIin, isLoading: userLoading } = useGetUserByIin(
    isIinComplete ? iin : null
  );

  const showAdditionalFields = isIinComplete && !userLoading;

  // Автозаполнение при найденном пользователе
  React.useEffect(() => {
    if (userByIin) {
      setValue("full_name", userByIin.fullName);
      setValue("phone", userByIin.phone);
    } else if (isIinComplete && !userLoading) {
      // Очищаем поля если ИИН изменился и пользователь не найден
      setValue("full_name", "");
      setValue("phone", "");
    }
  }, [userByIin, isIinComplete, userLoading, setValue]);

  const handleSubmitForm = (data: CreateOfflineReceptionType) => {
    createOfflineMutation.mutate(data, {
      onSuccess: () => {
        reset();
        setOpen(false);
      },
    });
  };

  const handleClose = () => {
    if (!createOfflineMutation.isPending) {
      setOpen(false);
      reset();
      setClientModalOpen(false);
      setClientData(null);
    }
  };

  const handleOpenChange = (newOpen: boolean) => {
    if (!newOpen && !createOfflineMutation.isPending) {
      reset();
      setClientModalOpen(false);
      setClientData(null);
    }
    setOpen(newOpen);
  };

  const openClientModal = (clientId: string) => {
    setClientData({ clientId });
    setClientModalOpen(true);
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>
        <Button className="flex items-center gap-2">
          <Plus className="h-4 w-4" />
          {t("button")}
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{t("title")}</DialogTitle>
          <DialogDescription>{t("description")}</DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit(handleSubmitForm)} className="space-y-4">
          {/* ИИН поле */}
          <div className="space-y-2">
            <Label htmlFor="iin">{t("iinLabel")}</Label>
            <Input
              id="iin"
              placeholder={t("iinPlaceholder")}
              disabled={createOfflineMutation.isPending}
              maxLength={12}
              {...register("iin", {
                onChange: (e) => {
                  e.target.value = e.target.value.replace(/\s/g, "");
                },
              })}
            />
            {errors.iin && (
              <p className="text-sm text-red-500">{errors.iin.message}</p>
            )}

            {/* Индикатор загрузки */}
            {userLoading && (
              <p className="text-sm text-blue-500">{t("userLoading")}</p>
            )}

            {/* Найденный пользователь */}
            {userByIin && (
              <div className="mt-2 p-3 bg-green-50 border border-green-200 rounded-lg">
                <div className="flex items-center space-x-2 text-green-800">
                  <User className="h-4 w-4" />
                  <span className="font-medium">
                    {t("userFoundTitle")}
                  </span>
                </div>
                <div className="mt-2 space-y-1 text-sm text-green-700">
                  <div className="flex items-center space-x-2">
                    <User className="h-3 w-3" />
                    <button
                      type="button"
                      onClick={() => openClientModal(userByIin.id)}
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

            {/* Пользователь не найден */}
            {showAdditionalFields && !userByIin && !userLoading && (
              <div className="mt-2 p-3 bg-blue-50 border border-blue-200 rounded-lg">
                <div className="flex items-center space-x-2 text-blue-800">
                  <User className="h-4 w-4" />
                  <span className="font-medium">
                    {t("userNotFoundTitle")}
                  </span>
                </div>
                <div className="mt-1 text-sm text-blue-700">
                  {t("userNotFoundDescription")}
                </div>
              </div>
            )}
          </div>

          {/* Поля для нового клиента */}
          {showAdditionalFields && !userByIin && (
            <>
              <div className="space-y-2">
                <Label htmlFor="full_name">{t("fullNameLabel")}</Label>
                <Input
                  id="full_name"
                  placeholder={t("fullNamePlaceholder")}
                  disabled={createOfflineMutation.isPending}
                  {...register("full_name")}
                />
                {errors.full_name && (
                  <p className="text-sm text-red-500">
                    {errors.full_name.message}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="phone">{t("phoneLabel")}</Label>
                <Input
                  id="phone"
                  type="tel"
                  placeholder={t("phonePlaceholder")}
                  disabled={createOfflineMutation.isPending}
                  {...register("phone")}
                />
                {errors.phone && (
                  <p className="text-sm text-red-500">{errors.phone.message}</p>
                )}
              </div>
            </>
          )}

          {/* Поле сервиса всегда показывается */}
          {showAdditionalFields && (
            <div className="space-y-2">
              <Label htmlFor="serviceId">{t("serviceLabel")}</Label>
              <Select
                disabled={createOfflineMutation.isPending || servicesLoading}
                onValueChange={(value) => setValue("serviceId", value)}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder={t("servicePlaceholder")} />
                </SelectTrigger>
                <SelectContent>
                  {services?.map((service) => (
                    <SelectItem key={service.id} value={service.id}>
                      {service.name[locale as "ru" | "kz"]}
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
          )}

          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={handleClose}
              disabled={createOfflineMutation.isPending}
            >
              {t("cancel")}
            </Button>
            <Button
              type="submit"
              disabled={
                createOfflineMutation.isPending ||
                !showAdditionalFields ||
                !isIinComplete ||
                userLoading ||
                !watch("serviceId") ||
                (!userByIin && (!watch("full_name") || !watch("phone")))
              }
            >
              {createOfflineMutation.isPending
                ? t("submitCreating")
                : t("submit")}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>

      {/* ClientDetail модалка */}
      {clientData && (
        <ClientDetail
          key={clientData.clientId}
          open={clientModalOpen}
          params={{ clientId: clientData.clientId }}
          onOpenChange={setClientModalOpen}
          onClientUpdate={() => {}}
        />
      )}
    </Dialog>
  );
};
