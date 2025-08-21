"use client";

import { Calendar, Edit, FileText, User, X } from "lucide-react";
import React from "react";

import { Badge } from "@/shared/components/ui/badge";
import { Button } from "@/shared/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/shared/components/ui/card";

interface Absence {
  id: string;
  employeeName: string;
  employeeId: string;
  type: string;
  typeLabel: string;
  startDate: string;
  endDate: string;
  status: string;
  comment?: string;
  createdAt: string;
}

interface AbsencesListProps {
  absences: Absence[];
  onCancel: (id: string) => void;
  onEdit: (id: string) => void;
}

const getTypeColor = (type: string) => {
  switch (type) {
    case "vacation":
      return "bg-blue-100 text-blue-800 border-blue-200";
    case "sick_leave":
      return "bg-red-100 text-red-800 border-red-200";
    case "personal":
      return "bg-yellow-100 text-yellow-800 border-yellow-200";
    default:
      return "bg-gray-100 text-gray-800 border-gray-200";
  }
};

const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleDateString("ru-RU", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });
};

export const AbsencesList = ({
  absences,
  onCancel,
  onEdit,
}: AbsencesListProps) => {
  if (absences.length === 0) {
    return (
      <Card>
        <CardContent className="flex flex-col items-center justify-center py-12">
          <FileText className="h-12 w-12 text-gray-400 mb-4" />
          <h3 className="text-lg font-semibold text-gray-900 mb-2">
            Нет отсутствий
          </h3>
          <p className="text-gray-600 text-center">
            В данный момент нет активных отсутствий сотрудников
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <Calendar className="h-5 w-5" />
          <span>Список отсутствий</span>
          <Badge variant="secondary" className="ml-auto">
            {absences.length}
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {absences.map((absence) => (
            <div
              key={absence.id}
              className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50 transition-colors"
            >
              <div className="flex-1">
                <div className="flex items-center space-x-3 mb-2">
                  <User className="h-4 w-4 text-gray-500" />
                  <span className="font-medium text-gray-900">
                    {absence.employeeName}
                  </span>
                  <Badge className={getTypeColor(absence.type)}>
                    {absence.typeLabel}
                  </Badge>
                </div>

                <div className="flex items-center space-x-4 text-sm text-gray-600">
                  <div className="flex items-center space-x-1">
                    <Calendar className="h-3 w-3" />
                    <span>
                      {formatDate(absence.startDate)} -{" "}
                      {formatDate(absence.endDate)}
                    </span>
                  </div>
                  {absence.comment && (
                    <div className="flex items-center space-x-1">
                      <FileText className="h-3 w-3" />
                      <span>{absence.comment}</span>
                    </div>
                  )}
                </div>
              </div>

              <div className="flex items-center space-x-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => onEdit(absence.id)}
                  className="flex items-center space-x-1"
                >
                  <Edit className="h-3 w-3" />
                  <span>Изменить</span>
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => onCancel(absence.id)}
                  className="flex items-center space-x-1 text-red-600 hover:text-red-700 hover:bg-red-50"
                >
                  <X className="h-3 w-3" />
                  <span>Отменить</span>
                </Button>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};
