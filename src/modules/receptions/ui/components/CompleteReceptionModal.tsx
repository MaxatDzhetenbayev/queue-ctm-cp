"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

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
  comment: z.string().min(1, "Комментарий обязателен"),
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
    } catch (error) {
      console.error("Ошибка при завершении приема:", error);
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
          <DialogTitle>Завершить прием</DialogTitle>
          <DialogDescription>
            Добавьте комментарий о завершении приема. Это поле обязательно для
            заполнения.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="comment">Комментарий</Label>
            <Textarea
              id="comment"
              placeholder="Введите комментарий о завершении приема..."
              {...register("comment")}
              className="min-h-[100px]"
            />
            {errors.comment && (
              <p className="text-sm text-red-500">{errors.comment.message}</p>
            )}
          </div>

          <DialogFooter className="gap-2">
            <Button
              type="button"
              variant="outline"
              onClick={handleCancel}
              disabled={isSubmitting}
            >
              Отмена
            </Button>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Завершение..." : "Завершить прием"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};
