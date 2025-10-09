"use client";

import React, { Suspense } from "react";

import { useGetEmployeeList } from "@/modules/users/application/use-cases";
import { Skeleton } from "@/shared/components/ui/skeleton";

import { CreateAbsenceModal } from "./CreateAbsenceModal";

interface LazyCreateAbsenceModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const CreateAbsenceModalWithEmployees = ({
  isOpen,
  onClose,
}: LazyCreateAbsenceModalProps) => {
  const { data: employees, isLoading } = useGetEmployeeList({});

  if (isLoading || !employees?.managers) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="space-y-4 w-full max-w-md">
          <Skeleton className="h-8 w-full" />
          <Skeleton className="h-10 w-full" />
          <Skeleton className="h-10 w-full" />
          <Skeleton className="h-32 w-full" />
        </div>
      </div>
    );
  }

  return (
    <CreateAbsenceModal
      isOpen={isOpen}
      onClose={onClose}
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      employees={employees.managers.map((emp: any) => ({
        id: emp.id,
        name: emp.profile.fullName,
      }))}
    />
  );
};

const ModalFallback = () => (
  <div className="flex items-center justify-center p-8">
    <div className="space-y-4 w-full max-w-md">
      <Skeleton className="h-8 w-full" />
      <Skeleton className="h-10 w-full" />
      <Skeleton className="h-10 w-full" />
      <Skeleton className="h-32 w-full" />
    </div>
  </div>
);

export const LazyCreateAbsenceModal = ({
  isOpen,
  onClose,
}: LazyCreateAbsenceModalProps) => {
  if (!isOpen) return null;

  return (
    <Suspense fallback={<ModalFallback />}>
      <CreateAbsenceModalWithEmployees isOpen={isOpen} onClose={onClose} />
    </Suspense>
  );
};
