import { Avatar, Button, Flex, Pill, Table } from "@mantine/core";
import React from "react";

export const AbsencesItem = () => {
  return (
    <Table.Tr>
      <Table.Td style={{ display: "flex", alignItems: "center", gap: 10 }}>
        <Avatar name={"Максат Джетенбаев"} color="initials" />
        Максат Джетенбаев
      </Table.Td>
      <Table.Td>
        <Pill>Отпуск</Pill>
      </Table.Td>
      <Table.Td>29.06.2025 - 12.07.2025</Table.Td>

      <Table.Td>
        <Flex gap={10}>
          <Button p={5} variant="outline" color="red">
            Удалить
          </Button>
          <Button p={5} variant="outline" color="blue">
            Изменить
          </Button>
        </Flex>
      </Table.Td>
    </Table.Tr>
  );
};
