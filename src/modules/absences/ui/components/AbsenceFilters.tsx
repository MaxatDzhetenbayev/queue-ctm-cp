"use client";

import React from "react";
import { Filter } from "lucide-react";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/shared/components/ui/card";
import { Button } from "@/shared/components/ui/button";
import { Badge } from "@/shared/components/ui/badge";

interface AbsenceType {
  id: string;
  label: string;
  color: string;
}

interface AbsenceFiltersProps {
  selectedType: string;
  onTypeChange: (type: string) => void;
  absenceTypes: AbsenceType[];
}

export const AbsenceFilters = ({
  selectedType,
  onTypeChange,
  absenceTypes,
}: AbsenceFiltersProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <Filter className="h-5 w-5" />
          <span>Фильтры</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div>
            <h4 className="text-sm font-medium text-gray-700 mb-3">
              Тип отсутствия
            </h4>
            <div className="flex flex-wrap gap-2">
              <Button
                variant={selectedType === "all" ? "default" : "outline"}
                size="sm"
                onClick={() => onTypeChange("all")}
                className="flex items-center space-x-2"
              >
                <span>Все типы</span>
                <Badge variant="secondary" className="ml-1">
                  Все
                </Badge>
              </Button>

              {absenceTypes.map((type) => (
                <Button
                  key={type.id}
                  variant={selectedType === type.id ? "default" : "outline"}
                  size="sm"
                  onClick={() => onTypeChange(type.id)}
                  className="flex items-center space-x-2"
                >
                  <div className={`w-2 h-2 rounded-full ${type.color}`} />
                  <span>{type.label}</span>
                </Button>
              ))}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
