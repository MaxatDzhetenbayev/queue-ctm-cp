import React from "react";
import {
  Button,
  Flex,
  Pagination,
  Paper,
  Table,
  Text,
  Title,
} from "@mantine/core";
import { FaPlus } from "react-icons/fa";
import { AbsencesItem } from "./ui/absences-item/AbsencesItem";

export const AbsencesList = () => {
  return (
    <Paper withBorder p={20}>
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
            <Table.Th>Действия</Table.Th>
          </Table.Tr>
        </Table.Thead>
        <AbsencesItem />
        <AbsencesItem />
        <AbsencesItem />
        <AbsencesItem />
      </Table>
      <Flex justify="space-between" align={"center"} mt={10}>
        <Text>Показано 1-10 из 24 записей</Text>
        <Pagination total={10} />
      </Flex>
    </Paper>
  );
};
