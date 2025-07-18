"use client";
import React, { useState } from "react";
import {
  useChangeReceptionStatus,
  ChangeReceptionStatusProps,
  Statuses,
} from "../../hooks";
import { Button, Modal, Textarea } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";

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
  const [opened, { open, close }] = useDisclosure(false);
  const [comment, setComment] = useState<string>();

  console.log(comment);

  if (status === Statuses.DONE) {
    return (
      <>
        <Modal
          centered
          opened={opened}
          onClose={close}
          title="Завершение приёма"
        >
          <Textarea
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            label="Комментарий (необязательно)"
            placeholder="Введите комментарий к записи (необязательно)"
          />
          <Button
            mt={20}
            onClick={() =>
              handleChangeReceptionStatusById({ id, status, comment })
            }
            bg="#611BF8"
          >
            Завершить приём
          </Button>
        </Modal>
        <Button bg="#611BF8" onClick={open}>
          {children}
        </Button>
      </>
    );
  }

  return (
    <Button
      onClick={() => handleChangeReceptionStatusById({ id, status })}
      bg="#611BF8"
    >
      {children}
    </Button>
  );
};
