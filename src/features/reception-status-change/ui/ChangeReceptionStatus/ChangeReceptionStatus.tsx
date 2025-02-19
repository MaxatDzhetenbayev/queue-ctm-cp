"use client";
import React from "react";
import {
  useChangeReceptionStatus,
  ChangeReceptionStatusProps,
} from "../../hooks";
import { Button } from "@mantine/core";

type ChangeReceptionStatusButtonProps = ChangeReceptionStatusProps & {
  children: React.ReactNode;
  color?: string;
};

export const ChangeReceptiontionStatusButton = ({
  id,
  children,
  status,
}: ChangeReceptionStatusButtonProps) => {
  const { mutate: handleChangeReceptionStatusById } =
    useChangeReceptionStatus();

  return (
    <Button
      onClick={() => handleChangeReceptionStatusById({ id, status })}
      bg="#611BF8"
    >
      {children}
    </Button>
  );
};
