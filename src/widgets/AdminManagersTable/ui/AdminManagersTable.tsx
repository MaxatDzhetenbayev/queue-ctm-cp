"use client";

import { Box, Card, Flex, Skeleton, Text } from "@mantine/core";
import React from "react";
import { useManagersList } from "../hooks";
import { ManagerDetailModal } from "@/features/manager-detail";

export const AdminManagersTable = () => {
  const { data, isLoading } = useManagersList();
  console.log(data)
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
                  ...manager
                }: {
                  id: number;
                  full_name: string;
                  iin: string;
                  phone: string;
                }) => (
                  <ManagerDetailModal key={id} id={id} manager={manager} >
                    <Card withBorder>
                      <Flex justify="space-between" align="center" w="100%">
                        <Flex align="center" gap={8}>
                          <Box style={{ width: 8, height: 8, backgroundColor: "green", borderRadius: "50%" }}></Box>
                          <Text>{manager.full_name}</Text>
                        </Flex>
                        <Text>
                          посетителей
                        </Text>
                      </Flex>
                    </Card>
                  </ManagerDetailModal>
                )
              )}
            </Flex>
          </Box>
        )}
      </Box>
    </Flex>
  );
};
