import {
  Armchair,
  Briefcase,
  DoorOpen,
  MapPin,
  Phone,
  User,
} from "lucide-react";
import React, { Dispatch, useEffect, useState } from "react";
import { useForm } from "react-hook-form";

import { useGetDepartmentList } from "@/modules/departments/application/use-cases";
import {
  useGetDepartmentFeatures,
  useGetServiceList,
  useUpdateEmployee,
} from "@/modules/users/application/use-cases";
import {
  EmployeeOneType,
  UpdateEmployeeSchema,
  UpdateEmployeeType,
} from "@/modules/users/domain/schemas";
import { Button } from "@/shared/components/ui/button";
import { Label } from "@/shared/components/ui/label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/shared/components/ui/select";
import { KAZAKH_ALPHABET } from "@/shared/consts";

import { ActivityHeatmap } from "./ActivityHeatmap";

import { useGetEmployeeActivity } from "../../../application/use-cases/get-employee-activity.usecase";
import { zodResolver } from "@hookform/resolvers/zod";

interface EmployeeInfoProps {
  employee: EmployeeOneType | undefined;
  isEditing: boolean;
  setEditedEmployee: Dispatch<any>;
}

export const EmployeeInfo = ({
  employee,
  isEditing,
  setEditedEmployee,
}: EmployeeInfoProps) => {
  const updateEmployeeMutation = useUpdateEmployee(employee?.id || "");
  const { data: services } = useGetServiceList();
  const { data: departments } = useGetDepartmentList();
  const { data: activities, isLoading: activitiesLoading } =
    useGetEmployeeActivity(employee?.id || "");

  const [selectedServices, setSelectedServices] = useState<string[]>(
    employee?.employeeServices.map((es) => es.service.id) || []
  );

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
    setValue,
    watch,
  } = useForm<UpdateEmployeeType>({
    resolver: zodResolver(UpdateEmployeeSchema),
    defaultValues: {
      profile: {
        fullName: employee?.profile.fullName || "",
        phone: employee?.profile.phone || "",
      },
      department_id: employee?.employeeInfo.department.id || "",
      table: employee?.employeeInfo.table || 0,
      cabinet: employee?.employeeInfo.cabinet || 0,
      login: "",
      password: "",
      employeeFeatures: employee?.employeeFeatures || [],
    },
  });

  const selectedDepartmentId = watch("department_id");
  const { data: departmentFeatures } = useGetDepartmentFeatures(
    selectedDepartmentId || ""
  );

  const hasLetterFeature = React.useMemo(() => {
    return departmentFeatures?.some(
      (feature) => feature.type === "LETTER" && feature.value === "true"
    );
  }, [departmentFeatures]);

  // Сброс формы при изменении employee
  useEffect(() => {
    if (employee) {
      reset({
        profile: {
          fullName: employee.profile.fullName || "",
          phone: employee.profile.phone || "",
        },
        department_id: employee.employeeInfo.department.id || "",
        table: employee.employeeInfo.table || 0,
        cabinet: employee.employeeInfo.cabinet || 0,
        login: "",
        password: "",
        employeeFeatures: employee.employeeFeatures || [],
      });

      // Обновляем выбранные услуги
      setSelectedServices(employee.employeeServices.map((es) => es.service.id));
    }
  }, [employee, reset]);

  const onSubmit = async (data: UpdateEmployeeType) => {
    if (!employee) return;

    try {
      await updateEmployeeMutation.mutateAsync({
        ...data,
        service_ids: selectedServices,
      });
      setEditedEmployee(null);
    } catch (error) {
      console.error("Ошибка при обновлении:", error);
    }
  };

  const toggleService = (serviceId: string) => {
    setSelectedServices((prev) =>
      prev.includes(serviceId)
        ? prev.filter((id) => id !== serviceId)
        : [...prev, serviceId]
    );
  };

  const handleLettersChange = (letters: string[]) => {
    setValue("employeeFeatures", [
      {
        type: "LETTER",
        value: letters.join(","),
      },
    ]);
  };

  return (
    <div className="overflow-x-hidden">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
        <div className="space-y-4">
          <div className="flex items-center space-x-3">
            <User className="h-5 w-5 text-gray-400" />
            <div className="flex-1">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                ФИО
              </label>
              {isEditing ? (
                <input
                  type="text"
                  {...register("profile.fullName")}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              ) : (
                <p className="text-gray-900">{employee?.profile.fullName}</p>
              )}
              {isEditing && errors.profile?.fullName && (
                <p className="text-sm text-red-500 mt-1">
                  {errors.profile.fullName.message}
                </p>
              )}
            </div>
          </div>
          <div className="flex items-center space-x-3">
            <Phone className="h-5 w-5 text-gray-400" />
            <div className="flex-1">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Телефон
              </label>
              {isEditing ? (
                <input
                  type="text"
                  {...register("profile.phone")}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              ) : (
                <p className="text-gray-900">{employee?.profile.phone}</p>
              )}
              {isEditing && errors.profile?.phone && (
                <p className="text-sm text-red-500 mt-1">
                  {errors.profile.phone.message}
                </p>
              )}
            </div>
          </div>

          <div className="flex items-center space-x-3">
            <User className="h-5 w-5 text-gray-400" />
            <div className="flex-1">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Логин
              </label>
              {isEditing ? (
                <input
                  type="text"
                  {...register("login")}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Введите логин"
                />
              ) : (
                <p className="text-gray-900">
                  {employee?.login || "Не указан"}
                </p>
              )}
              {isEditing && errors.login && (
                <p className="text-sm text-red-500 mt-1">
                  {errors.login.message}
                </p>
              )}
            </div>
          </div>

          <div className="flex items-center space-x-3">
            <User className="h-5 w-5 text-gray-400" />
            <div className="flex-1">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Пароль
              </label>
              {isEditing ? (
                <input
                  type="password"
                  {...register("password")}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Оставьте пустым, если не хотите менять"
                />
              ) : (
                <p className="text-gray-900">••••••••</p>
              )}
              {isEditing && errors.password && (
                <p className="text-sm text-red-500 mt-1">
                  {errors.password.message}
                </p>
              )}
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <div className="flex  items-start space-x-3">
            <MapPin className="h-5 w-5 text-gray-400 mt-1" />
            <div className="flex-1">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Центр
              </label>
              <p className="text-gray-900">
                {employee?.employeeInfo.center.name.ru}
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-3">
            <Briefcase className="h-5 min-w-5  text-gray-400 mt-1" />
            <div className="flex-1">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Отдел
              </label>
              {isEditing ? (
                <Select
                  onValueChange={(value) => setValue("department_id", value)}
                  value={selectedDepartmentId}
                >
                  <SelectTrigger className="w-full ">
                    <SelectValue placeholder="Выберите отдел" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      {departments?.map((department) => (
                        <SelectItem key={department.id} value={department.id}>
                          {department.name.ru}
                        </SelectItem>
                      ))}
                    </SelectGroup>
                  </SelectContent>
                </Select>
              ) : (
                <p className="text-gray-900">
                  {employee?.employeeInfo.department.name.ru}
                </p>
              )}
            </div>
          </div>

          <div className="flex items-start space-x-3">
            <Armchair className="h-5 w-5 text-gray-400 mt-1" />
            <div className="flex-1">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Стол
              </label>
              {isEditing ? (
                <input
                  type="number"
                  {...register("table", { valueAsNumber: true })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              ) : (
                <p className="text-gray-900">№{employee?.employeeInfo.table}</p>
              )}
              {isEditing && errors.table && (
                <p className="text-sm text-red-500 mt-1">
                  {errors.table.message}
                </p>
              )}
            </div>
          </div>

          <div className="flex items-start space-x-3">
            <DoorOpen className="h-5 w-5 text-gray-400 mt-1" />
            <div className="flex-1">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Кабинет
              </label>
              {isEditing ? (
                <input
                  type="number"
                  {...register("cabinet", { valueAsNumber: true })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              ) : (
                <p className="text-gray-900">
                  №{employee?.employeeInfo.cabinet}
                </p>
              )}
              {isEditing && errors.cabinet && (
                <p className="text-sm text-red-500 mt-1">
                  {errors.cabinet.message}
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
      {/* Активность сотрудника */}
      {activities && (
        <ActivityHeatmap
          activities={activities}
          employeeName={employee?.profile.fullName || ""}
        />
      )}

      <div className="mt-8 col-span-2 border-t border-gray-100">
        <h4 className="text-lg font-medium text-gray-900 pt-2">
          Предоставляемые услуги
        </h4>
        {isEditing && services ? (
          <div className="flex flex-wrap mt-2 gap-2">
            {services.map((service) => (
              <span
                key={service.id}
                className={`px-2 py-1 text-xs rounded-full cursor-pointer transition-colors ${
                  selectedServices.includes(service.id)
                    ? "bg-blue-600 text-white"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
                onClick={() => toggleService(service.id)}
              >
                {service.name.ru}
              </span>
            ))}
          </div>
        ) : (
          <div className="flex flex-wrap mt-2 gap-2">
            {employee?.employeeServices.map(({ service }, index) => (
              <span
                key={index}
                className="px-2 py-1 text-xs bg-blue-50 text-blue-700 rounded-full"
              >
                {service.name.ru}
              </span>
            ))}
          </div>
        )}
      </div>

      {/* Employee Features */}
      {hasLetterFeature && (
        <div className="mt-8 col-span-2 border-t border-gray-100">
          <h4 className="text-lg font-medium text-gray-900 pt-2">Буквы</h4>
          {isEditing ? (
            <LetterSelector
              onLettersChange={handleLettersChange}
              selectedLetters={
                watch("employeeFeatures")
                  ?.find((f) => f.type === "LETTER")
                  ?.value?.split(",")
                  .filter(Boolean) || []
              }
              disabled={isSubmitting}
            />
          ) : (
            <div className="flex flex-wrap mt-2 gap-2">
              {employee?.employeeFeatures
                ?.find((f) => f.type === "LETTER")
                ?.value?.split(",")
                .filter(Boolean)
                .map((letter: string, index: number) => (
                  <span
                    key={index}
                    className="px-2 py-1 text-xs bg-green-50 text-green-700 rounded-full"
                  >
                    {letter}
                  </span>
                ))}
            </div>
          )}
        </div>
      )}

      {/* Кнопки управления */}
      {isEditing && (
        <div className="mt-6 col-span-2 flex justify-end space-x-4 pt-4 border-t">
          <button
            type="button"
            onClick={() => setEditedEmployee(null)}
            disabled={isSubmitting || updateEmployeeMutation.isPending}
            className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors disabled:opacity-50"
          >
            Отмена
          </button>
          <button
            onClick={handleSubmit(onSubmit)}
            disabled={isSubmitting || updateEmployeeMutation.isPending}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50"
          >
            {isSubmitting || updateEmployeeMutation.isPending
              ? "Сохранение..."
              : "Сохранить"}
          </button>
        </div>
      )}
    </div>
  );
};

// Компонент выбора букв
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
