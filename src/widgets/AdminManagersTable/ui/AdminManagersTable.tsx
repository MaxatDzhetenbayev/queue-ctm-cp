"use client";

import { Box, Flex, Skeleton, Table } from "@mantine/core";
import React from "react";
import { useManagersList } from "../hooks";
import { ManagerDetail } from "@/features/manager-detail";

export const AdminManagersTable = () => {
  const { data, isLoading } = useManagersList();

  return (
    <Flex>
      <Box>
        {isLoading ? (
          <Box>
            <Skeleton h={35} w={150} />
            <Skeleton mt={20} h={35} w="100%" />
            <Skeleton mt={5} h={35} w="100%" />
            <Skeleton mt={5} h={35} w="100%" />
            <Skeleton mt={5} h={35} w="100%" />
            <Skeleton mt={5} h={35} w="100%" />
            <Skeleton mt={5} h={35} w="100%" />
            <Skeleton mt={5} h={35} w="100%" />
            <Skeleton mt={5} h={35} w="100%" />
          </Box>
        ) : (
          <Table>
            <Table.Thead>
              <Table.Tr>
                {["ФИО", "ИИН", "Телефон", "Действия"].map((header) => (
                  <Table.Th key={header}>{header}</Table.Th>
                ))}
              </Table.Tr>
            </Table.Thead>
            <Table.Tbody>
              {data?.map((manager: any) => (
                <Table.Tr key={manager.id}>
                  <Table.Td>{manager.full_name}</Table.Td>
                  <Table.Td>{manager.iin}</Table.Td>
                  <Table.Td>{manager.phone}</Table.Td>
                  <Table.Td>
                    <ManagerDetail id={manager.id} />
                  </Table.Td>
                </Table.Tr>
              ))}
            </Table.Tbody>
          </Table>
        )}
      </Box>
    </Flex>
  );
};
