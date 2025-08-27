"use client";

import { Plus } from "lucide-react";
import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { useGetDepartmentList } from "@/modules/departments/application/use-cases";
import { useCreateEmployee } from "@/modules/users/application/use-cases";
import { useGetServiceList } from "@/modules/users/application/use-cases";
import { useGetDepartmentFeatures } from "@/modules/users/application/use-cases";
import { CreateEmployeeSchema } from "@/modules/users/domain/schemas";
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
import { KAZAKH_ALPHABET } from "@/shared/consts";

import { zodResolver } from "@hookform/resolvers/zod";

export const CreateEmployeeModal: React.FC = () => {
  const [open, setOpen] = React.useState(false);
  const [selectedDepartmentId, setSelectedDepartmentId] =
    React.useState<string>("");
  const [isSubmitting, setIsSubmitting] = React.useState(false);

  const createEmployeeMutation = useCreateEmployee();
  const { data: services } = useGetServiceList();
  const { data: departments } = useGetDepartmentList();
  const { data: departmentFeatures } =
    useGetDepartmentFeatures(selectedDepartmentId);

  const {
    control,
    handleSubmit,
    setValue,
    reset,
    watch,
    formState: { errors, isValid },
    trigger,
  } = useForm<z.input<typeof CreateEmployeeSchema>>({
    resolver: zodResolver(CreateEmployeeSchema),
    mode: "onChange",
    defaultValues: {
      login: "",
      password: "",
      profile: { fullName: "", phone: "" },
      cabinet: 0,
      table: 0,
      department_id: "",
      service_ids: [],
      employee_features: {},
    },
  });

  const hasLetterFeature = React.useMemo(() => {
    return departmentFeatures?.some(
      (feature) => feature.type === "LETTER" && feature.value === "true"
    );
  }, [departmentFeatures]);

  const handleDepartmentChange = React.useCallback(
    (value: string) => {
      setSelectedDepartmentId(value);
      setValue("department_id", value);
      setValue("employee_features", {});
      trigger("department_id");
    },
    [setValue, trigger]
  );

  const handleLettersChange = React.useCallback(
    (letters: string[]) => {
      setValue("employee_features", { LETTER: letters.join(",") });
      trigger("employee_features");
    },
    [setValue, trigger]
  );

  const handleServiceToggle = React.useCallback(
    (serviceId: string) => {
      const currentValues = watch("service_ids") || [];
      const newValues = currentValues.includes(serviceId)
        ? currentValues.filter((id: string) => id !== serviceId)
        : [...currentValues, serviceId];
      setValue("service_ids", newValues);
      trigger("service_ids");
    },
    [watch, setValue, trigger]
  );

  const onSubmit = React.useCallback(
    async (data: z.input<typeof CreateEmployeeSchema>) => {
      if (isSubmitting || !isFormValid) return;

      try {
        setIsSubmitting(true);
        const isValid = await trigger();
        if (!isValid) return;

        if (
          !data.login?.trim() ||
          !data.password?.trim() ||
          !data.profile?.fullName?.trim() ||
          !data.profile?.phone?.trim() ||
          !data.department_id ||
          data.cabinet <= 0 ||
          data.table <= 0 ||
          !data.service_ids?.length
        ) {
          return;
        }

        if (
          hasLetterFeature &&
          (!data.employee_features?.LETTER ||
            data.employee_features.LETTER.length === 0)
        ) {
          return;
        }

        const validatedData = CreateEmployeeSchema.parse(data);
        await createEmployeeMutation.mutateAsync(validatedData);

        reset();
        setOpen(false);
        setSelectedDepartmentId("");
      } catch (error) {
        console.error("Error creating employee:", error);
      } finally {
        setIsSubmitting(false);
      }
    },
    [isSubmitting, trigger, hasLetterFeature, createEmployeeMutation, reset]
  );

  const handleClose = React.useCallback(() => {
    if (isSubmitting) return;
    setOpen(false);
    reset();
    setSelectedDepartmentId("");
  }, [isSubmitting, reset]);

  const isFormValid = React.useMemo(() => {
    const formValues = watch();
    const requiredFieldsValid =
      formValues.login?.trim() &&
      formValues.password?.trim() &&
      formValues.profile?.fullName?.trim() &&
      formValues.profile?.phone?.trim() &&
      formValues.department_id &&
      formValues.cabinet > 0 &&
      formValues.table > 0 &&
      formValues.service_ids?.length > 0;

    const conditionalFieldsValid =
      !hasLetterFeature ||
      (formValues.employee_features?.LETTER &&
        formValues.employee_features.LETTER.length > 0);

    return requiredFieldsValid && conditionalFieldsValid && isValid;
  }, [watch, hasLetterFeature, isValid]);

  const serviceOptions = React.useMemo(() => {
    if (!services) return [];
    return services.map((service) => ({
      value: service.id,
      label: service.name.ru,
    }));
  }, [services]);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="flex items-center gap-2">
          <Plus className="h-4 w-4" />
          Создать работника
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-[500px] max-h-[90vh] overflow-hidden flex flex-col">
        <DialogHeader>
          <DialogTitle>Создать нового работника</DialogTitle>
          <DialogDescription>
            Заполните информацию о новом работнике. Все поля обязательны для
            заполнения.
          </DialogDescription>
        </DialogHeader>

        <form
          onSubmit={handleSubmit(onSubmit)}
          onKeyDown={(e) => {
            if (e.key === "Enter" && !isFormValid) {
              e.preventDefault();
            }
          }}
          className="space-y-4 overflow-y-auto flex-1"
        >
          <div className="space-y-2">
            <Label htmlFor="login">Логин *</Label>
            <Input
              id="login"
              type="text"
              placeholder="Введите логин работника"
              disabled={isSubmitting}
              {...control.register("login")}
            />
            {errors.login && (
              <p className="text-sm text-red-500">{errors.login.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="password">Пароль *</Label>
            <Input
              id="password"
              type="password"
              placeholder="Введите пароль работника"
              disabled={isSubmitting}
              {...control.register("password")}
            />
            {errors.password && (
              <p className="text-sm text-red-500">{errors.password.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="department">Отдел *</Label>
            <Select
              value={selectedDepartmentId}
              onValueChange={handleDepartmentChange}
              disabled={isSubmitting}
            >
              <SelectTrigger>
                <SelectValue placeholder="Выберите отдел" />
              </SelectTrigger>
              <SelectContent>
                {departments?.map((dept) => (
                  <SelectItem key={dept.id} value={dept.id}>
                    {dept.name.ru}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {errors.department_id && (
              <p className="text-sm text-red-500">
                {errors.department_id.message}
              </p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="fullName">ФИО *</Label>
            <Input
              id="fullName"
              type="text"
              placeholder="Введите полное ФИО работника"
              disabled={isSubmitting}
              {...control.register("profile.fullName")}
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
              placeholder="Введите сотовый телефон работника"
              disabled={isSubmitting}
              {...control.register("profile.phone")}
            />
            {errors.profile?.phone && (
              <p className="text-sm text-red-500">
                {errors.profile.phone.message}
              </p>
            )}
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="cabinet">Кабинет *</Label>
              <Input
                id="cabinet"
                type="number"
                min="1"
                placeholder="Номер кабинета"
                disabled={isSubmitting}
                {...control.register("cabinet", { valueAsNumber: true })}
              />
              {errors.cabinet && (
                <p className="text-sm text-red-500">{errors.cabinet.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="table">Стол *</Label>
              <Input
                id="table"
                type="number"
                min="1"
                placeholder="Номер стола"
                disabled={isSubmitting}
                {...control.register("table", { valueAsNumber: true })}
              />
              {errors.table && (
                <p className="text-sm text-red-500">{errors.table.message}</p>
              )}
            </div>
          </div>

          <div className="space-y-2">
            <Label>Сервисы *</Label>
            <div className="flex flex-wrap gap-2">
              {serviceOptions.map((service) => (
                <span
                  key={service.value}
                  className={`px-2 py-1 text-xs rounded-full cursor-pointer transition-colors ${
                    watch("service_ids")?.includes(service.value)
                      ? "bg-blue-600 text-white"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  } ${isSubmitting ? "cursor-not-allowed opacity-50" : ""}`}
                  onClick={() =>
                    !isSubmitting && handleServiceToggle(service.value)
                  }
                >
                  {service.label}
                </span>
              ))}
            </div>
            {errors.service_ids && (
              <p className="text-sm text-red-500">
                {errors.service_ids.message}
              </p>
            )}
          </div>

          {hasLetterFeature && (
            <div className="space-y-2">
              <Label>Буквы *</Label>
              <LetterSelector
                onLettersChange={handleLettersChange}
                selectedLetters={
                  watch("employee_features")
                    ?.LETTER?.split(",")
                    .filter(Boolean) || []
                }
                disabled={isSubmitting}
              />
              {errors.employee_features && (
                <p className="text-sm text-red-500">
                  Выберите хотя бы одну букву
                </p>
              )}
            </div>
          )}

          <DialogFooter className="flex-shrink-0">
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
              disabled={isSubmitting || !isFormValid}
              title={!isFormValid ? "Заполните все обязательные поля" : ""}
            >
              {isSubmitting ? "Создание..." : "Создать"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

const LetterSelector: React.FC<{
  onLettersChange: (letters: string[]) => void;
  selectedLetters: string[];
  disabled?: boolean;
}> = ({ onLettersChange, selectedLetters, disabled = false }) => {
  const handleLetterToggle = React.useCallback(
    (letter: string, event: React.MouseEvent) => {
      event.preventDefault();
      event.stopPropagation();
      if (disabled) return;

      const newSelection = selectedLetters.includes(letter)
        ? selectedLetters.filter((l: string) => l !== letter)
        : [...selectedLetters, letter];

      onLettersChange(newSelection);
    },
    [selectedLetters, onLettersChange, disabled]
  );

  return (
    <div className="space-y-2">
      <div className="flex flex-wrap gap-1">
        {KAZAKH_ALPHABET.map((letter) => (
          <Button
            key={letter}
            size="sm"
            type="button"
            variant={selectedLetters.includes(letter) ? "default" : "outline"}
            onClick={(event) => handleLetterToggle(letter, event)}
            disabled={disabled}
            className="w-8 h-8 p-0"
          >
            {letter}
          </Button>
        ))}
      </div>
      {selectedLetters.length > 0 && (
        <p className="text-sm text-muted-foreground">
          Выбрано: {selectedLetters.sort().join(", ")}
        </p>
      )}
    </div>
  );
};
