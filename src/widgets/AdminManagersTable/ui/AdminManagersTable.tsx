"use client";

import {
  Box,
  Flex,
  Input,
  Pagination,
  Skeleton,
  Text,
} from "@mantine/core";
import React, { useState, useEffect } from "react";
import { IManager, useManagersList } from "../hooks";
import { ManagerCreate, } from "@/features";
import { ManagerDetailModal } from "@/features/manager-detail";

export const AdminManagersTable = () => {
  const [fullName, setFullName] = useState<string>("");
  const [page, setPage] = useState(1);

  useEffect(() => {
    setPage(1);
  }, [fullName]);

  const { data, isLoading } = useManagersList({ page, search: fullName });

  const managers = data?.managers ?? [];
  const totalPages = data?.totalPages ?? 1;

  return (
    <Flex direction="column" gap={20}>
      <Flex w="100%" gap={20} >
        <Box flex={1}>
          <Input
            placeholder="Поиск по ФИО менеджера"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
          />
        </Box>
        <ManagerCreate />
      </Flex>
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
                managers.map((manager: IManager) => (
                  <ManagerDetailModal key={manager.id} {...manager} />
                ))
              ) : (
                <Text>Менеджеры не найдены</Text>
              )}
            </Flex>
            <Pagination total={totalPages} value={page} onChange={setPage} />
          </Flex>
        )}
      </Box>
    </Flex>
  );
};
