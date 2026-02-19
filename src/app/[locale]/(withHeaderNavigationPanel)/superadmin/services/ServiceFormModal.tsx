"use client";

import {
  createService,
  updateService,
} from "@/modules/users/infrastructure/api/service.api";
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

type ServiceItem = { id: string; name: Record<string, string> };

interface ServiceFormModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  service?: ServiceItem | null;
}

export const ServiceFormModal = ({
  open,
  onOpenChange,
  service,
}: ServiceFormModalProps) => {
  const t = useTranslations("superadmin.services");
  const tCommon = useTranslations("common.buttons");
  const queryClient = useQueryClient();
  const [nameRu, setNameRu] = useState("");
  const [nameKz, setNameKz] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const isEdit = !!service?.id;

  useEffect(() => {
    if (open) {
      setError(null);
      if (service?.name) {
        const n = service.name as { ru?: string; kz?: string };
        setNameRu(n.ru ?? "");
        setNameKz(n.kz ?? "");
      } else {
        setNameRu("");
        setNameKz("");
      }
    }
  }, [open, service]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      if (isEdit) {
        await updateService(service!.id, { name: { ru: nameRu, kz: nameKz } });
      } else {
        await createService({ name: { ru: nameRu, kz: nameKz } });
      }
      queryClient.invalidateQueries({ queryKey: ["service-list"] });
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
