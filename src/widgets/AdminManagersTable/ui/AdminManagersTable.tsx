"use client";

import {
  Box,
  Card,
  Flex,
  Input,
  Modal,
  Pagination,
  Skeleton,
  Text,
} from "@mantine/core";
import React, { useState, useEffect } from "react";
import { IManager, useManagersList } from "../hooks";
import { useDisclosure } from "@mantine/hooks";

export const AdminManagersTable = () => {
  const [fullName, setFullName] = useState<string>("");
  const [page, setPage] = useState(1);

  useEffect(() => {
    setPage(1);
  }, [fullName]);

  const { data, isLoading } = useManagersList({ page, search: fullName });

  const managers = data?.managers ?? [];
  const totalPages = data?.totalPages ?? 1;

  const [opened, { open, close }] = useDisclosure(false);
  // const [selectedManagerId, setSelectedManagerId] = useState<number>(null);

  return (
    <Flex direction="column" gap={20}>
      <Input
        placeholder="Поиск по ФИО менеджера"
        value={fullName}
        onChange={(e) => setFullName(e.target.value)}
      />
      <Box w="100%">
        {isLoading ? (
          <Box mih={593}>
            <Skeleton h={35} w={150} />
            {Array.from({ length: 8 }).map((_, i) => (
              <Skeleton key={i} mt={5} h={59} w="100%" />
            ))}
          </Box>
        ) : (
          <Flex
            direction="column"
            justify="space-between"
            w="100%"
            gap={10}
            mih={593}
          >
            <Flex direction="column" gap={10}>
              {managers.length > 0 ? (
                managers.map(({ id, full_name }: IManager) => (
                  <>
                    <Card
                      key={id}
                      withBorder
                      w="100%"
                      onClick={() => {
                        open();
                      }}
                    >
                      <Box>
                        <Text>{full_name}</Text>
                      </Box>
                    </Card>
                  </>
                ))
              ) : (
                <Text>Менеджеры не найдены</Text>
              )}
            </Flex>
            <Pagination total={totalPages} value={page} onChange={setPage} />
            <Modal opened={opened} onClose={close} size="70%">
              123
            </Modal>
          </Flex>
        )}
      </Box>
    </Flex>
  );
};
