"use client";

import { useQuery } from "@tanstack/react-query";
import {
  BarChart3,
  Building2,
  FileText,
  Users,
  Wrench,
} from "lucide-react";
import { useTranslations } from "next-intl";
import { useParams } from "next/navigation";
import React from "react";

import { Link } from "@/shared/configs/i18";

import { getCenter } from "@/shared/api/centers.api";
import { Button } from "@/shared/components/ui/button";

const CenterDetailPage = () => {
  const t = useTranslations("superadmin.centers");
  const params = useParams();
  const id = params.id as string;

  const { data: center, isLoading } = useQuery({
    queryKey: ["center", id],
    queryFn: () => getCenter(id),
    enabled: !!id,
  });

  const nameOf = (c: { name?: Record<string, string | undefined> }) =>
    c?.name?.ru ?? c?.name?.kz ?? id;

  if (isLoading || !center) {
    return <div className="mt-6">{t("loading")}</div>;
  }

  const links = [
    { href: `/superadmin/centers/${id}/stats`, icon: BarChart3, key: "stats" },
    {
      href: `/superadmin/centers/${id}/directors`,
      icon: Users,
      key: "directors",
    },
    {
      href: `/superadmin/centers/${id}/services`,
      icon: Wrench,
      key: "services",
    },
    {
      href: `/superadmin/centers/${id}/departments`,
      icon: Building2,
      key: "departments",
    },
    {
      href: `/superadmin/centers/${id}/employees`,
      icon: Users,
      key: "employees",
    },
    {
      href: `/superadmin/centers/${id}/receptions`,
      icon: FileText,
      key: "receptions",
    },
  ];

  return (
    <div>
      <div className="mt-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">
            {nameOf(center)}
          </h1>
          <p className="mt-1 text-gray-600">{t("subtitle")}</p>
        </div>
        <Button variant="outline" asChild>
          <Link href="/superadmin/centers">{t("back")}</Link>
        </Button>
      </div>
      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {links.map(({ href, icon: Icon, key }) => (
          <Link
            key={key}
            href={href}
            className="flex items-center gap-3 rounded-lg border border-gray-200 bg-white p-4 shadow-sm transition hover:bg-gray-50"
          >
            <Icon className="h-8 w-8 text-gray-600" />
            <span className="font-medium">{t(key)}</span>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default CenterDetailPage;
