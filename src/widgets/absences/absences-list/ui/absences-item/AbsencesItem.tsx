import { Avatar, Button, Flex, Pill, Table } from "@mantine/core";
import React from "react";
import { Absence, getAbsenceTypeText } from "../../AbsencesList";

export const AbsencesItem = (data: Absence) => {
  return (
    <Table.Tr>
      <Table.Td style={{ display: "flex", alignItems: "center", gap: 10 }}>
        <Avatar name={"Максат Джетенбаев"} color="initials" />
        {data.employeeName}
      </Table.Td>
      <Table.Td>
        <Pill>{getAbsenceTypeText(data.type)}</Pill>
      </Table.Td>
      <Table.Td>
        {new Date(data?.startDate).toLocaleDateString("ru-RU")} -{" "}
        {new Date(data?.endDate).toLocaleDateString("ru-RU")}
      </Table.Td>
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
