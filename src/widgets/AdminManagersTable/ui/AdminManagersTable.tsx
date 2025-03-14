"use client";

import { Box, Card, Flex, Skeleton, Text } from "@mantine/core";
import React from "react";
import { useManagersList } from "../hooks";
// import { ManagerDetail } from "@/features/manager-detail";

export const AdminManagersTable = () => {
  const { data, isLoading } = useManagersList();

  return (
    <Flex>
      <Box w="100%">
        {isLoading ? (
          <Box>
            <Skeleton h={35} w={150} />
            <Skeleton mt={20} h={45} w="100%" />
            <Skeleton mt={5} h={45} w="100%" />
            <Skeleton mt={5} h={45} w="100%" />
            <Skeleton mt={5} h={45} w="100%" />
            <Skeleton mt={5} h={45} w="100%" />
            <Skeleton mt={5} h={45} w="100%" />
            <Skeleton mt={5} h={45} w="100%" />
            <Skeleton mt={5} h={45} w="100%" />
          </Box>
        ) : (
          <Box w="100%">
            <Flex direction="column" gap={10}>
              {data?.map(
                ({
                  id,
                  full_name,
                }: {
                  id: number;
                  full_name: string;
                  iin: string;
                  phone: string;
                }) => (
                  <Card key={id} withBorder w="100%">
                    <Box>
                      <Text>{full_name}</Text>
                    </Box>
                  </Card>
                )
              )}
            </Flex>
          </Box>

          // <Table>
          //   <Table.Thead>
          //     <Table.Tr>
          //       {["ФИО", "ИИН", "Телефон", "Действия"].map((header) => (
          //         <Table.Th key={header}>{header}</Table.Th>
          //       ))}
          //     </Table.Tr>
          //   </Table.Thead>
          //   <Table.Tbody>
          //     {data?.map(
          //       (manager: {
          //         id: number;
          //         full_name: string;
          //         iin: string;
          //         phone: string;
          //       }) => (
          //         <Table.Tr key={manager?.id}>
          //           <Table.Td>{manager?.full_name}</Table.Td>
          //           <Table.Td>{manager?.iin}</Table.Td>
          //           <Table.Td>{manager?.phone}</Table.Td>
          //           <Table.Td>
          //             <ManagerDetail id={manager.id} />
          //           </Table.Td>
          //         </Table.Tr>
          //       )
          //     )}
          //   </Table.Tbody>
          // </Table>
        )}
      </Box>
    </Flex>
  );
};
