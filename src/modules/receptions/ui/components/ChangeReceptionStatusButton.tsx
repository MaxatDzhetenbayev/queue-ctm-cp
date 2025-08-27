"use client";

import React from "react";

import { ReceptionStatusType } from "@/modules/receptions/domain/schemas/reception.schemas";
import { Button } from "@/shared/components/ui/button";

import { useUpdateReceptionStatus } from "../../application/use-cases";

interface ChangeReceptionStatusButtonProps {
  id: string;
  status: ReceptionStatusType;
  children: React.ReactNode;
  variant?:
    | "default"
    | "destructive"
    | "outline"
    | "secondary"
    | "ghost"
    | "link";
  size?: "default" | "sm" | "lg" | "icon";
}

export const ChangeReceptionStatusButton: React.FC<
  ChangeReceptionStatusButtonProps
> = ({ id, status, children, variant = "default", size = "sm" }) => {
  const updateStatusMutation = useUpdateReceptionStatus();

  const handleClick = () => {
    updateStatusMutation.mutate({ id, status });
  };

  return (
    <Button
      variant={variant}
      size={size}
      onClick={handleClick}
      disabled={updateStatusMutation.isPending}
    >
      {updateStatusMutation.isPending ? "Обновление..." : children}
    </Button>
  );
};
