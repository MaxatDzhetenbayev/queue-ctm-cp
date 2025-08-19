import { Calendar, Clock, FileText, Phone, User } from "lucide-react";
import React from "react";

import { useGetReceptionsByEmployeeIdList } from "@/modules/users/application/use-cases";

export const EmployeeReceptions = ({ managerId }: { managerId: string }) => {
  const { data, isLoading, error } =
    useGetReceptionsByEmployeeIdList(managerId);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading receptions</div>;

  return (
    <div className="flex flex-col gap-4">
      {data?.map((appointment) => (
        <div
          key={appointment.id}
          className="bg-white border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow"
        >
          <div className="flex items-start justify-between mb-2">
            <div className="flex-1">
              <div className="flex items-center space-x-3 mb-2">
                <button
                  // onClick={() => onClientClick(client)}
                  className="text-lg font-semibold text-blue-600 hover:text-blue-800 transition-colors"
                >
                  {appointment.user.profile.fullName}
                </button>
                {/* <span
                  className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(
                    appointment.status
                  )}`}
                >
                  {getStatusText(appointment.status)}
                </span> */}
              </div>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mb-4">
            <div className="flex items-center space-x-2 text-gray-600">
              <User className="h-4 w-4" />
              <span>ИИН: {appointment.user.profile.iin}</span>
            </div>
            <div className="flex items-center space-x-2 text-gray-600">
              <Phone className="h-4 w-4" />
              <span>Телефон:</span>
              <span>{appointment.user.profile.phone}</span>
            </div>
            <div className="flex items-center space-x-2 col-span-2 text-gray-600">
              <FileText className="h-4 w-4" />
              <span>Услуга:</span>
              <span>{appointment.service.name.ru}</span>
            </div>
            <div className="flex items-center space-x-2 text-sm text-gray-600">
              <Calendar className="h-4 w-4 " />
              <span>Дата:</span>
              {new Date(appointment.date).toLocaleDateString("ru-RU")}
            </div>
            <div className="flex items-center space-x-2 text-sm text-gray-600">
              <Clock className="h-4 w-4" />
              <span>Время:</span>
              {new Date(appointment.time).toLocaleTimeString("ru-RU", {
                hour: "2-digit",
                minute: "2-digit",
              })}
            </div>
          </div>
          {/* 
          {appointment.notes && (
            <div className="mt-4 p-3 bg-gray-50 rounded-lg">
              <p className="text-sm text-gray-700">
                <span className="font-medium">Заметки:</span>{" "}
                {appointment.notes}
              </p>
            </div>
          )} */}
        </div>
      ))}
    </div>
  );
};
