"use client";

import { Plus } from "lucide-react";
import { useTranslations } from "next-intl";
import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useCreateDirector } from "@/modules/users/application/use-cases";
import { CreateDirectorSchema } from "@/modules/users/domain/schemas";
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
import { zodResolver } from "@hookform/resolvers/zod";

interface CreateDirectorModalProps {
  centerId: string;
}

export const CreateDirectorModal: React.FC<CreateDirectorModalProps> = ({
  centerId,
}) => {
  const t = useTranslations("director.create");
  const tForm = useTranslations("director.form");
  const [open, setOpen] = React.useState(false);
  const [isSubmitting, setIsSubmitting] = React.useState(false);

  const createDirectorMutation = useCreateDirector();
  const {
    control,
    handleSubmit,
    reset,
    watch,
    formState: { errors, isValid },
    trigger,
  } = useForm<z.input<typeof CreateDirectorSchema>>({
    resolver: zodResolver(CreateDirectorSchema),
    mode: "onChange",
    defaultValues: {
      login: "",
      password: "",
      profile: { fullName: "", phone: "" },
      role: "ADMIN",
      auth_type: "CREDENTIALS",
      center_id: centerId,
    },
  });

  const onSubmit = React.useCallback(
    async (data: z.input<typeof CreateDirectorSchema>) => {
      if (isSubmitting) return;
      try {
        setIsSubmitting(true);
        const valid = await trigger();
        if (!valid) return;
        const payload = { ...data, center_id: centerId };
        await createDirectorMutation.mutateAsync(
          CreateDirectorSchema.parse(payload)
        );
        reset();
        setOpen(false);
      } catch {
        // toast from mutation
      } finally {
        setIsSubmitting(false);
      }
    },
    [centerId, createDirectorMutation, reset, trigger, isSubmitting]
  );

  const formValues = watch();
  const isFormValid =
    formValues.login?.trim() &&
    formValues.password?.trim() &&
    formValues.profile?.fullName?.trim() &&
    formValues.profile?.phone?.trim() &&
    isValid;

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="flex items-center gap-2">
          <Plus className="h-4 w-4" />
          {t("button")}
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>{t("title")}</DialogTitle>
          <DialogDescription>{t("description")}</DialogDescription>
        </DialogHeader>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-4"
        >
          <div className="space-y-2">
            <Label htmlFor="login">{tForm("login")} *</Label>
            <Input
              id="login"
              {...control.register("login")}
              placeholder={tForm("login")}
              disabled={isSubmitting}
            />
            {errors.login && (
              <p className="text-sm text-red-500">{errors.login.message}</p>
            )}
          </div>
          <div className="space-y-2">
            <Label htmlFor="password">{tForm("password")} *</Label>
            <Input
              id="password"
              type="password"
              {...control.register("password")}
              placeholder={tForm("password")}
              disabled={isSubmitting}
            />
            {errors.password && (
              <p className="text-sm text-red-500">{errors.password.message}</p>
            )}
          </div>
          <div className="space-y-2">
            <Label htmlFor="fullName">{tForm("fullName")} *</Label>
            <Input
              id="fullName"
              {...control.register("profile.fullName")}
              placeholder={tForm("fullName")}
              disabled={isSubmitting}
            />
            {errors.profile?.fullName && (
              <p className="text-sm text-red-500">
                {errors.profile.fullName.message}
              </p>
            )}
          </div>
          <div className="space-y-2">
            <Label htmlFor="phone">{tForm("phone")} *</Label>
            <Input
              id="phone"
              type="tel"
              {...control.register("profile.phone")}
              placeholder={tForm("phone")}
              disabled={isSubmitting}
            />
            {errors.profile?.phone && (
              <p className="text-sm text-red-500">
                {errors.profile.phone.message}
              </p>
            )}
          </div>
          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() => setOpen(false)}
              disabled={isSubmitting}
            >
              Отмена
            </Button>
            <Button type="submit" disabled={!isFormValid || isSubmitting}>
              {isSubmitting ? "Создание..." : "Создать"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};
