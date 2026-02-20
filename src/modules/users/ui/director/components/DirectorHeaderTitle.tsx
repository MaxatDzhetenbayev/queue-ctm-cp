"use client";

import { useTranslations } from "next-intl";
import React from "react";

interface DirectorHeaderTitleProps {
  total?: number | null;
}

export const DirectorHeaderTitle = ({ total }: DirectorHeaderTitleProps) => {
  const t = useTranslations("director");
  return (
    <div className="flex items-center justify-between">
      <h1 className="text-3xl font-bold text-gray-900">{t("title")}</h1>
      <div className="text-sm text-gray-500">
        {t("total")}: {total ?? 0}
      </div>
    </div>
  );
};
