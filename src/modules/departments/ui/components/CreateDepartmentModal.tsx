"use client";

import { Plus } from "lucide-react";
import { useTranslations } from "next-intl";
import React from "react";
import { useForm } from "react-hook-form";

import { useCreateDepartment } from "@/modules/departments/application/use-cases";
import {
  CreateDepartmentSchema,
  CreateDepartmentType,
} from "@/modules/departments/domain/schemas";
import { useDepartmentFormStore } from "@/modules/departments/domain/stores";
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

import { DepartmentFeaturesControl } from "./DepartmentFeaturesControl";

import { zodResolver } from "@hookform/resolvers/zod";

export const CreateDepartmentModal = () => {
  const t = useTranslations("departments");
  const tCommon = useTranslations("common.buttons");
  const [open, setOpen] = React.useState(false);
  const createDepartmentMutation = useCreateDepartment();
  const { departmentFeatures, resetForm } = useDepartmentFormStore();

  const {
    control,
    handleSubmit,
    setValue,
    reset,
    formState: { errors },
  } = useForm<CreateDepartmentType>({
    resolver: zodResolver(CreateDepartmentSchema),
    defaultValues: {
      name: {
        ru: "",
        kz: "",
      },
      departmentFeatures: {},
    },
  });

  // Синхронизируем состояние формы с Zustand store
  React.useEffect(() => {
    setValue("departmentFeatures", departmentFeatures);
  }, [departmentFeatures, setValue]);

  const onSubmit = (data: CreateDepartmentType) => {
    createDepartmentMutation.mutate(data, {
      onSuccess: () => {
        reset();
        resetForm();
        setOpen(false);
      },
    });
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="flex items-center gap-2">
          <Plus className="h-4 w-4" />
          {t("create.button")}
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>{t("create.title")}</DialogTitle>
          <DialogDescription>
            {t("create.description")}
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="nameRu">{t("create.nameRu")}</Label>
            <Input
              id="nameRu"
              placeholder={t("create.nameRuPlaceholder")}
              {...control.register("name.ru")}
            />
            {errors.name?.ru && (
              <p className="text-sm text-red-500">{errors.name.ru.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="nameKz">{t("create.nameKz")}</Label>
            <Input
              id="nameKz"
              placeholder={t("create.nameKzPlaceholder")}
              {...control.register("name.kz")}
            />
            {errors.name?.kz && (
              <p className="text-sm text-red-500">{errors.name.kz.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label>{t("create.features")}</Label>
            <DepartmentFeaturesControl control={control} />
          </div>

          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() => setOpen(false)}
              disabled={createDepartmentMutation.isPending}
            >
              {tCommon("cancel")}
            </Button>
            <Button type="submit" disabled={createDepartmentMutation.isPending}>
              {createDepartmentMutation.isPending ? t("create.creating") : tCommon("create")}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};
