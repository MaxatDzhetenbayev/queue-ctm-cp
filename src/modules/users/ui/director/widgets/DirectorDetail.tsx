"use client";

import clsx from "clsx";
import { Edit2, MapPin, Phone, User } from "lucide-react";
import { useLocale } from "next-intl";
import { useTranslations } from "next-intl";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import {
  useArchiveDirector,
  useGetEmployeeById,
  useRemoveDirector,
  useRestoreDirector,
  useUpdateDirector,
} from "@/modules/users/application/use-cases";
import {
  UpdateEmployeeSchema,
  UpdateEmployeeType,
} from "@/modules/users/domain/schemas";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/shared/components/ui/dialog";
import { Button } from "@/shared/components/ui/button";
import { Input } from "@/shared/components/ui/input";
import { Label } from "@/shared/components/ui/label";
import { zodResolver } from "@hookform/resolvers/zod";

export const DirectorDetail = ({
  open,
  selectedDirectorId,
  onOpenChange,
}: {
  open: boolean;
  selectedDirectorId: string | null;
  onOpenChange: (open: boolean) => void;
}) => {
  const t = useTranslations("director.detail");
  const tForm = useTranslations("director.form");
  const locale = useLocale();
  const [isEditing, setIsEditing] = useState(false);

  const { data: director } = useGetEmployeeById({
    id: selectedDirectorId!,
  });
  const archiveMutation = useArchiveDirector(selectedDirectorId || "");
  const restoreMutation = useRestoreDirector(selectedDirectorId || "");
  const removeMutation = useRemoveDirector(selectedDirectorId || "");
  const updateMutation = useUpdateDirector(selectedDirectorId || "");

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isDirty },
  } = useForm<UpdateEmployeeType>({
    resolver: zodResolver(UpdateEmployeeSchema),
    defaultValues: {
      profile: {
        fullName: director?.profile?.fullName ?? "",
        phone: director?.profile?.phone ?? "",
      },
      login: director?.login ?? "",
      password: "",
    },
  });

  useEffect(() => {
    if (director) {
      reset({
        profile: {
          fullName: director.profile?.fullName ?? "",
          phone: director.profile?.phone ?? "",
        },
        login: director.login ?? "",
        password: "",
      });
    }
  }, [director, reset]);

  const handleArchive = async () => {
    if (!selectedDirectorId) return;
    try {
      await archiveMutation.mutateAsync(undefined as unknown as void);
      onOpenChange(false);
    } catch {}
  };

  const handleRestore = async () => {
    if (!selectedDirectorId) return;
    try {
      await restoreMutation.mutateAsync(undefined as unknown as void);
      onOpenChange(false);
    } catch {}
  };

  const handleRemove = async () => {
    if (!selectedDirectorId) return;
    if (!window.confirm(t("removeConfirm"))) return;
    try {
      await removeMutation.mutateAsync(undefined as unknown as void);
      onOpenChange(false);
    } catch {}
  };

  const onSubmit = async (data: UpdateEmployeeType) => {
    if (!selectedDirectorId) return;
    try {
      const payload: UpdateEmployeeType = {
        profile:
          data.profile?.fullName || data.profile?.phone
            ? {
                fullName: data.profile.fullName,
                phone: data.profile.phone,
              }
            : undefined,
        login: data.login?.trim() ? data.login : undefined,
        password: data.password?.trim() ? data.password : undefined,
      };
      await updateMutation.mutateAsync(payload);
      setIsEditing(false);
    } catch {}
  };

  const nameOf = (name: Record<string, string> | undefined) =>
    name?.[locale as "ru" | "kz"] ?? "";

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="min-w-[400px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <div className="flex items-center justify-between pt-2 px-3">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                <User className="h-6 w-6 text-blue-600" />
              </div>
              <DialogTitle className="text-xl font-bold text-gray-900">
                {director?.profile?.fullName ?? "—"}
              </DialogTitle>
              <div
                className={clsx("rounded-full p-2", {
                  "bg-green-500": director?.employeeInfo?.isOnline,
                  "bg-red-500": !director?.employeeInfo?.isOnline,
                })}
              />
            </div>
            {!isEditing && (
              <Button
                variant="outline"
                size="sm"
                onClick={() => setIsEditing(true)}
                className="flex items-center gap-2"
              >
                <Edit2 className="h-4 w-4" />
                {t("edit")}
              </Button>
            )}
          </div>
        </DialogHeader>

        {isEditing ? (
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="space-y-4 px-3 pb-2"
          >
            <div className="space-y-2">
              <Label htmlFor="director-fullName">{tForm("fullName")}</Label>
              <Input
                id="director-fullName"
                {...register("profile.fullName")}
                placeholder={tForm("fullName")}
                disabled={updateMutation.isPending}
              />
              {errors.profile?.fullName && (
                <p className="text-sm text-red-500">
                  {errors.profile.fullName.message}
                </p>
              )}
            </div>
            <div className="space-y-2">
              <Label htmlFor="director-phone">{tForm("phone")}</Label>
              <Input
                id="director-phone"
                type="tel"
                {...register("profile.phone")}
                placeholder={tForm("phone")}
                disabled={updateMutation.isPending}
              />
              {errors.profile?.phone && (
                <p className="text-sm text-red-500">
                  {errors.profile.phone.message}
                </p>
              )}
            </div>
            <div className="space-y-2">
              <Label htmlFor="director-login">{tForm("login")}</Label>
              <Input
                id="director-login"
                {...register("login")}
                placeholder={tForm("login")}
                disabled={updateMutation.isPending}
              />
              {errors.login && (
                <p className="text-sm text-red-500">{errors.login.message}</p>
              )}
            </div>
            <div className="space-y-2">
              <Label htmlFor="director-password">{tForm("password")}</Label>
              <Input
                id="director-password"
                type="password"
                {...register("password")}
                placeholder={t("passwordPlaceholder")}
                disabled={updateMutation.isPending}
              />
              {errors.password && (
                <p className="text-sm text-red-500">
                  {errors.password.message}
                </p>
              )}
            </div>
            <div className="flex gap-2 pt-2">
              <Button
                type="button"
                variant="outline"
                onClick={() => setIsEditing(false)}
                disabled={updateMutation.isPending}
              >
                {t("cancel")}
              </Button>
              <Button
                type="submit"
                disabled={updateMutation.isPending || !isDirty}
              >
                {updateMutation.isPending ? "..." : t("save")}
              </Button>
            </div>
          </form>
        ) : (
          <div className="space-y-3 px-3 pb-2">
            {director?.profile?.phone && (
              <div className="flex items-center text-sm text-gray-600">
                <Phone className="h-4 w-4 mr-2" />
                {director.profile.phone}
              </div>
            )}
            {director?.employeeInfo?.center && (
              <div className="flex items-center text-sm text-gray-600">
                <MapPin className="h-4 w-4 mr-2" />
                {nameOf(director.employeeInfo.center.name)}
              </div>
            )}
            {director?.login && (
              <div className="text-sm text-gray-500">
                {tForm("login")}: {director.login}
              </div>
            )}
          </div>
        )}

        {!isEditing && (
          <div className="mt-4 pt-4 border-t flex items-center justify-end gap-2 px-3">
            {director?.employeeInfo?.status === "ARCHIVED" ? (
              <Button
                variant="outline"
                onClick={handleRestore}
                disabled={restoreMutation.isPending}
              >
                {restoreMutation.isPending ? "..." : t("restore")}
              </Button>
            ) : (
              <Button
                variant="outline"
                onClick={handleArchive}
                disabled={archiveMutation.isPending}
              >
                {archiveMutation.isPending ? "..." : t("archive")}
              </Button>
            )}
            <Button
              variant="destructive"
              onClick={handleRemove}
              disabled={removeMutation.isPending}
            >
              {removeMutation.isPending ? "..." : t("remove")}
            </Button>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};
