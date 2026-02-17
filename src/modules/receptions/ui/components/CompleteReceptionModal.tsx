"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useTranslations } from "next-intl";

import { Button } from "@/shared/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/shared/components/ui/dialog";
import { Label } from "@/shared/components/ui/label";
import { Textarea } from "@/shared/components/ui/textarea";

import { useChangeReceptionStatus } from "../../application/use-cases";
import { zodResolver } from "@hookform/resolvers/zod";

const CompleteReceptionSchema = z.object({
  comment: z.string().min(1, "commentRequired"),
});

type CompleteReceptionType = z.infer<typeof CompleteReceptionSchema>;

interface CompleteReceptionModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  receptionId: string;
  onSuccess?: () => void;
}

export const CompleteReceptionModal: React.FC<CompleteReceptionModalProps> = ({
  open,
  onOpenChange,
  receptionId,
  onSuccess,
}) => {
  const t = useTranslations("receptions.complete");
  const tButtons = useTranslations("common.buttons");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const changeStatusMutation = useChangeReceptionStatus();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<CompleteReceptionType>({
    resolver: zodResolver(CompleteReceptionSchema),
    defaultValues: {
      comment: "",
    },
  });

  const onSubmit = async (data: CompleteReceptionType) => {
    setIsSubmitting(true);
    try {
      await changeStatusMutation.mutateAsync({
        id: receptionId,
        status: "DONE",
        comment: data.comment,
      });
      reset();
      onOpenChange(false);
      onSuccess?.();
    } catch {
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCancel = () => {
    reset();
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{t("title")}</DialogTitle>
          <DialogDescription>{t("description")}</DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="comment">{t("commentLabel")}</Label>
            <Textarea
              id="comment"
              placeholder={t("commentPlaceholder")}
              {...register("comment")}
              className="min-h-[100px]"
            />
            {errors.comment && (
              <p className="text-sm text-red-500">
                {t(errors.comment.message)}
              </p>
            )}
          </div>

          <DialogFooter className="gap-2">
            <Button
              type="button"
              variant="outline"
              onClick={handleCancel}
              disabled={isSubmitting}
            >
              {tButtons("cancel")}
            </Button>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? t("submitting") : t("submit")}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};
