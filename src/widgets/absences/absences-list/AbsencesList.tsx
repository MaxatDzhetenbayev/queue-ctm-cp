import React from "react";
import { Button, Flex, Space, Table, Title } from "@mantine/core";
import { FaPlus } from "react-icons/fa";
import { AbsencesItem } from "./ui/absences-item/AbsencesItem";

export const AbsencesList = () => {
  return (
    <Space p={"md"}>
      <Flex justify="space-between" align="center">
        <Title order={2}>Список отсутствий</Title>
        <Button variant="filled" color="dark" size="md">
          <FaPlus style={{ marginRight: 5 }} />
          Добавить отсутствие
        </Button>
      </Flex>
      <Table mt={20} stickyHeader stickyHeaderOffset={60}>
        <Table.Thead>
          <Table.Tr>
            <Table.Th>Сотрудник</Table.Th>
            <Table.Th>Тип</Table.Th>
            <Table.Th>Период</Table.Th>
            <Table.Th>Статус</Table.Th>
            <Table.Th>Действия</Table.Th>
          </Table.Tr>
        </Table.Thead>
        <AbsencesItem />
        <AbsencesItem />
        <AbsencesItem />
        <AbsencesItem />
      </Table>
    </Space>
  );
};
