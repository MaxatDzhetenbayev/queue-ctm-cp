"use client";
import React from "react";
import {
  useChangeReceptionStatus,
  ChangeReceptionStatusProps,
} from "../../hooks";

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
    <button
      onClick={() => handleChangeReceptionStatusById({ id, status })}
      className={"cursor-pointer bg-[#611BF8] rounded-md text-white px-3 py-1 "}
    >
      {children}
    </button>
  );
};
