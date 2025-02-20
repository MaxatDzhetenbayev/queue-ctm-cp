"use client";
import { ManagerDetail } from "@/features/manager-detail";
import { Box } from "@mantine/core";
import {
  Edit,
  SimpleForm,
  SimpleShowLayout,
  TextInput,
  useRecordContext,
} from "react-admin";

const ManagerStatistics = () => {
  const record = useRecordContext();

  if (!record?.id) {
    return;
  }

  return (
    <Box>
      <ManagerDetail id={record.id as number} />
    </Box>
  );
};

export const ManagerEdit = () => {
  return (
    <Edit>
      <SimpleForm>
        <TextInput source="full_name" label="ФИО" />
        <TextInput source="iin" label="ИИН" />
        <TextInput source="phone" label="Телефон" />
        <SimpleShowLayout>
          <ManagerStatistics />
        </SimpleShowLayout>
      </SimpleForm>
    </Edit>
  );
};
