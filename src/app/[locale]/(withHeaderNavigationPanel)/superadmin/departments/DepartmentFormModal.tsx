"use client";

import {
  createDepartment,
  updateDepartment,
} from "@/modules/departments/infrastructure/api/department.api";
import { useQueryClient } from "@tanstack/react-query";
import { useTranslations } from "next-intl";
import React, { useEffect, useState } from "react";

import { Button } from "@/shared/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/shared/components/ui/dialog";
import { Input } from "@/shared/components/ui/input";
import { Label } from "@/shared/components/ui/label";

type DepartmentItem = { id: string; name?: unknown };

interface DepartmentFormModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  department?: DepartmentItem | null;
}

export const DepartmentFormModal = ({
  open,
  onOpenChange,
  department,
}: DepartmentFormModalProps) => {
  const t = useTranslations("superadmin.departments");
  const tCommon = useTranslations("common.buttons");
  const queryClient = useQueryClient();
  const [nameRu, setNameRu] = useState("");
  const [nameKz, setNameKz] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const isEdit = !!department?.id;

  useEffect(() => {
    if (open) {
      setError(null);
      if (department?.name && typeof department.name === "object") {
        const n = department.name as { ru?: string; kz?: string };
        setNameRu(n.ru ?? "");
        setNameKz(n.kz ?? "");
      } else {
        setNameRu("");
        setNameKz("");
      }
    }
  }, [open, department]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      if (isEdit) {
        await updateDepartment(department!.id, {
          name: { ru: nameRu, kz: nameKz },
        });
      } else {
        await createDepartment({ name: { ru: nameRu, kz: nameKz } });
      }
      queryClient.invalidateQueries({ queryKey: ["department-list"] });
      onOpenChange(false);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Ошибка");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>
            {isEdit ? t("edit") : t("create")}
          </DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="nameRu">Название (RU)</Label>
            <Input
              id="nameRu"
              value={nameRu}
              onChange={(e) => setNameRu(e.target.value)}
              required
              className="mt-1"
            />
          </div>
          <div>
            <Label htmlFor="nameKz">Название (KZ)</Label>
            <Input
              id="nameKz"
              value={nameKz}
              onChange={(e) => setNameKz(e.target.value)}
              className="mt-1"
            />
          </div>
          {error && <p className="text-sm text-red-600">{error}</p>}
          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
              disabled={loading}
            >
              {tCommon("cancel")}
            </Button>
            <Button type="submit" disabled={loading}>
              {loading ? t("loading") : tCommon("save")}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};
