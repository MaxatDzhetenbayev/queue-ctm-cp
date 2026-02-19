"use client";

import { useQueryClient } from "@tanstack/react-query";
import { useTranslations } from "next-intl";
import React, { useState } from "react";

import { createCenter } from "@/shared/api/centers.api";
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

interface CreateCenterModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const CreateCenterModal = ({
  open,
  onOpenChange,
}: CreateCenterModalProps) => {
  const t = useTranslations("superadmin.centers");
  const tCommon = useTranslations("common.buttons");
  const queryClient = useQueryClient();
  const [nameRu, setNameRu] = useState("");
  const [nameKz, setNameKz] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const reset = () => {
    setNameRu("");
    setNameKz("");
    setError(null);
  };

  const handleOpenChange = (next: boolean) => {
    if (!next) reset();
    onOpenChange(next);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      await createCenter({ name: { ru: nameRu, kz: nameKz } });
      queryClient.invalidateQueries({ queryKey: ["centers-list"] });
      handleOpenChange(false);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Ошибка создания");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{t("create")}</DialogTitle>
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
              onClick={() => handleOpenChange(false)}
              disabled={loading}
            >
              {tCommon("cancel")}
            </Button>
            <Button type="submit" disabled={loading}>
              {loading ? t("loading") : t("create")}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};
