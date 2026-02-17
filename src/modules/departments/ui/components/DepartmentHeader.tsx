"use client";

import { useTranslations } from "next-intl";
import React from "react";

interface DepartmentHeaderProps {
  total: number;
}

export const DepartmentHeader = ({ total }: DepartmentHeaderProps) => {
  const t = useTranslations("departments");
  
  const getCountLabel = () => {
    if (total === 1) return t("count.one");
    if (total < 5) return t("count.few");
    return t("count.many");
  };

  return (
    <div className="flex  items-center justify-between mb-8">
      <div className="flex items-center space-x-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">
            {t("title")}
          </h1>
          <p className="text-gray-500">
            {total} {getCountLabel()}
          </p>
        </div>
      </div>
    </div>
  );
};
