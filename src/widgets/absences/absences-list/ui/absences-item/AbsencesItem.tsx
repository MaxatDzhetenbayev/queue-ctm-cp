import { Avatar, Button, Flex, Pill, Table } from "@mantine/core";
import React from "react";
import {
  Absence,
  getAbsenceStatusText,
  getAbsenceTypeText,
} from "../../AbsencesList";
import { AbsencesUpdateStatusButton } from "@/features";

export const AbsencesItem = (data: Absence) => {
  return (
    <Table.Tr>
      <Table.Td style={{ display: "flex", alignItems: "center", gap: 10 }}>
        <Avatar name={data.employeeName} color="initials" />
        {data.employeeName}
      </Table.Td>
      <Table.Td>
        <Pill>{getAbsenceTypeText(data.type)}</Pill>
      </Table.Td>
      <Table.Td>
        <Pill>{getAbsenceStatusText(data.status)}</Pill>
      </Table.Td>
      <Table.Td>
        {new Date(data?.startDate).toLocaleDateString()} -{" "}
        {new Date(data?.endDate).toLocaleDateString()}
      </Table.Td>
      <Table.Td>
        <Flex gap={10}>
          <AbsencesUpdateStatusButton leaveId={data.id} status={data.status} />
          <Button p={5} variant="outline" color="blue">
            Изменить
          </Button>
        </Flex>
      </Table.Td>
    </Table.Tr>
  );
};
